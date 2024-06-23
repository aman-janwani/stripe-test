import Stripe from "stripe";

export const stripe:any = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-04-10", // Updated to the correct version
    typescript: true,
  });