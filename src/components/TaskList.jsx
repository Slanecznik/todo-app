import { useContext } from "react";
import { TaskItem } from "./TaskItem";
import { TasksContext } from "../context/TasksContext";

export const TaskList = ({
                             deleteTask,
                             toggleTask,
                             editTask
                         }) => {
    const { tasks } = useContext(TasksContext);

    return (
        <div>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    toggleTask={toggleTask}
                    editTask={editTask}
                />
            ))}
        </div>
    );
};