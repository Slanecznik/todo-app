
import type { Dispatch, SetStateAction } from "react";

type Filter = "all" | "active" | "completed";

type FilterButtonsProps = {
    filter: Filter;
    setFilter: Dispatch<SetStateAction<Filter>>;
};

export const FilterButtons = ({
                                  filter,
                                  setFilter
                              }: FilterButtonsProps) => {
    return (
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
    );
};
