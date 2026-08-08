import {useState, useEffect, useRef, useMemo, useCallback} from "react";
import Search from "./components/Search";
import TaskList from "./components/TaskList";
import FilterButtons from "./components/FilterButtons";
import {Statistics} from "./components/Statistics";
import AddTask from "./components/AddTask";
import SortButtons from "./components/SortButtons";
import {
    getTotalTasks,
    getActiveTasks,
    getCompletedTasks
} from "./utils/taskUtils";
import {Card} from "./components/Card";

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

    const addTask = useCallback(() => {

        if (text.trim() === "") return;

        const newTask = {

            id: Date.now(),

            text: text,

            done: false

        };

        setTasks((currentTasks) => {

            return [

                ...currentTasks,

                newTask

            ];

        });

        setText("");

        inputRef.current.focus();

    }, [text]);

    // ==================== Удаление ====================

    const deleteTask = useCallback((taskId) => {

        const isConfirmed = window.confirm(
            "Вы действительно хотите удалить эту задачу?"
        );

        if (!isConfirmed) {

            return;

        }

        setTasks((currentTasks) => {

            return currentTasks.filter((task) => {

                return task.id !== taskId;

            });

        });

    }, []);

    const clearCompleted = () => {
        const activeTasks = tasks.filter((task) => !task.done);

        setTasks(activeTasks);
    };

    // ==================== Выполнение ====================

    const toggleTask = useCallback((taskId) => {

        setTasks((currentTasks) => {

            return currentTasks.map((task) => {

                if (task.id === taskId) {

                    return {

                        ...task,

                        done: !task.done

                    };

                }

                return task;

            });

        });

    }, []);

    // ==================== Редактирование ====================

    const editTask = useCallback((taskId, newText) => {

        setTasks((currentTasks) => {

            return currentTasks.map((task) => {

                if (task.id === taskId) {

                    return {

                        ...task,

                        text: newText

                    };

                }

                return task;

            });

        });

    }, []);

    // ==================== Поиск ====================

    const searchedTasks = useMemo(() => {

        return tasks.filter((task) => {

            return task.text
                .toLowerCase()
                .includes(search.toLowerCase());

        });

    }, [tasks, search]);

    const filteredTasks = useMemo(() => {

        if (filter === "active") {

            return searchedTasks.filter((task) => !task.done);

        }

        if (filter === "completed") {

            return searchedTasks.filter((task) => task.done);

        }

        return searchedTasks;

    }, [searchedTasks, filter]);

    const sortedTasks = useMemo(() => {

        const result = [...filteredTasks];

        if (sortType === "new") {
            result.sort((a, b) => b.id - a.id);
        }

        if (sortType === "old") {
            result.sort((a, b) => a.id - b.id);
        }

        if (sortType === "abc") {
            result.sort((a, b) =>
                a.text.localeCompare(b.text)
            );
        }

        return result;

    }, [filteredTasks, sortType]);

    // ==================== Статистика ====================

    const totalTasks = getTotalTasks(tasks);

    const activeTasks = getActiveTasks(tasks);

    const completedTasks = getCompletedTasks(tasks);

    return (
        <div className="app">

            <h1>📝 My Todo App</h1>

            {/* поиск */}

            <Card>
                <Search
                    search={search}
                    setSearch={setSearch}
                />
            </Card>

            <hr className="section-line"/>

            {/* Контейнер для кнопок фильтра */}

            <FilterButtons
                filter={filter}
                setFilter={setFilter}
            />

            <hr className="section-line"/>

            <SortButtons
                sortType={sortType}
                setSortType={setSortType}
            />

            <hr className="section-line"/>


            {/* новая задача */}

            <AddTask
                text={text}
                setText={setText}
                addTask={addTask}
                inputRef={inputRef}
            />

            <hr className="section-line"/>

            <Card>
                <Statistics
                    totalTasks={totalTasks}
                    activeTasks={activeTasks}
                    completedTasks={completedTasks}
                />
            </Card>

            <button onClick={clearCompleted}>
                🗑 Очистить выполненные
            </button>

            {/* список задач */}

            {/* Если задач нет */}

            {filteredTasks.length === 0 ? (
                <p>📝 Пока задач нет. Добавьте первую задачу.</p>
            ) : (
                <TaskList
                    tasks={sortedTasks}
                    deleteTask={deleteTask}
                    toggleTask={toggleTask}
                    editTask={editTask}
                />
            )}

        </div>
    );
}

export default App;