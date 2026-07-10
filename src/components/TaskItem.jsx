import { useState } from "react";

function TaskItem(props) {
    const [editedText, setEditedText] = useState(props.task.text);
    const [isEditing, setIsEditing] = useState(false);
    return (
        <div className="task">

            <input
                type="checkbox"
                checked={props.task.done}
                onChange={() => props.toggleTask(props.task.id)}
            />

            {
                isEditing ? (
                    <input
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                    />
                ) : (
                    <span className={props.task.done ? "done" : ""}>
            {props.task.text}
        </span>
                )
            }

            <button
                onClick={() => setIsEditing(true)}
            >
                ✏️
            </button>

            <button
                onClick={() => props.deleteTask(props.task.id)}
            >
                ❌
            </button>

        </div>
    );
}

export default TaskItem;