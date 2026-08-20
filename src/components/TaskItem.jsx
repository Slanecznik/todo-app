import {memo, useState } from "react";

export const TaskItem = memo(function TaskItem(props) {
    const [editedText, setEditedText] = useState(props.task.text);
    const [isEditing, setIsEditing] = useState(false);

        const saveTask = (e) => {

            e.preventDefault();

            props.editTask(
                props.task.id,
                editedText
            );

            setIsEditing(false);
        };

    return (
        <div className="task">

            <input
                type="checkbox"
                checked={props.task.done}
                onChange={() => props.toggleTask(props.task.id)}
            />

            {
                isEditing ? (
                    <form onSubmit={saveTask}>

                        <input
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            onKeyDown={(e) => {

                                if (e.key === "Escape") {
                                    setEditedText(props.task.text);
                                    setIsEditing(false);
                                }

                            }}
                        />

                        <button type="submit">
                            💾
                        </button>

                    </form>
                ) : (
                    <span className={props.task.done ? "done" : ""}>
            {props.task.text}
        </span>
                )
            }

            {
                isEditing ? (
                    <button onClick={saveTask}>
                        💾
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                    >
                        ✏️
                    </button>
                )
            }

            <button
                onClick={() => props.deleteTask(props.task.id)}
            >
                ❌
            </button>

        </div>
    );
}

)