import { ReactNode } from "react";
interface LayoutProps {
    children: ReactNode;
}

export function LayoutVisitant({ children }: LayoutProps) {
    return (
        <div className="max-h-screen max-w-screen h-screen w-screen flex justify-center">
            {children}
        </div>
    );
}