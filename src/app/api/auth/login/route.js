// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { z } from 'zod';

// IMPORTA signToken (asíncrono)
import { signToken } from '@/app/lib/jose';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(request) {
  try {
    const { email, password } = loginSchema.parse(await request.json());
    // ... busca el user, valida password ...

    // FIRMAR el token con jose
    const token = await signToken({ userId: user.id, role: user.role });

    // Crear respuesta JSON
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    // Setear la cookie con el token
    response.cookies.set('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // o 'strict', según prefieras
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Error al iniciar sesión' }, { status: 500 });
  }
}
