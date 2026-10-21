import type { Dispatch, SetStateAction } from "react";

type SearchProps = {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
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