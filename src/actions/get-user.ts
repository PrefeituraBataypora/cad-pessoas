"use server";

import { prisma } from "@/lib/prisma"

interface GetUserProps {
    userId: string
}

const getUser = async ({ userId }: GetUserProps) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        },
        select: {
            id: true,
            name: true,
            email: true,
        }
    })

    return user
}

export { getUser }