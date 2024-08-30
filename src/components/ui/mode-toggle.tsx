import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ui/theme-provider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { Moon, Sun } from "lucide-react";
import { useTranslation } from 'react-i18next';

export function ModeToggle() {

    const { setTheme } = useTheme()
    const { i18n } = useTranslation()
    const handleLanguageChange = (lng: string) => {
        i18n.changeLanguage(lng)
        localStorage.setItem('language', lng)
    }

    return (
        <TooltipProvider>
            <DropdownMenu>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Alternar temas</span>
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Alternar modos</p>
                    </TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="center">
                    <DropdownMenuItem className="flex justify-center" onClick={() => setTheme("light")}>
                        Claro
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex justify-center" onClick={() => setTheme("dark")}>
                        Escuro
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex justify-center border-b-[1px]" onClick={() => setTheme("system")}>
                        Sistema
                    </DropdownMenuItem>
                    <div className="flex flex-col space-y-1 m-1">
                        <button onClick={() => handleLanguageChange('en')}>English</button>
                        <button onClick={() => handleLanguageChange('pt')}>Português</button>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </TooltipProvider>
    );
}
