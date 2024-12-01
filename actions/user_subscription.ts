'use server'

import { getUserSubscription } from "@/db/queries";
import { stripe } from "@/lib/stripe";
import { getAbsolutePath } from "@/lib/utils"
import { auth, currentUser } from "@clerk/nextjs/server";

const returnUrl = getAbsolutePath('/shop');

// Creates a checkout url and returns the url.
export const createStripeUrl = async () => {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        throw new Error('UnAuthorized user.')
    }

    const userSubscription = await getUserSubscription();

    // This case will return a checkout portal / billing portal url, Since the customer already had an active account with us

    // NOTE: This requires some configuration to work on localhost for testing.
    if (userSubscription && userSubscription.stripeCustomerId) {
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: userSubscription.stripeCustomerId,
            return_url: returnUrl,
        });

        return { data: stripeSession.url };
    }

    const stripeSession = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [{
            quantity: 1,
            price_data: {
                currency: 'USD',
                product_data: {
                    name: 'Lingo Pro',
                    description: 'Unlimited hearts',
                },
                unit_amount: 2000, // $20
                recurring: {
                    interval: 'month',
                } 
            },
        }],
        metadata: {
            userId,
        },
        success_url: returnUrl,
        cancel_url: returnUrl,
    });

    return { data: stripeSession.url };
};