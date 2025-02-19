// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/app/lib/prisma'; // Asegúrate de tener tu conexión a la DB
import bcrypt from 'bcryptjs';
import { signToken } from '@/app/lib/jose';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(request) {
  try {
    const { email, password } = loginSchema.parse(await request.json());
    
    // Buscar el usuario en la base de datos
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }
    
    // Validar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }
    
    // FIRMAR el token con jose
    console.log('Login => JOSE_SECRET:', process.env.JWT_SECRET);
    const token = await signToken({ userId: user.id, role: user.role });
    
    // Crear respuesta JSON
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    });
    
    // Setear la cookie con el token
    response.cookies.set('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Error en el endpoint de login:', error);
    return NextResponse.json({ error: 'Error al iniciar sesión' }, { status: 500 });
  }
}
