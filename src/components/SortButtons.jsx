// ==================== SortButtons ====================

function SortButtons({ sortType, setSortType }) {

    return (

        <div className="filters">

            <button
                className={sortType === "new" ? "active" : ""}
                onClick={() => setSortType("new")}
            >
                🆕 Новые
            </button>

            <button
                className={sortType === "old" ? "active" : ""}
                onClick={() => setSortType("old")}
            >
                📅 Старые
            </button>

            <button
                className={sortType === "abc" ? "active" : ""}
                onClick={() => setSortType("abc")}
            >
                🔤 А-Я
            </button>

        </div>

    );

}

export default SortButtons;