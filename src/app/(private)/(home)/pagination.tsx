'use client'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface PaginationProps {
  count: number
  total: number
}

const Pagination = ({ count, total }: PaginationProps) => {
  const [pagina, setPagina] = useState(1)
  const [quantidade, setQuantidade] = useState(15)
  const searchParams = useSearchParams()
  const router = useRouter()

  const totalPages = Math.ceil(total / quantidade)

  const goToFirstPage = () => {
    setPagina(1)
  }

  const goToLastPage = () => {
    setPagina(totalPages)
  }

  const goToPreviousPage = () => {
    setPagina(pagina - 1)
  }

  const goToNextPage = () => {
    setPagina(pagina + 1)
  }

  useEffect(() => {
    searchParams.get('pagina') && setPagina(Number(searchParams.get('pagina')))
    searchParams.get('quantidade') &&
      setQuantidade(Number(searchParams.get('quantidade')))
  }, [searchParams])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('pagina', String(pagina))
    params.set('quantidade', String(quantidade))
    router.push(`?${params.toString()}`)
  }, [pagina, quantidade])

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        Quantidade de registros por página:
        <Select
          defaultValue="15"
          onValueChange={value => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('quantidade', value)
            setQuantidade(Number(value))
            router.push(`?${params.toString()}`)
          }}
        >
          <SelectTrigger className="w-16">
            <SelectValue placeholder={quantidade} />
          </SelectTrigger>
          <SelectContent className="w-10">
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <p>
        Mostrando {count} de {total} registros
      </p>
      <p>
        Página {pagina} de {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <Button
          onClick={goToFirstPage}
          variant="outline"
          size="icon"
          disabled={pagina === 1 || total === 0}
        >
          <ChevronsLeft />
        </Button>
        <Button
          onClick={goToPreviousPage}
          variant="outline"
          size="icon"
          disabled={pagina === 1 || total === 0}
        >
          <ChevronLeft />
        </Button>
        <Button
          onClick={goToNextPage}
          variant="outline"
          size="icon"
          disabled={pagina === totalPages || total === 0}
        >
          <ChevronRight />
        </Button>
        <Button
          onClick={goToLastPage}
          variant="outline"
          size="icon"
          disabled={pagina === totalPages || total === 0}
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  )
}

export { Pagination }
