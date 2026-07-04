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

    // Какой фильтр сейчас выбран
// all — показать все задачи
// active — только невыполненные
// completed — только выполненные

    const [filter, setFilter] = useState("all");

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

    const searchedTasks = tasks.filter((task) => {

        return task.text
            .toLowerCase()
            .includes(search.toLowerCase());

    });

    let filteredTasks = searchedTasks;

    if (filter === "active") {

        filteredTasks = searchedTasks.filter((task) => !task.done);

    }

    if (filter === "completed") {

        filteredTasks = searchedTasks.filter((task) => task.done);

    }

    return (
        <div className="app">

            <h1>📝 My Todo App</h1>

            {/* поиск */}

            <Search
                search={search}
                setSearch={setSearch}
            />

            <hr className="section-line" />

            {/* Кнопка "Все" */}

            <button
                className={filter === "all" ? "active-filter" : ""}
                onClick={() => setFilter("all")}
            >
                Все
            </button>

            {/* Кнопка "Активные" */}

            <button
                className={filter === "active" ? "active-filter" : ""}
                onClick={() => setFilter("active")}
            >
                Активные
            </button>

            {/* Кнопка "Выполненные" */}

            <button
                className={filter === "completed" ? "active-filter" : ""}
                onClick={() => setFilter("completed")}
            >
                Выполненные
            </button>

            <hr className="section-line" />

            {/* новая задача */}

            <div className="add-task">

                <input
                    ref={inputRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Новая задача"
                />

                <button onClick={addTask}>
                    Добавить
                </button>

            </div>

            <hr className="section-line" />

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