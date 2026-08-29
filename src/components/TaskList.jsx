import {TaskItem} from "./TaskItem";

export const TaskList = ({
                             tasks,
                             deleteTask,
                             toggleTask,
                             editTask
                         }) => {
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