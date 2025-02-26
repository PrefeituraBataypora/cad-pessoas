import { CreatePerson } from '@/app/(private)/(home)/create.person'
import { ChangeTheme } from './change-theme'
import { UserButton } from './user-button'
import { SearchInput } from './search-input'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className="w-full border rounded-md p-2 flex items-center justify-between">
      <div className='flex items-center gap-2'>
        <Image src="/cras.jpg" width={40} height={40} alt="Logo" className='rounded-md' />
        <p className="text-xl font-medium">Cadastro de Pessoas</p>
      </div>
      <div className="flex items-center gap-2">
        <SearchInput />
        <CreatePerson />
        <ChangeTheme />
        <UserButton />
      </div>
    </div>
  )
}

export { Navbar }
