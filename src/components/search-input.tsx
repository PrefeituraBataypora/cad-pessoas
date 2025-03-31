'use client'

import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { type FormEvent, useEffect, useState } from 'react'

const SearchInput = () => {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())

    params.set('pagina', '1')

    if (search.length > 0) {
      params.set('nome', search)
    } else {
      params.delete('nome')
    }

    router.push(`?${params.toString()}`)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // @ts-ignore
    searchParams.get('nome') && setSearch(searchParams.get('nome'))
  }, [])

  return (
    <form
      onSubmit={handleSearch}
      className="border rounded-lg flex items-center max-h-9"
    >
      <input
        value={search}
        onChange={event => {
          setSearch(event.target.value)
        }}
        className="outline-none pl-2"
      />
      <Button type="submit" variant="ghost" size="icon">
        <Search />
      </Button>
    </form>
  )
}

export { SearchInput }
