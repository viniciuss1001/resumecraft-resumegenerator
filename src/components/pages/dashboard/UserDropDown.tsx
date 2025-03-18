import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, SquareUser } from "lucide-react"
import Link from "next/link"


const UserDropdownComponent = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className="w-full gap-2 justify-start px-2">
          <Avatar>
            <AvatarImage src='https://github.com/viniciuss1001.png' alt='Avatar'/>
            <AvatarFallback>
              Vinicius
            </AvatarFallback>
          </Avatar>
            <p>Vinicius Frota</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center"
      className="w-[var(--radix-dropdown-menu-trigger-width)]"
      >
        <Link passHref href='/dashboard/account'>
        <DropdownMenuItem>
          <SquareUser size={16}/>
          Configurações de Conta
        </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="text-red-500">
          <LogOut size={16}/>
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default UserDropdownComponent