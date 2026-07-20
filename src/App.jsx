import { useState, useEffect, useRef } from "react";
import Search from "./components/Search";
import TaskList from "./components/TaskList";
import FilterButtons from "./components/FilterButtons";
import Statistics from "./components/Statistics";
import AddTask from "./components/AddTask";

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

    const [sortType, setSortType] = useState("new");

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

        // Спрашиваем пользователя

        const isConfirmed = window.confirm(

            "Вы действительно хотите удалить эту задачу?"

        );

        // Если пользователь нажал "Отмена"

        if (!isConfirmed) {

            return;

        }

        // Удаляем задачу

        setTasks(

            tasks.filter((task) => task.id !== taskId)

        );

    };

    const clearCompleted = () => {
        const activeTasks = tasks.filter((task) => !task.done);

        setTasks(activeTasks);
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

    filteredTasks = [...filteredTasks];

    if (sortType === "new") {
        filteredTasks.sort((a, b) => b.id - a.id);
    }

    if (sortType === "old") {
        filteredTasks.sort((a, b) => a.id - b.id);
    }

    if (sortType === "abc") {
        filteredTasks.sort((a, b) =>
            a.text.localeCompare(b.text)
        );
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

            <FilterButtons
                filter={filter}
                setFilter={setFilter}
            />

            <hr className="section-line" />

            <div className="filters">
                <button onClick={() => setSortType("new")}>
                    🆕 Новые
                </button>

                <button onClick={() => setSortType("old")}>
                    📅 Старые
                </button>

                <button onClick={() => setSortType("abc")}>
                    🔤 А-Я
                </button>
            </div>

            <hr className="section-line" />


            {/* новая задача */}

            <AddTask
                text={text}
                setText={setText}
                addTask={addTask}
                inputRef={inputRef}
            />

            <hr className="section-line" />

            <Statistics
                totalTasks={totalTasks}
                activeTasks={activeTasks}
                completedTasks={completedTasks}
            />

            <button onClick={clearCompleted}>
                🗑 Очистить выполненные
            </button>

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