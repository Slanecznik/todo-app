
import { createContext } from "react";
import type { Task } from "../tasksReducer";

type TasksContextValue = {
    tasks: Task[];
    addTask: (text: string) => void;
    deleteTask: (taskId: number) => void;
    toggleTask: (taskId: number) => void;
    editTask: (taskId: number, newText: string) => void;
    clearCompleted: () => void;
};

export const TasksContext =
    createContext<TasksContextValue | null>(null);
