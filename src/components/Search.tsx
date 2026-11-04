type SearchProps = {
    search: string;
    setSearch: (value: string) => void;
};

export const Search = ({
                           search,
                           setSearch
                       }: SearchProps) => {
    return (
        <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск задачи"
        />
    );
};