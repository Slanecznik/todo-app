export function Layout({ children }) {

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
}