// src/app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  category: z.string().min(1),
  price: z.number().positive("El precio debe ser mayor a 0"),
  stock: z.number().nonnegative("El stock no puede ser negativo"),
  description: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        // e.g. replace line breaks with spaces
        return val.replace(/\r?\n/g, " ");
      }
      return val;
    },
    z.string().optional()
  ),
  specifications: z.array(z.object({ key: z.string(), value: z.string() })).optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  color: z.string().optional(),
  warranty: z.string().optional(),
  imageUrl: z.string().url().optional(),
  features: z.array(z.string()).optional(),
});

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error obteniendo producto:", error);
    return NextResponse.json({ error: "Error obteniendo producto" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    console.log("PUT data =>", data);

    data.price = Number(data.price);
    data.stock = Number(data.stock);

    const parsedData = productSchema.parse(data);
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: parsedData,
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Zod validation failed:", error.issues);
    } else {
      console.error("Error actualizando producto:", error);
    }
    return NextResponse.json({ error: "Error actualizando producto" }, { status: 500 });
  }
}



export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const deletedProduct = await prisma.product.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Error deleting product" },
      { status: 500 }
    );
  }
}
