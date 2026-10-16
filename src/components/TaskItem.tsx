
import { memo, useContext, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { TasksContext } from "../context/TasksContext";
import type { Task } from "../tasksReducer";

type TaskItemProps = {
    task: Task;
};

export const TaskItem = memo(function TaskItem({
                                                   task
                                               }: TaskItemProps) {
    const context = useContext(TasksContext);

    if (!context) {
        throw new Error("TaskItem must be used within TasksContext.Provider");
    }

    const { deleteTask, toggleTask, editTask } = context;

    const [editedText, setEditedText] = useState(task.text);
    const [isEditing, setIsEditing] = useState(false);

    const saveTask = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedText = editedText.trim();

        if (trimmedText === "") {
            return;
        }

        editTask(task.id, trimmedText);
        setIsEditing(false);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
            setEditedText(task.text);
            setIsEditing(false);
        }
    };

    return (
        <div className="task">
            <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
            />

            {isEditing ? (
                <form onSubmit={saveTask}>
                    <input
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />

                    <button type="submit">💾</button>
                </form>
            ) : (
                <span className={task.done ? "done" : ""}>
                    {task.text}
                </span>
            )}

            {!isEditing && (
                <button onClick={() => setIsEditing(true)}>
                    ✏️
                </button>
            )}

            <button onClick={() => deleteTask(task.id)}>
                ❌
            </button>
        </div>
    );
});
