// import { NextResponse } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request, res:any) {
  const { price }: any = await req.json();


  const line_items = [{
    quantity: 1,
    price_data: {
      currency: "usd",
      product_data: {
        name: "Test",
        description: "Test description",
      },
      unit_amount: price * 100, // Stripe expects prices in cents
    } }];

  try {

    const stripeSession = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_BASE_URL}/?success=true`,
      cancel_url: `${process.env.NEXT_BASE_URL}/?error=true`,
    });

    console.log(stripeSession);
    if (stripeSession.url) {
        console.log("Payment success");
        return NextResponse.redirect(stripeSession.url, 303);
    } else {
        return NextResponse.json(
            { message: "Stripe session URL is null" },
            { status: 500 }
        );
    }
  } catch (err) {
    console.log({ err });
    return NextResponse.json(
      { message: "An expected error occurred, please try again" },
      { status: 500 }
    );
  }
}