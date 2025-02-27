// src/middleware.js
import { NextResponse } from 'next/server';
import { verifyToken } from './app/lib/jose';

export async function middleware(request) {
  // Proteger rutas que empiezan con /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Excluir la página de login
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Obtener el token de la cookie (nombre actualizado a "token") o del header (Authorization)
    const token = request.cookies.get('token')?.value 
               || request.headers.get('authorization')?.split(' ')[1];

    // Si no existe token, redirigir a login
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Verificar el token de manera asíncrona
    const payload = await verifyToken(token);

    // Si el token es inválido o el rol no es ADMIN, redirigir
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Permitir el acceso
    return NextResponse.next();
  }

  // Otras rutas
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
