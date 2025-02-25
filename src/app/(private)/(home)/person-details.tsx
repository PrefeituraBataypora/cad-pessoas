import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog'
import type { Person } from '@prisma/client'
import dayjs from 'dayjs'
import { Plus } from 'lucide-react'

interface PersonDetailsProps {
  person: Person
}

const PersonDetails = ({ person }: PersonDetailsProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" title="Ver mais">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{person.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <p>Código do Cadastro: {person.codCadastro}</p>
          <p>Nome: {person.name}</p>
          <p>CPF: {person.cpf ? person.cpf : 'Não informado'}</p>
          <p>RG: {person.rg ? person.rg : 'Não informado'}</p>
          <p>Emissor: {person.issuer ? person.issuer : 'Não informado'}</p>
          <p>UF ID: {person.ufId ? person.ufId : 'Não informado'}</p>
          <p>
            Data de Nascimento:{' '}
            {person.birthDate
              ? dayjs(person.birthDate).format('DD/MM/YYYY')
              : 'Não informado'}
          </p>
          <p>
            Gênero:{' '}
            {person.gender
              ? person.gender === 'MALE'
                ? 'Masculino'
                : 'Feminino'
              : 'Não informado'}
          </p>
          <p>Telefone: {person.phone ? person.phone : "Não informado"}</p>
          <p>Rua: {person.street ? person.street : "Não informado"}</p>
          <p>Número: {person.number ? person.number : "Não informado"}</p>
          <p>Bairro: {person.neighborhood ? person.neighborhood : "Não informado"}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { PersonDetails }
