import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
  typescript: true,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const creditsPerPriceId: Record<string, number> = {
  [process.env.STRIPE_PRICE_ID_ONE_CREDIT!]: 1,
  [process.env.STRIPE_PRICE_ID_THREE_CREDITS!]: 3,
  [process.env.STRIPE_PRICE_ID_FIVE_CREDITS!]: 5,
};

export async function POST(request: Request) {
  const sig = headers().get("stripe-signature");
  const rawBody = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
  } catch (err: any) {
    console.error("Webhook Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id;

    console.log("✅ checkout.session.completed event received");
    console.log("✅ Session object:", session);

    if (!userId) {
      console.error("❌ Missing client_reference_id (userId).");
      return NextResponse.json({ message: "Missing client_reference_id" }, { status: 400 });
    }

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      console.log("✅ Line items retrieved:", lineItems.data);

      const item = lineItems.data[0];

      if (!item || !item.price) {
        console.error("❌ Missing item or price in line items.");
        return NextResponse.json({ message: "Invalid line items (no price/item)" }, { status: 400 });
      }

      const priceId = item.price.id;
      const quantity = item.quantity || 1;
      const creditsPerUnit = creditsPerPriceId[priceId];

      console.log(`✅ priceId: ${priceId}`);
      console.log(`✅ quantity: ${quantity}`);
      console.log(`✅ creditsPerUnit: ${creditsPerUnit}`);

      if (!creditsPerUnit) {
        console.error("❌ Price ID not found in creditsPerPriceId mapping");
        return NextResponse.json({ message: "Invalid price ID" }, { status: 400 });
      }

      const totalCreditsPurchased = quantity * creditsPerUnit;
      console.log(`✅ totalCreditsPurchased: ${totalCreditsPurchased}`);

      const { data: existingCredits } = await supabase
        .from("credits")
        .select("credits")
        .eq("user_id", userId)
        .single();

      if (existingCredits) {
        const updatedCredits = existingCredits.credits + totalCreditsPurchased;
        await supabase
          .from("credits")
          .update({ credits: updatedCredits })
          .eq("user_id", userId);

        console.log(`✅ Updated credits to ${updatedCredits} for user ${userId}`);
      } else {
        await supabase
          .from("credits")
          .insert({ user_id: userId, credits: totalCreditsPurchased });

        console.log(`✅ Inserted new credit (${totalCreditsPurchased}) for user ${userId}`);
      }

      return NextResponse.json({ message: "success" }, { status: 200 });
    } catch (err: any) {
      console.error("❌ Error updating Supabase:", err.message);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }

  console.log(`Unhandled event type: ${event.type}`);
  return NextResponse.json({ message: `Unhandled event type ${event.type}` }, { status: 200 });
}