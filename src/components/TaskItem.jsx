import {memo, useState } from "react";

export const TaskItem = memo(function TaskItem({
                                                   task,
                                                   toggleTask,
                                                   editTask,
                                                   deleteTask
                                               }) {
    const [editedText, setEditedText] = useState(task.text);
    const [isEditing, setIsEditing] = useState(false);

        const saveTask = (e) => {

            e.preventDefault();

            editTask(
                task.id,
                editedText
            );

            setIsEditing(false);
        };

    return (
        <div className="task">

            <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
            />

            {
                isEditing ? (
                    <form onSubmit={saveTask}>

                        <input
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            onKeyDown={(e) => {

                                if (e.key === "Escape") {
                                    setEditedText(task.text);
                                    setIsEditing(false);
                                }

                            }}
                        />

                        <button type="submit">
                            💾
                        </button>

                    </form>
                ) : (
                    <span className={task.done ? "done" : ""}>
            {task.text}
        </span>
                )
            }

            {
                !isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                    >
                        ✏️
                    </button>
                )
            }

            <button
                onClick={() => deleteTask(task.id)}
            >
                ❌
            </button>

        </div>
    );
}

)