// ==================== Статистика ====================

// Общее количество задач
export function getTotalTasks(tasks) {
    return tasks.length;
}

// Количество активных задач
export function getActiveTasks(tasks) {
    return tasks.filter((task) => !task.done).length;
}

// Количество выполненных задач
export function getCompletedTasks(tasks) {
    return tasks.filter((task) => task.done).length;
}