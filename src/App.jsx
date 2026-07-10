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

    // ==================== Редактирование ====================

    const editTask = (taskId, newText) => {

        const newTasks = tasks.map((task) => {

            if (task.id === taskId) {

                return {

                    ...task,

                    text: newText

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

    // ==================== Статистика ====================

// Общее количество задач

    const totalTasks = tasks.length;

    // Количество активных задач

    const activeTasks = tasks.filter((task) => {

        // Оставляем только задачи,
        // которые ещё не выполнены

        return !task.done;

    }).length;

    // Количество выполненных задач

    const completedTasks = tasks.filter((task) => {

        // Оставляем только выполненные задачи

        return task.done;

    }).length;

    return (
        <div className="app">

            <h1>📝 My Todo App</h1>

            {/* поиск */}

            <Search
                search={search}
                setSearch={setSearch}
            />

            <hr className="section-line" />

            {/* Контейнер для кнопок фильтра */}

            <div className="filters">

                <button
                    className={filter === "all" ? "active-filter" : ""}
                    onClick={() => setFilter("all")}
                >
                    Все
                </button>

                <button
                    className={filter === "active" ? "active-filter" : ""}
                    onClick={() => setFilter("active")}
                >
                    Активные
                </button>

                <button
                    className={filter === "completed" ? "active-filter" : ""}
                    onClick={() => setFilter("completed")}
                >
                    Выполненные
                </button>

            </div>

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


            {/* Статистика */}

            <div className="stats">

                <div className="stat-card">
                    <h3>📋 Всего</h3>
                    <span>{totalTasks}</span>
                </div>

                <div className="stat-card">
                    <h3>🟢 Активных</h3>
                    <span>{activeTasks}</span>
                </div>

                <div className="stat-card">
                    <h3>✅ Выполнено</h3>
                    <span>{completedTasks}</span>
                </div>

            </div>

            {/* список задач */}

            {/* Если задач нет */}

            {filteredTasks.length === 0 ? (
                <p>📝 Пока задач нет. Добавьте первую задачу.</p>
            ) : (
                <TaskList
                    tasks={filteredTasks}
                    deleteTask={deleteTask}
                    toggleTask={toggleTask}
                    editTask={editTask}
                />
            )}

        </div>
    );
}

export default App;