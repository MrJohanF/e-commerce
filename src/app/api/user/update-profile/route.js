// src/app/api/users/update-profile/route.js
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma"; // your prisma client import

export async function PUT(request) {
  try {
    const { userId, name, email } = await request.json();

    // Basic validation
    if (!userId || !name || !email) {
      return NextResponse.json(
        { error: "Faltan datos (userId, name, email)" },
        { status: 400 }
      );
    }

    // Convert userId to number if needed
    const userIdNum = Number(userId);

    // Update user in DB
    await prisma.user.update({
      where: { id: userIdNum },
      data: {
        name,
        email,
        // add more fields if necessary
      }
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Error al actualizar el perfil" },
      { status: 500 }
    );
  }
}
