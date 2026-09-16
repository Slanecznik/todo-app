import {
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback,
    useReducer
} from "react";
import {Search} from "./components/Search";
import {TaskList} from "./components/TaskList";
import {FilterButtons} from "./components/FilterButtons";
import {Statistics} from "./components/Statistics";
import {AddTask} from "./components/AddTask";
import {SortButtons} from "./components/SortButtons";
import {Card} from "./components/Card";
import {Layout} from "./components/Layout";
import {tasksReducer} from "./tasksReducer";
import {TasksContext} from "./context/TasksContext";
// ==================== App ====================

export const App = () => {

    const [tasks, dispatch] = useReducer(
        tasksReducer,
        JSON.parse(localStorage.getItem("tasks")) || []
    );

    const contextValue = {
        tasks,
        dispatch
    };

    const [text, setText] = useState("");

    const [search, setSearch] = useState("");

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

    // ==================== Удаление ====================

    const deleteTask = useCallback((taskId) => {

        const isConfirmed = window.confirm(
            "Вы действительно хотите удалить эту задачу?"
        );

        if (!isConfirmed) {
            return;
        }

        dispatch({
            type: "DELETE_TASK",
            payload: taskId
        });

    }, []);

    const clearCompleted = () => {
        dispatch({
            type: "CLEAR_COMPLETED"
        });
    };

    // ==================== Выполнение ====================

    const toggleTask = useCallback((taskId) => {
        dispatch({
            type: "TOGGLE_TASK",
            payload: taskId
        });
    }, []);

    // ==================== Редактирование ====================

    const editTask = useCallback((taskId, newText) => {
        dispatch({
            type: "EDIT_TASK",
            payload: {
                id: taskId,
                text: newText
            }
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


    return (
        <TasksContext.Provider value={contextValue}>
            <Layout>

                <div className="app">

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
                        inputRef={inputRef}
                    />

                    <hr className="section-line"/>

                    <Card>
                        <Statistics />
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

            </Layout>
        </TasksContext.Provider>
    );
}