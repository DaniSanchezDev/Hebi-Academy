import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Hr,
  Button,
} from '@react-email/components';

export interface PurchaseConfirmationEmailProps {
  username: string;
  courseTitle: string;
  courseDescription?: string;
  courseImage?: string;
  courseSlug: string;
  chapterId: string;
  price: string;
  purchaseDate: string;
}

export const PurchaseConfirmationEmail = ({
  username,
  courseTitle,
  courseDescription,
  courseImage,
  courseSlug,
  chapterId,
  price,
  purchaseDate,
}: PurchaseConfirmationEmailProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://hebi-academy.com';
  const courseUrl = `${baseUrl}/courses/${courseSlug}/${chapterId}`;

  return (
    <Html>
      <Head />
      <Preview>Thank you for your purchase at Hebi Academy!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Heading style={headerStyle}>Hebi Academy</Heading>
          </Section>
          <Section>
            <Heading style={header}>Thank you for your purchase, {username}!</Heading>
            <Text style={paragraph}>
              Congratulations! You have purchased access to the course <strong style={courseTitleStyle}>{courseTitle}</strong>.
            </Text>
            <Text style={paragraph}>
              Your access to the course has been activated correctly.
            </Text>
          </Section>
          <Section style={courseSection}>
            <Heading as="h2" style={subheading}>
              Purchase details:
            </Heading>
            {courseImage && (
              <Img
                src={courseImage}
                alt={courseTitle}
                width="500"
                height="300"
                style={courseImageStyle}
              />
            )}
            <Text style={courseTitleStyle}>
              {courseTitle}
            </Text>
            {courseDescription && (
              <Text style={paragraph}>
                {courseDescription}
              </Text>
            )}
            <Text style={paragraph}>
              <strong>Purchase date:</strong> {purchaseDate}
            </Text>
            <Text style={paragraph}>
              <strong>Price:</strong> {price}€
            </Text>
          </Section>
          <Section style={buttonContainer}>
            <Button style={button} href={courseUrl}>
              Access my course
            </Button>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={footer}>
              This email was sent from Hebi Academy. If you did not make this purchase or have any questions, please contact us.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f5f5ff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0',
  width: '600px',
  backgroundColor: 'white',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(100, 75, 200, 0.1)',
};

const headerSection = {
  padding: '20px 0',
  textAlign: 'center' as const,
};

const headerStyle = {
  fontSize: '28px',
  fontWeight: 'bold' as const,
  color: '#4338ca', 
  margin: '0 0 15px',
  textAlign: 'center' as const,
};

const header = {
  fontSize: '24px',
  fontWeight: 'bold' as const,
  color: '#4338ca', 
  margin: '15px 0',
  padding: '0 0 15px',
  borderBottom: '1px solid #e3dafb',
  marginBottom: '15px',
};

const subheading = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#6366f1', 
  marginTop: '15px',
  marginBottom: '15px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#334155',
};

const courseSection = {
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '8px',
  margin: '15px',
  border: '1px solid #e0e7ff', 
};

const courseTitleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#4f46e5',
  marginTop: '10px',
};

const courseImageStyle = {
  borderRadius: '8px',
  border: '1px solid #e0e7ff', 
  width: '100%',
  height: 'auto',
  marginBottom: '15px',
};

const buttonContainer = {
  padding: '20px 0',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#4f46e5', 
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 12px',
  cursor: 'pointer',
  width: '100%',
};

const hr = {
  borderColor: '#e0e7ff', 
  margin: '20px 0',
};

const footer = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '5px 0',
  textAlign: 'center' as const,
  padding: '20px 0',
  borderTop: '1px solid #e3dafb',
  marginTop: '20px',
};

export default PurchaseConfirmationEmail;
