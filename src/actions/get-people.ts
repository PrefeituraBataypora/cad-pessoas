'use server'

import { prisma } from '@/lib/prisma'

interface GetPeopleProps {
  page: number
  limit: number
  name?: string
}

const getPeople = async ({
  page = 1,
  limit = 10,
  name = undefined,
}: GetPeopleProps) => {
  try {
    const people = await prisma.person.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      },
      orderBy: {
        name: 'asc',
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await prisma.person.count({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      }
    })

    if (!people) {
      throw new Error('No people found')
    }

    return { people, total }
    // biome-ignore lint: error type
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export { getPeople }
