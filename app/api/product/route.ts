import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/shopify/products";

export async function GET(req: NextRequest) {
	const handle = req.nextUrl.searchParams.get("handle");

	if (!handle) {
		return NextResponse.json({ error: "Missing handle" }, { status: 400 });
	}

	try {
		const product = await getProduct(handle);
		return NextResponse.json({ product });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to fetch product" },
			{ status: 500 },
		);
	}
}
