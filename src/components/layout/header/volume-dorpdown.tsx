import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { Volume2 } from "lucide-react"

export default function VolumeDropdown() {
  const handleVolumeChange = (value: number[]) => {
    console.log("Volume:", value[0]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Volume2 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-[200px] p-4">
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}