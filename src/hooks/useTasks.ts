
import { useReducer, useCallback } from "react";
import { tasksReducer, type Task } from "../tasksReducer";

export const useTasks = () => {
    const [tasks, dispatch] = useReducer(
        tasksReducer,
        JSON.parse(
            localStorage.getItem("tasks") || "[]"
        ) as Task[]
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
