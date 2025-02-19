// src/app/api/auth/logout/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  // Creamos la respuesta
  const response = NextResponse.json({ message: 'Logout successful' });
  // Borramos la cookie 'adminToken'
  response.cookies.delete('adminToken', { path: '/' });
  return response;
}
