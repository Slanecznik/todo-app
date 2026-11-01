import { useContext } from "react";
import { useParams } from "react-router";
import { TasksContext } from "../context/TasksContext";

export function TaskDetailsPage() {
    const { id } = useParams();

    const context = useContext(TasksContext);

    if (!context) {
        throw new Error("TaskDetailsPage must be used within TasksContext.Provider");
    }

    const taskId = Number(id);

    const task = context.tasks.find(
        (task) => task.id === taskId
    );

    if (!task) {
        return <p>Задача не найдена.</p>;
    }

    return (
        <section>
            <h1>Информация о задаче</h1>
            <p>ID: {task.id}</p>
            <p>Название: {task.text}</p>
            <p>Статус: {task.done ? "Выполнена" : "Активная"}</p>
        </section>
    );
}