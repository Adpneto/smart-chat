import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"

export default function UserOptions() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="p-2 flex flex-col">
        <Button variant="ghost" className="w-full">Perfil</Button>
        <Button variant="ghost" className="w-full">Sair</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}