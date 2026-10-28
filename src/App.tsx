import {
    useState,
    useEffect,
    useRef,
    useMemo,
} from "react";

import {Search} from "./components/Search";
import {TaskList} from "./components/TaskList.tsx";
import {FilterButtons} from "./components/FilterButtons";
import {Statistics} from "./components/Statistics";
import {AddTask} from "./components/AddTask.tsx";
import {SortButtons} from "./components/SortButtons";
import {Card} from "./components/Card";
import {Layout} from "./components/Layout";
import {TasksContext} from "./context/TasksContext.tsx";
import {useTasks} from "./hooks/useTasks.ts";
import {Routes, Route} from "react-router";
// import {HomePage} from "./pages/HomePage.tsx";
import {StatisticsPage} from "./pages/StatisticsPage.tsx";

type FilterType = "all" | "active" | "completed";

type SortType = "new" | "old" | "abc";

export const App = () => {
    const {
        tasks,
        addTask,
        deleteTask,
        toggleTask,
        editTask,
        clearCompleted,
    } = useTasks();

    const contextValue = {
        tasks,
        addTask,
        deleteTask,
        toggleTask,
        editTask,
        clearCompleted,
    };

    const [text, setText] = useState<string>("");
    const [search, setSearch] = useState<string>("");

    const [filter, setFilter] = useState<FilterType>("all");
    const [sortType, setSortType] = useState<SortType>("new");

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );
    }, [tasks]);

    const searchedTasks = useMemo(() => {
        return tasks.filter((task) =>
            task.text
                .toLowerCase()
                .includes(search.toLowerCase())
        );
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
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="app">
                                <Card>
                                    <Search
                                        search={search}
                                        setSearch={setSearch}
                                    />
                                </Card>

                                <hr className="section-line"/>

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

                                <AddTask
                                    text={text}
                                    setText={setText}
                                    inputRef={inputRef}
                                />

                                <hr className="section-line"/>

                                <Card>
                                    <Statistics/>
                                </Card>

                                <button onClick={clearCompleted}>
                                    🗑 Очистить выполненные
                                </button>

                                {filteredTasks.length === 0 ? (
                                    <p>
                                        📝 Пока задач нет. Добавьте первую задачу.
                                    </p>
                                ) : (
                                    <TaskList
                                        tasks={sortedTasks}
                                    />
                                )}
                            </div>
                        }
                    />
                    <Route
                        path="/statistics"
                        element={<StatisticsPage/>}
                    />
                </Routes>
            </Layout>
        </TasksContext.Provider>
    );
};