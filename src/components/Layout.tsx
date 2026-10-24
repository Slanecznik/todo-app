import type { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="layout">
            <header className="layout-header">
                <h1>📝 My Todo App</h1>
            </header>

            <main className="layout-main">
                {children}
            </main>
        </div>
    );
};