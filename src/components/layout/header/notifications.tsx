import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell } from "lucide-react"

export default function Notifications() {

  const notifications = [
    {
      author: "Antonio Jhow",
      message: "Olá",
      date: "17/08/2024",
    },
    {
      author: "Thiago Turco",
      message: "Boa tarde!",
      date: "18/08/2024",
    }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="p-4 flex justify-center items-center">
        {notifications.length > 0 ? (
          <div className="space-y-2">
            {notifications.map((msg, index) => (
              <div key={index} className="p-2 border-b last:border-none">
                <h3 className="font-semibold">{msg.author}</h3>
                <p className="text-sm font-extralight">{msg.message}</p>
                <p className="text-xs text-muted-foreground">{msg.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <h2 className="text-center text-muted-foreground">
            Nenhuma notificação recebida
          </h2>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}