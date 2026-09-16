import { memo, useContext } from "react";
import { TasksContext } from "../context/TasksContext";
import {
    getTotalTasks,
    getActiveTasks,
    getCompletedTasks
} from "../utils/taskUtils";

export const Statistics = memo(function Statistics() {
    const { tasks } = useContext(TasksContext);

    const totalTasks = getTotalTasks(tasks);
    const activeTasks = getActiveTasks(tasks);
    const completedTasks = getCompletedTasks(tasks);

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
});