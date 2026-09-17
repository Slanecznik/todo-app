import { TaskItem } from "./TaskItem";

export const TaskList = ({ tasks }) => {
    return (
        <div>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                />
            ))}
        </div>
    );
};