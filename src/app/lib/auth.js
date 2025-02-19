// src\app\lib\auth.js

import { headers } from 'next/headers'
import { verifyToken } from './jose'

export async function getSession() {
  const headersList = headers()
  const token = headersList.get('authorization')?.split(' ')[1]
  
  if (!token) return null
  
  const payload = verifyToken(token)
  return payload
}