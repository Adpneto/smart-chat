"use client";

import { NavLink } from "react-router-dom";
import { type NavItem } from "@/types";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { buttonVariants } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/layout/sidebar/subnav-accordion";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface SideNavProps {
  items: NavItem[];
  setOpen?: (open: boolean) => void;
  className?: string;
}

export function SideNav({ items, setOpen, className }: SideNavProps) {
  const [openItem, setOpenItem] = useState<string>("");
  const { isOpen } = useSidebar();
  const [logoType, setLogoType] = useState<"full" | "icon">("icon");

  useEffect(() => {
    if (isOpen) {
      setLogoType("full");
    } else {
      setTimeout(() => {
        setLogoType("icon");
      }, 300);
    }
  }, [isOpen]);

  return (
    <nav className="space-y-2">
      <div className="items-center hidden md:flex justify-center">
        <img
          src="/src/assets/logo.png"
          alt="Full Logo"
          className={`transition-opacity duration-300 relative -right-5 px-2 ${logoType === "full" ? "opacity-100" : "opacity-0"} logo-full`}
        />
        <img
          src="/src/assets/logo-pequena.png"
          alt="Logo Icon"
          className={`transition-opacity duration-300 relative right-6 ${logoType === "icon" ? "opacity-100" : "opacity-0"} logo-icon`}
        />
      </div>

      {items.map((item) =>
        item.isChidren ? (
          <Accordion
            type="single"
            collapsible
            className="space-y-1"
            key={item.title}
            value={openItem}
            onValueChange={setOpenItem}
          >
            <AccordionItem value={item.title} className="border-none">
              <AccordionTrigger
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "group relative flex h-12 justify-between px-4 py-1 text-base duration-200 hover:bg-muted hover:no-underline"
                )}
              >
                <div>
                  <item.icon className={cn("h-5 w-5", item.color)} />
                </div>
                <div
                  className={cn(
                    "absolute left-12 text-base duration-200",
                    !isOpen && className
                  )}
                >
                  {item.title}
                </div>

                {isOpen && (
                  <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                )}
              </AccordionTrigger>
              <AccordionContent className="mt-2 space-y-4 pb-1">
                {item.children?.map((child) => (
                  <NavLink
                    key={child.title}
                    to={child.href}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                    className={({ isActive }) =>
                      cn(
                        buttonVariants({ variant: "ghost" }),
                        "group relative flex h-12 justify-start gap-x-3",
                        isActive && "bg-muted font-bold hover:bg-muted"
                      )
                    }
                  >
                    <child.icon className={cn("h-6 w-6", child.color, isOpen && "m-2")} />
                    <div
                      className={cn(
                        "absolute m-2 left-12 text-base duration-200",
                        !isOpen && className
                      )}
                    >
                      {child.title}
                    </div>
                  </NavLink>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <NavLink
            key={item.title}
            to={item.href}
            onClick={() => {
              if (setOpen) setOpen(false);
            }}
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "ghost" }),
                "group relative flex h-12 justify-start",
                isActive && "bg-muted font-bold hover:bg-muted"
              )
            }
          >
            <item.icon className={cn("h-5 w-5", item.color)} />
            <span
              className={cn(
                "absolute left-12 text-base duration-200",
                !isOpen && className
              )}
            >
              {item.title}
            </span>
          </NavLink>
        )
      )}
    </nav>
  );
}
