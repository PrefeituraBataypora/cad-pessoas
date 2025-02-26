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
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await prisma.person.count()

    if (!people) {
      throw new Error('No people found')
    }

    if (people.length === 0) {
      throw new Error('No people found')
    }

    if (name) {
      const peopleFiltered = people.filter(person => person.name.includes(name))

      return { people: peopleFiltered, total: peopleFiltered.length }
    }

    return { people, total }
    // biome-ignore lint: error type
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export { getPeople }
