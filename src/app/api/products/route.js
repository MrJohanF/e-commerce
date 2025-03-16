// src/app/api/products/route.js
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request) {
  try {
    // Get search params from the request URL
    const { searchParams } = new URL(request.url);

    // Read pagination params
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "9", 10);
    
    // Read filter params
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")) : undefined;
    const search = searchParams.get("search");

    // Build where clause for filtering
    const where = {};
    
    // Filter by category if specified and not 'all'
    if (category && category !== 'all') {
      where.category = category;
    }
    
    // Filter by price range if specified
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }
    
    // Filter by search query if provided
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Calculate how many records to skip
    const skip = (page - 1) * limit;

    // Fetch filtered products with pagination
    const products = await prisma.product.findMany({
      where,
      skip,
      take: limit,
    });

    // Count total filtered products
    const totalProducts = await prisma.product.count({ where });
    const totalPages = Math.ceil(totalProducts / limit);

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