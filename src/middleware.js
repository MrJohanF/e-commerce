// src/middleware.js
import { NextResponse } from 'next/server';
import { verifyToken } from './app/lib/jose';

export async function middleware(request) {
  // Ejemplo: proteger rutas que empiezan con /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Excluir la página de login
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Tomar el token de la cookie o del header (authorization)
    const token = request.cookies.get('adminToken')?.value 
               || request.headers.get('authorization')?.split(' ')[1];

    // Si no existe token => redirección
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Importante: 'verifyToken' es asíncrono
    console.log('Middleware => JOSE_SECRET:', process.env.JWT_SECRET);

    const payload = await verifyToken(token);
    console.log('Middleware => Payload:', payload);

    // Si el payload es null (token inválido) o el rol no es ADMIN => redirige
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Dejar pasar
    return NextResponse.next();
  }

  // Otras rutas
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
  // Nota: no pongas runtime: 'nodejs', el middleware corre en edge.
};
