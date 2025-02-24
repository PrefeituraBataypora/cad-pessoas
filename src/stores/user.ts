import type { User } from "@prisma/client"
import { createStore } from "zustand/vanilla"

type UserState = {
    user: User | null
}

type UserActions = {
    setUser: (user: User | null) => void
    clearUser: () => void
}

type UserStore = UserState & UserActions

const initUserStore = (): UserState => {
    return { user: null }
}

const defaultInitState: UserState = {
    user: null,
}

const createUserStore = (initState: UserState = defaultInitState) => {
    return createStore<UserStore>()((set) => ({
        ...initState,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
    }))
}

export { type UserState, type UserActions, type UserStore, initUserStore, createUserStore }