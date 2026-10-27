
import { useReducer, useCallback } from "react";
import { tasksReducer, type Task } from "../tasksReducer";


function isTask(value: unknown): value is Task {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const task = value as Record<string, unknown>;

    return (
        typeof task.id === "number" &&
        Number.isFinite(task.id) &&
        typeof task.text === "string" &&
        typeof task.done === "boolean"
    );
}

function loadTasks(): Task[] {
    try {
        const savedTasks = localStorage.getItem("tasks");

        if (!savedTasks) {
            return [];
        }

        const parsed: unknown = JSON.parse(savedTasks);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed.filter(isTask);
    } catch {
        return [];
    }
}


export const useTasks = () => {

    const [tasks, dispatch] = useReducer(
        tasksReducer,
        loadTasks()
    );


    const addTask = useCallback((text: string): void => {
        dispatch({
            type: "ADD_TASK",
            payload: text
        });
    }, []);

    const deleteTask = useCallback((taskId: number): void => {
        dispatch({
            type: "DELETE_TASK",
            payload: taskId
        });
    }, []);

    const toggleTask = useCallback((taskId: number): void => {
        dispatch({
            type: "TOGGLE_TASK",
            payload: taskId
        });
    }, []);

    const editTask = useCallback((
        taskId: number,
        newText: string
    ): void => {
        dispatch({
            type: "EDIT_TASK",
            payload: {
                id: taskId,
                text: newText
            }
        });
    }, []);

    const clearCompleted = useCallback((): void => {
        dispatch({
            type: "CLEAR_COMPLETED"
        });
    }, []);

    return {
        tasks,
        addTask,
        deleteTask,
        toggleTask,
        editTask,
        clearCompleted
    };
};
