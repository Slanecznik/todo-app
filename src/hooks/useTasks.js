import { useReducer, useCallback } from "react";
import { tasksReducer } from "../tasksReducer";

export const useTasks = () => {
    const [tasks, dispatch] = useReducer(
        tasksReducer,
        JSON.parse(localStorage.getItem("tasks")) || []
    );

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

    return {
        tasks,
        dispatch,
        deleteTask,
        toggleTask,
        editTask
    };
};