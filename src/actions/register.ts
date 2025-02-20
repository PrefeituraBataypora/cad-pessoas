'use server'

import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { env } from '@/lib/env'

const registerSchema = z.object({
  email: z.string().email('E-mail inválido'),
  name: z.string().nonempty('Nome é obrigatório'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
})

type RegisterProps = z.infer<typeof registerSchema>

const register = async (data: RegisterProps) => {
  const { email, name, password } = registerSchema.parse(data)

  const isUserRegistered = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (isUserRegistered) {
    throw new Error('Usuário já registrado')
  }

  const salts = await bcrypt.genSalt(env.ENCRYPT_SALT)
  const hashedPassword = await bcrypt.hash(password, salts)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  })

  return user
}

export { register }
