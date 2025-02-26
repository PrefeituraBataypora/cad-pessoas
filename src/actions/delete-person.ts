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

    return { success: true }
    // biome-ignore lint: error type
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export { deletePerson }
