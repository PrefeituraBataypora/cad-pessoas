'use server'

import { prisma } from '@/lib/prisma'

interface DeletePersonProps {
  id: string
}

const deletePerson = async ({ id }: DeletePersonProps) => {
  try {
    await prisma.person.delete({
      where: {
        id: id,
      },
    })

  } 
  // biome-ignore lint: error type
  catch (error: any) {
    throw new Error(error)
  }
}

export { deletePerson }