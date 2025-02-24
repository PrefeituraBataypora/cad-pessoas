import { ChangeTheme } from './change-theme'
import { UserButton } from './user-button'

const Navbar = () => {
  return (
    <div className="w-full border rounded-md p-2 flex items-center justify-between">
      <p className="text-xl font-medium">Cadastro de Pessoas</p>
      <div className='flex items-center gap-2'>
        <ChangeTheme />
        <UserButton />
      </div>
    </div>
  )
}

export { Navbar }
