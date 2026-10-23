import type { ReactNode } from "react";

type CardProps = {
    children: ReactNode;
};

export const Card = ({ children }: CardProps) => {
    return (
        <div className="card">
            {children}
        </div>
    );
};