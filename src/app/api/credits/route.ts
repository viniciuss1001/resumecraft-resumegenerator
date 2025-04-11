import { getUserCredits } from "@/db/queries";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const credits = await getUserCredits()

		return NextResponse.json({ credits })

	} catch (error) {
		console.error(error)
		return new NextResponse("Erro ao buscar créditos", { status: 500 })
	}
}
