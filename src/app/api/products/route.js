// src/app/api/products/route.js
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma"; // Make sure this matches your prisma import

export async function GET(request) {
  try {
    // Get search params from the request URL
    const { searchParams } = new URL(request.url);

    // Read page/limit from query (default: page=1, limit=9)
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "9", 10);

    // Calculate how many records to skip
    const skip = (page - 1) * limit;

    // Fetch just the needed products (skip / take)
    const products = await prisma.product.findMany({
      skip,
      take: limit,
    });

    // Count total products to calculate total pages
    const totalProducts = await prisma.product.count();
    const totalPages = Math.ceil(totalProducts / limit);

    // Return paginated products and total page count
    return NextResponse.json({
      products,
      totalPages,
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    return NextResponse.json(
      { error: "Error retrieving products" },
      { status: 500 }
    );
  }
}
