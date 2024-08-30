import { ModeToggle } from '../../ui/mode-toggle'
import { RefreshCcw } from 'lucide-react'
import { Button } from '../../ui/button'
import { MobileSidebar } from '../sidebar/mobile-sidebar'
import { cn } from '@/lib/utils'
import VolumeDropdown from './volume-dorpdown'
import UserOptions from './user-options'
import Notifications from './notifications'
import Registers from './registers'
import Messages from './messages'

export default function Header() {

    const handleRefresh = () => {
        window.location.reload();
      };

    return (
        <div className='w-full h-10 bg-white dark:bg-[#030712] fixed z-50 flex justify-between items-center pr-2 border-b md:justify-end'>
            <div className={cn("block md:!hidden ml-3")}>
                <MobileSidebar />
            </div>
            <div>
                <ModeToggle />
                <Button variant='ghost' size="icon" onClick={handleRefresh}><RefreshCcw /></Button>
                <VolumeDropdown/>
                <Notifications/>
                <Registers/>
                <Messages/>
                <UserOptions/>
            </div>
        </div>
    )
}
