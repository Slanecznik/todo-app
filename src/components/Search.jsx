function Search(props) {
    return (
        <input
            value={props.search}
            onChange={(e) => props.setSearch(e.target.value)}
            placeholder="Поиск задачи"
        />
    );
}

export default Search;