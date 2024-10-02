import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function UserOptions() {

  const navigate = useNavigate()

  function Logout() {
    navigate('/login')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="p-2 flex flex-col">
        <Button variant="ghost" className="w-full">Perfil</Button>
        <Button onClick={Logout} variant="ghost" className="w-full">Sair</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}