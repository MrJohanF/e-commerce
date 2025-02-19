// src/app/api/admin/create/route.js
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/app/lib/prisma'
import { getSession } from '@/app/lib/auth'
import { z } from 'zod'

const adminCreateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial'
  ),
  name: z.string().min(2)
})

export async function POST(request) {
  try {
    // Verificar que quien hace la petición es un admin
    const session = await getSession()
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { email, password, name } = adminCreateSchema.parse(body)

    // Verificar si el email ya está registrado
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 400 }
      )
    }

    // Crear nuevo admin
    const hashedPassword = await bcrypt.hash(password, 10)
    const newAdmin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'ADMIN'
      }
    })

    return NextResponse.json({
      message: 'Administrador creado exitosamente',
      admin: {
        id: newAdmin.id,
        email: newAdmin.email,
        name: newAdmin.name,
        role: newAdmin.role
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    
    console.error('Error al crear admin:', error)
    return NextResponse.json(
      { error: 'Error al crear el administrador' },
      { status: 500 }
    )
  }
}