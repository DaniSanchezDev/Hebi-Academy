import { resend } from "./resend";
import { PurchaseConfirmationEmail, PurchaseConfirmationEmailProps } from "@/emails/templates/purchase-confirmation";
import { renderAsync } from "@react-email/render";

/**
 * Sends a purchase confirmation email to the user
 */
export async function sendPurchaseConfirmationEmail({
  to,
  data
}: {
  to: string;
  data: PurchaseConfirmationEmailProps;
}) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('ERROR: RESEND_API_KEY is not defined');
      return { success: false, error: 'Resend API Key not configured' };
    }
    
    const emailComponent = PurchaseConfirmationEmail(data);
    const htmlContent = await renderAsync(emailComponent);
    
    const textContent = `Hello ${data.username}! Thank you for your purchase at Hebi Academy. You have purchased the course ${data.courseTitle} for ${data.price}€. You can access your course at: ${process.env.NEXT_PUBLIC_APP_URL}/courses/${data.courseSlug}/${data.chapterId}`;
    
    const emailDestination = process.env.NODE_ENV === 'production' 
      ? to 
      : 'danisanchezpsc@gmail.com'; 
      
    console.log(`✨ Sending email to ${emailDestination} (original email: ${to})...`);
    
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Hebi Academy <onboarding@resend.dev>',
      to: emailDestination,
      subject: `¡Tu compra de ${data.courseTitle} ha sido confirmada!`,
      html: htmlContent,
      text: textContent,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    return { success: false, error };
  }
}
