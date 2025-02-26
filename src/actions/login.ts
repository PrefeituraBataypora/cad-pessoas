'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { env } from '@/lib/env'
import { cookies } from 'next/headers'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type LoginProps = z.infer<typeof loginSchema>

const login = async (data: LoginProps) => {
  const { email, password } = loginSchema.parse(data)

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return { error: 'Usuário não encontrado', success: false }
  }

  const isValidPassword = await bcrypt.compare(password, user.password)

  if (!isValidPassword) {
    return { error: 'Senha inválida', success: false }
  }

  const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
    expiresIn: '7d',
  })

  const cookieStore = await cookies()

  cookieStore.set('token', token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })

  return { success: true }
}

export { login }
