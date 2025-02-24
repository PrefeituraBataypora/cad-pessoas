'use client'
import { type UserStore, createUserStore, initUserStore } from '@/stores/user'
import { createContext, useContext, useRef } from 'react'
import { useStore } from 'zustand'

type UserStoreApi = ReturnType<typeof createUserStore>

const UserStoreContext = createContext<UserStoreApi | null>(null)

interface UserStoreProviderProps {
  children: React.ReactNode
}

const UserStoreProvider = ({ children }: UserStoreProviderProps) => {
  // @ts-expect-error - This is a hack to avoid creating a new store on each render
  const storeRef = useRef<TabStoreApi>()

  if (!storeRef.current) {
    storeRef.current = createUserStore(initUserStore())
  }

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  )
}

const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const userStoreConext = useContext(UserStoreContext)

  if (!userStoreConext) {
    throw new Error('useUserStore must be used within a UserStoreProvider')
  }

  return useStore(userStoreConext, selector)
}

export { UserStoreProvider, useUserStore }
