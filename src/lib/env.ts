import { z } from 'zod'

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    ENCRYPT_SALT: z.coerce.number().int().positive(),
    JWT_SECRET: z.string(),
})

const env = envSchema.parse(process.env)

export { env }
