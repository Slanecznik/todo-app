function Search({
                    search,
                    setSearch
                }) {
    return (
        <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск задачи"
        />
    );
}

export default Search;