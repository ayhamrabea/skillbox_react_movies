import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/Redux";
import { setSearchTerm } from "../../features/search/searchSlice";


interface SearchProps {
    setSearchInput: (value: boolean) => void;
}

export const Search: FC<SearchProps> = ({ setSearchInput}) => {
    const dispatch = useAppDispatch();
    const search = useAppSelector((state) => state.search.term);

    const closeInput = () => {
        dispatch(setSearchTerm(""));
        setSearchInput(false);
    };

    return (
            <div className='customInput'>
                <button className="customInput__close" type="button" onClick={() => closeInput()}>
                    <svg className="customInput__close-icon" width="24" height="24" aria-hidden="true">
                        <use xlinkHref="/vite.svg#icon-close" />
                    </svg>
                </button>
                <input
                    type="text"
                    placeholder="Поиск.."
                    value={search}
                    onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                    className="customInput__input"
                />
                <span className="customInput__icon" >
                    <svg className="customInput__close-icon" width="24" height="24" aria-hidden="true">
                        <use xlinkHref="/vite.svg#icon-search" />
                    </svg>
                </span>
            </div>
        
    );
}