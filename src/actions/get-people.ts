"use server"

import { prisma } from "@/lib/prisma"

interface GetPeopleProps {
    page: number
    limit: number
}

const getPeople = async ({ page = 1, limit = 10 }: GetPeopleProps) => {
    try {
        const people = await prisma.person.findMany({
            orderBy: {
                createdAt: 'desc'
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

        return { people, total }
    }
    catch (error: any) {
        throw new Error(error.message)
    }
}

export {getPeople }