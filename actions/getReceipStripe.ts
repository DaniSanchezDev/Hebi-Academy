import Stripe from "stripe";
import { getStripeCustomerId } from "./getStripeCustomerId";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-05-28.basil',
})

type Receipt = {
  paymentIntentId: string;
  receiptUrl: string | null;
};

export const getReceipStripe = async (userId: string): Promise<Receipt[]> => {
    try {
        const stripeCustomerId = await getStripeCustomerId(userId)

        if(!stripeCustomerId) {
            throw new Error("Stripe customer id not found")
        }

        const paymentsIntents = await stripe.paymentIntents.list({
            customer: stripeCustomerId,
            limit: 10,
        })

        const receipts = await Promise.all(
            paymentsIntents.data.map(async (paymentIntent) => {
                if(typeof paymentIntent.latest_charge === "string") {
                    const charge = await stripe.charges.retrieve(
                        paymentIntent.latest_charge
                    )

                    return {
                        paymentIntentId: paymentIntent.id,
                        receiptUrl: charge.receipt_url || null
                    }
                }
                
                return {
                    paymentIntentId: paymentIntent.id,
                    receiptUrl: null
                }
            })
        )
        return receipts;
        
    } catch (error) {
        console.error('Error fetching Stripe receipts:', error);
        return [];
    }
}