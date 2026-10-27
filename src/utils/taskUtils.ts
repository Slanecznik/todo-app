
import type { Task } from "../tasksReducer";

export function getTotalTasks(tasks: Task[]): number {
    return tasks.length;
}

export function getActiveTasks(tasks: Task[]): number {
    return tasks.filter((task) => !task.done).length;
}

export function getCompletedTasks(tasks: Task[]): number {
    return tasks.filter((task) => task.done).length;
}
