// ==================== Statistics ====================

function Statistics({ totalTasks, activeTasks, completedTasks }) {

    return (

        <div className="stats">

            <div className="stat-card">
                <h3>📋 Всего</h3>
                <span>{totalTasks}</span>
            </div>

            <div className="stat-card">
                <h3>🟢 Активных</h3>
                <span>{activeTasks}</span>
            </div>

            <div className="stat-card">
                <h3>✅ Выполнено</h3>
                <span>{completedTasks}</span>
            </div>

        </div>

    );

}

export default Statistics;