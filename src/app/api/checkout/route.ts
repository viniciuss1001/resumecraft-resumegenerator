import { NextResponse } from "next/server";
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2025-03-31.basil"
})

export async function POST(req: Request) {
	const { quantity } = await req.json()

	const priceCreditsId: Record<number, string> = {
		5: "price_1RCTVFIepmqZXD3ajy6BvQcH",
		10: "price_1RCUymIepmqZXD3aCi5oaF77",
		20: "price_1RCUymIepmqZXD3aMDccVpjA"
	}

	const priceId = priceCreditsId[quantity]

	try {
		const session = await stripe.checkout.sessions.create({
			mode: "payment",
			payment_method_types: ["card"],
			line_items: [
				{
					price: priceId,
					quantity: 1
				}
			],
			success_url: `${process.env.NEXT_PUBLIC_APP_URL!}/dashboard/resumes?success=true`,
			cancel_url: `${process.env.NEXT_PUBLIC_APP_URL!}/dashboard/resumes?canceled=true`
		})

		return NextResponse.json({ url: session.url })
	} catch (error) {
		console.error("Erro no checkout:", {error})
		return NextResponse.json({ error: "Erro ao criar sessão de checkout" }, { status: 500 })
	}
} 