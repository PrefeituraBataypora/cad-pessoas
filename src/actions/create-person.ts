'use server'

import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import CPF from 'cpf'

const rgRegex = /^[0-9]{7,9}$/

const createPersonSchema = z.object({
  codCadastro: z.string().nonempty('Código de cadastro não pode ser vazio'),
  name: z.string().nonempty('Nome não pode ser vazio'),
  cpf: z
    .string()
    .optional()
    .nullable()
    .refine(value => !value || CPF.isValid(CPF.format(value)), {
      message: 'CPF inválido',
    })
    .transform(value => (value === '' ? null : value)),
  rg: z
    .string()
    .optional()
    .nullable()
    .transform(value => (value === '' ? null : value)) // Transformando para null se estiver vazio
    .transform(value => (value ? value.replace(/\D/g, '') : value)) // Removendo caracteres não numéricos
    .refine(value => !value || rgRegex.test(value), {
      message: 'RG inválido',
    })
    .transform(value => {
      if (!value) return value
      if (value.length === 9)
        return value.replace(/^(\d{2})(\d{3})(\d{3})$/, '$1.$2.$3')
      if (value.length === 8)
        return value.replace(/^(\d{1})(\d{3})(\d{3})$/, '$1.$2.$3')
      if (value.length === 7)
        return value.replace(/^(\d{1})(\d{3})(\d{3})$/, '$1.$2.$3')
      return value
    }),
  issuer: z.string().optional().nullable(),
  ufId: z.string().optional().nullable(),
  birthDate: z.date().optional().nullable(),
  gender: z.enum(['MALE', 'FEMALE']).optional().nullable(),
  phone: z.string().optional().nullable(),
  street: z.string().optional().nullable(),
  number: z.string().optional().nullable(),
  neighborhood: z.string().optional().nullable(),
  userId: z.string().optional().nullable().or(z.string().uuid()),
})

type CreatePersonInput = z.infer<typeof createPersonSchema>

const createPerson = async (data: CreatePersonInput) => {
  try {
    const parsedData = createPersonSchema.parse(data)

    const personExists = await prisma.person.findFirst({
      where: {
        OR: [
          {
            codCadastro: parsedData.codCadastro ?? '',
          },
          {
            cpf: parsedData.cpf ?? '',
          },
          {
            rg: parsedData.rg ?? '',
          },
        ],
      },
    })

    if (personExists) {
      return { error: 'Cód Cadastro/CPF/RG já cadastrado', success: false }
    }

    await prisma.person.create({
      data: {
        codCadastro: parsedData.codCadastro,
        name: parsedData.name,
        cpf: parsedData.cpf,
        rg: parsedData.rg,
        issuer: parsedData.issuer,
        ufId: parsedData.ufId,
        birthDate: parsedData.birthDate,
        gender: parsedData.gender,
        phone: parsedData.phone,
        street: parsedData.street,
        number: parsedData.number,
        neighborhood: parsedData.neighborhood,
        userId: parsedData.userId,
      },
    })

    return { success: true }
    // biome-ignore lint: error type
  } catch (error: any) {
    console.log(error.message)
    return { error: error.message, success: false }
  }
}

export { createPerson }
