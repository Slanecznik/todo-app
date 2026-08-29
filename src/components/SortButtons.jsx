export const SortButtons = ({ sortType, setSortType }) => {

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
