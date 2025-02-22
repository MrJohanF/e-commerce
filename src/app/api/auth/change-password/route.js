import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { userId, currentPassword, newPassword } = await request.json();
    if (!userId || !currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Datos incompletos" },
        { status: 400 }
      );
    }

    // 1. Fetch the user from DB
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },  // or parseInt(userId)
    });
    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // 2. Check old password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Contraseña actual incorrecta" },
        { status: 401 }
      );
    }

    // 3. Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // 4. Update the user in DB
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword },
    });

    // 5. Respond success
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error changing password:", err);
    return NextResponse.json(
      { error: "Error al cambiar la contraseña" },
      { status: 500 }
    );
  }
}
