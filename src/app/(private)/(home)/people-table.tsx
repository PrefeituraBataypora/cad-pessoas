import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Person } from '@prisma/client'
import dayjs from 'dayjs'
import { Pagination } from './pagination'
import { Button } from '@/components/ui/button'
import { Pen, Plus } from 'lucide-react'
import { DeletePerson } from './delete-person'
import { PersonDetails } from './person-details'
import { EditPerson } from './edit-person'

interface PeopleTableProps {
  people: Person[]
  count: number
}

const PeopleTable = ({ people, count }: PeopleTableProps) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cód. Cadastro</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Data de Nascimento</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.map(person => {
            return (
              <TableRow key={person.id}>
                <TableCell>{person.codCadastro}</TableCell>
                <TableCell className="truncate">{person.name}</TableCell>
                <TableCell>{person.cpf ? person.cpf : '-'}</TableCell>
                <TableCell>{person.phone ? person.phone : '-'}</TableCell>
                <TableCell>
                  {person.birthDate ? dayjs(person.birthDate).format('DD/MM/YYYY') : '-'}
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <PersonDetails person={person} />
                  <EditPerson person={person} />
                  <DeletePerson id={person.id} name={person.name} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>
              <Pagination count={people.length} total={count} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

export { PeopleTable }
