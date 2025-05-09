import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSearchTerm } from "../../features/search/searchSlice";



export const Search: FC = () => {
    const dispatch = useAppDispatch();
    const search = useAppSelector((state) => state.search.term);

    return (
        <input 
            type="text"
            placeholder="Search for movie.."
            value={search}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="search"
        />
    );
}