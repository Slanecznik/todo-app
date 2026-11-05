import { Outlet, Link } from "react-router";

export const Layout = () => {
    return (
        <div className="layout">
            <header className="layout-header">
                <h1>📝 My Todo App</h1>
            </header>

            <nav>
                <Link to="/">Главная</Link>
                {" | "}
                <Link to="/statistics">Статистика</Link>
            </nav>

            <main className="layout-main">
                <Outlet />
            </main>
        </div>
    );
};