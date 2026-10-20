
import type { Dispatch, SetStateAction } from "react";

type SortType = "new" | "old" | "abc";

type SortButtonsProps = {
    sortType: SortType;
    setSortType: Dispatch<SetStateAction<SortType>>;
};

export const SortButtons = ({
                                sortType,
                                setSortType
                            }: SortButtonsProps) => {
    return (
        <div className="filters">
            <button
                className={sortType === "new" ? "active-filter" : ""}
                onClick={() => setSortType("new")}
            >
                🆕 Новые
            </button>

            <button
                className={sortType === "old" ? "active-filter" : ""}
                onClick={() => setSortType("old")}
            >
                📅 Старые
            </button>

            <button
                className={sortType === "abc" ? "active-filter" : ""}
                onClick={() => setSortType("abc")}
            >
                🔤 А-Я
            </button>
        </div>
    );
};
