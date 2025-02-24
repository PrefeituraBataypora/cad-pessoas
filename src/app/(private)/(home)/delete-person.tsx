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
import { toast } from 'sonner'

interface DeletePersonProps {
  id: string
  name: string
}

const DeletePerson = ({ id, name }: DeletePersonProps) => {
  const queryClient = useQueryClient()

  const removePerson = async () => {
    try {
      await deletePerson({ id })
      queryClient.invalidateQueries({
        queryKey: ['people'],
      })
      toast.success('Pessoa excluída com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao excluir pessoa!')
    }
  }

  return (
    <AlertDialog>
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
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild onClick={removePerson}>
            <Button variant="destructive">Excluir</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { DeletePerson }
