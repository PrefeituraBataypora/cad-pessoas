import { UserButton } from './user-button'

const Navbar = () => {
  return (
    <div className="w-full border rounded-md p-2 flex items-center justify-between">
      <p className="text-xl font-medium">Cadastro de Pessoas</p>
      <UserButton />
    </div>
  )
}

export { Navbar }
