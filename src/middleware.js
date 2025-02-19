// src/middleware.js
import { NextResponse } from 'next/server';
import { verifyToken } from './app/lib/jwt';

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Excluir la página de login
    if (request.nextUrl.pathname === '/admin/login') {
      // Si ya está autenticado, redirigir al dashboard
      const token = request.cookies.get('adminToken')?.value;
      if (token) {
        try {
          const payload = verifyToken(token);
          if (payload && payload.role === 'ADMIN') {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
          }
        } catch (error) {
          // Token inválido, continuar al login
        }
      }
      return NextResponse.next();
    }

    // Verificar token en cookies o headers
    const token = request.cookies.get('adminToken')?.value || 
                 request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const payload = verifyToken(token);
      
      if (!payload || payload.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      const response = NextResponse.next();
      
      // Renovar el token si está próximo a expirar
      if (payload.exp - Date.now() / 1000 < 3600) { // < 1 hora
        const newToken = verifyToken({ ...payload, iat: undefined, exp: undefined });
        response.cookies.set('adminToken', newToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 // 24 horas
        });
      }

      return response;
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
}