import { useState } from "react";

function TaskItem(props) {
    const [isEditing, setIsEditing] = useState(false);
    return (
        <div className="task">

            <input
                type="checkbox"
                checked={props.task.done}
                onChange={() => props.toggleTask(props.task.id)}
            />

            <span className={props.task.done ? "done" : ""}>
    {props.task.text}
</span>

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