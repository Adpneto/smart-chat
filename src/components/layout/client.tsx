import { ReactNode } from "react";
import Header from "@/components/layout/header/header";
import Sidebar from "@/components/layout/sidebar/sidebar";
import { Toaster } from "../ui/toaster";

interface LayoutProps {
    children: ReactNode;
}

export function LayoutClient({ children }: LayoutProps) {
    return (
        <div className="flex">
            <Header />
            <Sidebar />
            <main className="pt-10 md:pl-20 h-screen w-screen flex justify-center">
                {children}
                <Toaster/>
            </main>
        </div>
    );
}