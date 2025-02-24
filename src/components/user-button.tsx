'use client'

import cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/actions/get-user'
import { useUserStore } from '@/providers/user'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { LogOut, User } from 'lucide-react'

const UserButton = () => {
  const { user, setUser } = useUserStore(state => state)

  const token = cookies.get('token')

  // @ts-ignore
  const id = jwt.decode(token)?.userId

  const { data: userInfo, isError } = useQuery({
    queryKey: id ? ['user', id] : [],
    queryFn: async () => getUser({ userId: id }),
    staleTime: 1000 * 60 * 60,
    enabled: !!id, // Só executa se id existir
  })

  const logout = () => {
    cookies.remove('token')
    setUser(null)
    window.location.reload()
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (userInfo && userInfo !== user) {
      // @ts-ignore
      setUser(userInfo)
    }
  }, [userInfo, user])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isError) {
      setUser(null)
    }
  }, [isError])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <User />
          {user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={logout} className="flex items-center gap-2">
          <LogOut />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { UserButton }
