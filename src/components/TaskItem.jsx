function TaskItem(props) {
    return (
        <div>

            <input
                type="checkbox"
                checked={props.task.done}
                onChange={() => props.toggleTask(props.task.id)}
            />

            <span>
                {props.task.text}
            </span>

            <button
                onClick={() => props.deleteTask(props.task.id)}
            >
                ❌
            </button>

        </div>
    );
}

export default TaskItem;