import Stripe from "stripe";
import { redirect } from 'next/navigation';

export const checkoutOrder = async (order: any) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = order.isFree ? 0 : Number(order.price) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'php',
            unit_amount: price,
            product_data: {
              name: order.eventTitle,
              images: [order.imageUrl]
            }
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 2,
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId: 'eventidtest',
        buyerId: 'eventbuyeridtest',
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_EVENTUNE_URL}`,
      cancel_url: `${process.env.NEXT_PUBLIC_EVENTUNE_URL}`,
    });

    redirect(session.url!)
  } catch (error) {
    throw error;
  }
}