function FilterButtons(props) {

    return (

        <div className="filters">

            <button
                className={props.filter === "all" ? "active-filter" : ""}
                onClick={() => props.setFilter("all")}
            >
                Все
            </button>

            <button
                className={props.filter === "active" ? "active-filter" : ""}
                onClick={() => props.setFilter("active")}
            >
                Активные
            </button>

            <button
                className={props.filter === "completed" ? "active-filter" : ""}
                onClick={() => props.setFilter("completed")}
            >
                Выполненные
            </button>

        </div>

    );

}

export default FilterButtons;