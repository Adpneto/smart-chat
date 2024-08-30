import { useState, useEffect } from "react";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SideNav } from "@/components/layout/sidebar/side-nav";
import { NavItems } from "@/components/constants/side-nav";

export const MobileSidebar = () => {
    const [open, setOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const NavItem = NavItems()

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <div className="flex items-center justify-center gap-2">
                        <MenuIcon />
                    </div>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 hide-scrollbar overflow-y-auto">
                    <div className="px-1 py-6 pt-16 ">
                        <SideNav items={NavItem} setOpen={setOpen} />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
};