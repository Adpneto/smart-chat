import { useState } from "react";
import { SideNav } from "@/components/layout/sidebar/side-nav";
import { NavItems } from "@/components/constants/side-nav";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { ArrowLeftFromLine } from "lucide-react";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const { isOpen, toggle } = useSidebar();
  const [status, setStatus] = useState(false);
  const NavItem = NavItems()

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };
  return (
    <nav
      className={cn(
        `hidden h-screen border-r md:block fixed z-50 bg-white dark:bg-[#030712]`,
        status && "duration-500",
        isOpen ? "w-72" : "w-[78px]",
        className
      )}
    >
      <ArrowLeftFromLine
        className={cn(
          "absolute -right-8 top-2 cursor-pointer text-4xl text-foreground",
          !isOpen && "rotate-180"
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-2">
        <div className="px-3 py-2">
          <div className={cn("space-y-1 overflow-y-auto max-h-[calc(100vh-30px)] overflow-x-hidden sidebar-scrollbar", !isOpen && "hide-scrollbar")}>
            <SideNav
              className="text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100"
              items={NavItem}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}