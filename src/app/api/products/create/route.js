// src/app/api/products/create/route.js
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  category: z.string().min(1),
  price: z.number().positive("El precio debe ser mayor a 0"),
  stock: z.number().nonnegative("El stock no puede ser negativo"),
  description: z.string().optional(),
  specifications: z.array(z.object({ key: z.string(), value: z.string() })).optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  color: z.string().optional(),
  warranty: z.string().optional(),
  imageUrl: z.preprocess(
    (val) => {
      if (typeof val === "string" && val.trim() === "") return undefined;
      return val;
    },
    z.string().url().optional()
  ),
  features: z.array(z.string()).optional(),
});


export async function POST(request) {
  try {
    const data = await request.json();
    // Convertir price y stock a números, en caso de que vengan como strings
    data.price = Number(data.price);
    data.stock = Number(data.stock);

    // Usamos safeParse para obtener los errores de validación
    const result = productSchema.safeParse(data);
    if (!result.success) {
      console.error("Errores de validación:", result.error.issues);
      return NextResponse.json(
        { error: "Error de validación", issues: result.error.issues },
        { status: 400 }
      );
    }
    const parsedData = result.data;

    // Crear el producto en la base de datos usando Prisma
    const product = await prisma.product.create({
      data: parsedData,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error al crear producto:", error);
    return NextResponse.json(
      { error: "Error al crear el producto" },
      { status: 500 }
    );
  }
}
