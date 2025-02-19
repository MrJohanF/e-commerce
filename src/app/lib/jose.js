// src/app/lib/jwt.js
import { SignJWT, jwtVerify } from 'jose';

// Puedes cambiar el valor por process.env.JWT_SECRET si lo prefieres.
const JWT_SECRET = process.env.JWT_SECRET || 'clave-super-secreta';

// Función para firmar el token
export async function signToken(payload) {
  // `jose` requiere un Uint8Array como secreto
  const secret = new TextEncoder().encode(JWT_SECRET);

  // Creamos el JWT con HS256 y expiración en 24 horas
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(secret);
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
