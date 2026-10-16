
import { TaskItem } from "./TaskItem.tsx";
import type { Task } from "../tasksReducer";

type TaskListProps = {
    tasks: Task[];
};

export const TaskList = ({ tasks }: TaskListProps) => {
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
