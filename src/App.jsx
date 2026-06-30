import { useState, useEffect, useRef } from "react";
import Search from "./components/Search";
import TaskList from "./components/TaskList";

// ==================== App ====================

function App() {

    // Загружаем задачи из localStorage

    const [tasks, setTasks] = useState(
        JSON.parse(localStorage.getItem("tasks")) || []
    );

    // Текст новой задачи

    const [text, setText] = useState("");

    // Поиск

    const [search, setSearch] = useState("");

    // Ссылка на input

    const inputRef = useRef(null);

    // Сохраняем задачи после каждого изменения

    useEffect(() => {

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

    }, [tasks]);

    // ==================== Добавление ====================

    const addTask = () => {

        if (text.trim() === "") return;

        const newTask = {
            id: Date.now(),
            text: text,
            done: false
        };

        setTasks([...tasks, newTask]);

        setText("");

        // вернуть курсор в поле

        inputRef.current.focus();
    };

    // ==================== Удаление ====================

    const deleteTask = (taskId) => {

        setTasks(

            tasks.filter((task) => {

                return task.id !== taskId;

            })

        );

    };

    // ==================== Выполнение ====================

    const toggleTask = (taskId) => {

        const newTasks = tasks.map((task) => {

            if (task.id === taskId) {

                return {
                    ...task,
                    done: !task.done
                };

            }

            return task;

        });

        setTasks(newTasks);

    };

    // ==================== Поиск ====================

    const filteredTasks = tasks.filter((task) => {

        return task.text
            .toLowerCase()
            .includes(search.toLowerCase());

    });

    return (
        <div>

            <h1>Todo App</h1>

            {/* поиск */}

            <Search
                search={search}
                setSearch={setSearch}
            />

            <br />
            <br />

            {/* новая задача */}

            <input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Новая задача"
            />

            <button onClick={addTask}>
                Добавить
            </button>

            <hr />

            {/* список задач */}

            {/* Если задач нет */}

            {filteredTasks.length === 0 ? (
                <p>📝 Пока задач нет. Добавьте первую задачу.</p>
            ) : (
                <TaskList
                    tasks={filteredTasks}
                    deleteTask={deleteTask}
                    toggleTask={toggleTask}
                />
            )}

        </div>
    );
}

export default App;