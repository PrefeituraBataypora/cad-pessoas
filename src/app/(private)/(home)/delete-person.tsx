'use client'

import { deletePerson } from '@/actions/delete-person'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface DeletePersonProps {
  id: string
  name: string
}

const DeletePerson = ({ id, name }: DeletePersonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const queryClient = useQueryClient()

  const removePerson = async () => {
    setIsDeleting(true)

    const { success, error } = await deletePerson({ id })
    setIsDeleting(false)

    if (success) {
      queryClient.invalidateQueries({
        queryKey: ['people'],
      })
      toast.success('Pessoa excluída com sucesso!')
      return setIsOpen(false)
    }

    toast.error(`Erro ao excluir pessoa: ${error}`)
  }

  return (
    <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon" title="Excluir">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja realmente excluir {name}?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            asChild
            onClick={removePerson}
            disabled={isDeleting}
          >
            <Button variant="destructive">Excluir</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { DeletePerson }
