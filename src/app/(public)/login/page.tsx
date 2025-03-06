'use client'

import { login } from '@/actions/login'
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

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

type LoginProps = z.infer<typeof loginSchema>

const LoginPage = () => {
  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginProps) => {
    const { error, success } = await login(data)

    if (success) {
      toast.success('Login realizado com sucesso')
      return push('/')
    }

    toast.error(`Erro ao realizar login: ${error}`)
  }

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2 border rounded-md max-w-xl w-full mx-auto p-4"
      >
        {/* <Brand image={Logo} name="alt name" />  */}
        <p className="font-medium text-2xl">Login</p>
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
            onClick={() => push('/registrar')}
            type="button"
            variant="secondary"
          >
            Registrar
          </Button>
          <Button type="submit">Entrar</Button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
