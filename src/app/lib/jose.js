// src/app/lib/jwt.js
import { SignJWT, jwtVerify } from 'jose';

// Puedes cambiar el valor por process.env.JWT_SECRET si lo prefieres.
const JWT_SECRET = process.env.JWT_SECRET || 'adminsecretkeyadminsecretkeyadmin12';

// Función para firmar el token
export async function signToken(payload) {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    // Agregamos .setIssuedAt() para incluir la fecha de emisión
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);
  } catch (error) {
    console.error('Error en signToken:', error);
    throw error; // relanza el error para que el endpoint lo capture
  }
}


// Función para verificar el token
export async function verifyToken(token) {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    // jwtVerify retorna un objeto { payload, protectedHeader }, nos interesa el payload
    const { payload } = await jwtVerify(token, secret);
    return payload; // { userId, role, iat, exp, ... }
  } catch (error) {
    console.error('Error al verificar token con jose:', error);
    return null;
  }
}
