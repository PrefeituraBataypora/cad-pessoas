'use client'

import { createPerson } from '@/actions/create-person'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CPF from 'cpf'
import { z } from 'zod'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useUserStore } from '@/providers/user'
import { ScrollArea } from '@/components/ui/scroll-area'
const rgRegex = /^[0-9]{7,9}$/

const createPersonSchema = z.object({
  codCadastro: z.string().nonempty('Código de cadastro não pode ser vazio'),
  name: z.string().nonempty('Nome não pode ser vazio'),
  cpf: z
    .string()
    .optional()
    .nullable()
    .refine(value => !value || CPF.isValid(value), {
      message: 'CPF inválido',
    })
    // @ts-ignore
    .transform(value => (value === '' ? null : CPF.format(value))),
  rg: z
    .string()
    .optional()
    .nullable()
    .transform(value => (value ? value.replace(/\D/g, '') : value))
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
  birthDate: z
    .string()
    .optional()
    .nullable()
    .refine(value => !value || !Number.isNaN(Date.parse(value)), {
      message: 'Data de nascimento inválida',
    })
    .transform(value => {
      if (!value) return null
      const [year, month, day] = value
        .split('-')
        .map(num => Number.parseInt(num, 10))
      const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0))
      return date
    }),
  gender: z.enum(['MALE', 'FEMALE']).optional().nullable(),
  phone: z.string().optional().nullable(),
  street: z.string().optional().nullable(),
  number: z.string().optional().nullable(),
  neighborhood: z.string().optional().nullable(),
})

type CreatePersonInput = z.infer<typeof createPersonSchema>

const CreatePerson = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useUserStore(state => state)
  const queryClient = useQueryClient()

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePersonInput>({
    resolver: zodResolver(createPersonSchema),
  })

  const handleCreatePerson = async (data: CreatePersonInput) => {
    setIsSubmitting(true)

    const newData = {
      ...data,
      ...(user ? { userId: user.id } : {}),
    }
    const { success, error } = await createPerson(newData)

    setIsSubmitting(false)

    if (success) {
      toast.success('Pessoa criada com sucesso')
      queryClient.invalidateQueries({ queryKey: ['people'] })
      reset()
      return setIsOpen(false)
    }

    toast.error(`Erro ao criar pessoa: ${error}`)
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger>
        <Button variant="outline">
          <PlusCircle />
          Adicionar Pessoa
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Pessoa</DialogTitle>
        </DialogHeader>
        <form
          className="max-h-[calc(100vh-8rem)]"
          onSubmit={handleSubmit(handleCreatePerson)}
        >
          <ScrollArea className="h-[calc(100%-2rem)]">
            <div className="space-y-2 px-1 pb-1">
              <div className="flex flex-col gap-2">
                <Label>Cód. Cadastro</Label>
                <Input {...register('codCadastro')} />
                {errors.codCadastro && (
                  <span className="text-xs text-red-500">
                    {errors.codCadastro.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Nome</Label>
                <Input {...register('name')} />
                {errors.name && (
                  <span className="text-xs text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>CPF</Label>
                <Input {...register('cpf')} />
                {errors.cpf && (
                  <span className="text-xs text-red-500">
                    {errors.cpf.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>RG</Label>
                <Input {...register('rg')} />
                {errors.rg && (
                  <span className="text-xs text-red-500">
                    {errors.rg.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Emissor</Label>
                <Input {...register('issuer')} />
                {errors.issuer && (
                  <span className="text-xs text-red-500">
                    {errors.issuer.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>UF ID</Label>
                <Input {...register('ufId')} />
                {errors.ufId && (
                  <span className="text-xs text-red-500">
                    {errors.ufId.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Data de Nascimento</Label>
                <Input type="date" {...register('birthDate')} />
                {errors.birthDate && (
                  <span className="text-xs text-red-500">
                    {errors.birthDate.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Gênero</Label>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onValueChange={onChange}
                      // @ts-ignore
                      value={value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um gênero" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Masculino</SelectItem>
                        <SelectItem value="FEMALE">Feminino</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.gender && (
                  <span className="text-xs text-red-500">
                    {errors.gender.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Telefone</Label>
                <Input type="tel" {...register('phone')} />
                {errors.phone && (
                  <span className="text-xs text-red-500">
                    {errors.phone.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Rua</Label>
                <Input {...register('street')} />
                {errors.street && (
                  <span className="text-xs text-red-500">
                    {errors.street.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Número</Label>
                <Input type="number" {...register('number')} />
                {errors.number && (
                  <span className="text-xs text-red-500">
                    {errors.number.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Bairro</Label>
                <Input {...register('neighborhood')} />
                {errors.neighborhood && (
                  <span className="text-xs text-red-500">
                    {errors.neighborhood.message}
                  </span>
                )}
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" disabled={isSubmitting}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { CreatePerson }
