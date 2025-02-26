"use server"

import { prisma } from '@/lib/prisma'
import CPF from 'cpf'
import { z } from 'zod'

const rgRegex = /^[0-9]{7,9}$/

const editPersonSchema = z.object({
  id: z.string().uuid(),
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

type EditPersonInput = z.infer<typeof editPersonSchema>

const editPerson = async (data: EditPersonInput) => {
  try {
    const parsedData = editPersonSchema.parse(data)

    await prisma.person.update({
      where: {
        id: parsedData.id,
      },
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

    return true
    // biome-ignore lint: error type
  } catch (error: any) {
    console.log(error.message)
    throw new Error(error)
  }
}

export { editPerson }
