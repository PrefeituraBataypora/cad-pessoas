'use client'

import { getPeople } from '@/actions/get-people'
import { useQuery } from '@tanstack/react-query'
import { PeopleTable } from './people-table'
import { useSearchParams } from 'next/navigation'

const Home = () => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('pagina')) || 1
  const limit = Number(searchParams.get('quantidade')) || 10
  const name = searchParams.get('nome') || undefined

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ['people', page, limit, name],
    queryFn: async () => getPeople({ page, limit, name }),
  })

  if (isFetching) {
    return (
      <div className="w-full h-[calc(100vh-5rem)] flex items-center justify-center">
        Carregando...
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="w-full h-[calc(100vh-5rem)] flex items-center justify-center">
        Ocorreu um erro ao carregar os dados
      </div>
    )
  }

  if (data.people.length === 0) {
    return (
      <div className="w-full h-[calc(100vh-5rem)] flex items-center justify-center">
        Nenhuma pessoa encontrada
      </div>
    )
  }

  return (
    <main className="mt-2">
      <PeopleTable people={data?.people || []} count={data?.total} />
    </main>
  )
}

export default Home
