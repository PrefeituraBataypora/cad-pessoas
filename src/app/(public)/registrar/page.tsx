'use client'

import { register as registerUser } from '@/actions/register'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-dropdown-menu'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
// import { Brand } from '../brand'
// import Logo from "../logo.jpg" // path to the image

const registerSchema = z.object({
  email: z.string().email('E-mail inválido'),
  name: z.string().nonempty('Nome é obrigatório'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
})

type RegisterProps = z.infer<typeof registerSchema>

const RegisterPage = () => {
  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProps>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async ({ email, name, password }: RegisterProps) => {
    const { success, error } = await registerUser({ email, name, password })

    if (success) {
      toast.success('Usuário registrado com sucesso')
      return push('/login')
    }

    toast.error(`Erro ao registrar usuário: ${error}`)
  }

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2 border rounded-md max-w-xl w-full mx-auto p-4"
      >
        {/* <Brand image={Logo} name="alt name" />  */}
        <p className="font-medium text-2xl">Registro</p>
        <div className="space-y-1">
          <Label>Nome</Label>
          <Input type="text" {...register('name')} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label>E-mail</Label>
          <Input type="email" {...register('email')} />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label>Senha</Label>
          <Input type="password" {...register('password')} />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button
            onClick={() => push('/login')}
            type="button"
            variant="secondary"
          >
            Voltar ao login
          </Button>
          <Button type="submit">Cadastrar</Button>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
