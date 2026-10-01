import { useReducer, useCallback } from "react";
import { tasksReducer } from "../tasksReducer";

export const useTasks = () => {
    const [tasks, dispatch] = useReducer(
        tasksReducer,
        JSON.parse(localStorage.getItem("tasks")) || []
    );

    const addTask = useCallback((text) => {
        dispatch({
            type: "ADD_TASK",
            payload: text
        });
    }, []);

    const deleteTask = useCallback((taskId) => {
        dispatch({
            type: "DELETE_TASK",
            payload: taskId
        });
    }, []);

    const toggleTask = useCallback((taskId) => {
        dispatch({
            type: "TOGGLE_TASK",
            payload: taskId
        });
    }, []);

    const editTask = useCallback((taskId, newText) => {
        dispatch({
            type: "EDIT_TASK",
            payload: {
                id: taskId,
                text: newText
            }
        });
    }, []);

    const clearCompleted = useCallback(() => {
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