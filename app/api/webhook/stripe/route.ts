// This is your test secret API key.
// const stripe = require('stripe')('sk_test_51Ob4jKCIWkxqcCoTdLQnBYvbrugAyNDtSI33YwauV11vSc6bnYzOqZBr7ODY75GbPQWWdz5nMbaU3djfoJdGTg8S00AwjVNRXF');
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
// Replace this endpoint secret with your endpoint's unique secret
// If you are testing with the CLI, find the secret by running 'stripe listen'
// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
// at https://dashboard.stripe.com/webhooks
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const POST = async (request: NextRequest, response: NextResponse) => {
  let event;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers.get('stripe-signature');
    const body = await request.text();
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature as string,
        endpointSecret
      );
    } catch (err: any) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return NextResponse.next({ status: 400 })
    }
  }

  // Handle the event
  switch (event?.type) {
    case 'checkout.session.completed':
      const orderIntent = event.data.object;
      console.log(`OrderIntent for ${orderIntent.amount_total} was successful!`);
      /**
       * 💡 Execute backend action here
       */
      return NextResponse.json({ message: 'OK', newOrder: orderIntent });
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event?.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return new Response('', { status: 200 });

}
