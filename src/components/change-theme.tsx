'use client'

import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { LaptopMinimal, Moon, Sun } from 'lucide-react'

const ChangeTheme = () => {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {theme === 'light' && <Sun />}
          {theme === 'dark' && <Moon />}
          {theme === 'system' && <LaptopMinimal />}
          Tema
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem
          checked={theme === 'light'}
          onClick={() => setTheme('light')}
          className="flex items-center gap-2"
        >
          <Sun /> Claro
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === 'dark'}
          onClick={() => setTheme('dark')}
          className="flex items-center gap-2"
        >
          <Moon /> Escuro
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === 'system'}
          onClick={() => setTheme('system')}
          className="flex items-center gap-2"
        >
          <LaptopMinimal /> Sistema
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ChangeTheme }
