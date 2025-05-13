import { FC, useEffect, useMemo } from 'react';
import {  useAppDispatch, useAppSelector } from "../../hooks/Redux";
import { fetchMovies } from '../../features/movies/MoviesSlice';
import { timeComversion } from '../../utils/tuleComverstion';
import { Link } from 'react-router-dom';
import { Rating } from '../rating/rating';
import { setSearchTerm } from '../../features/search/searchSlice';


interface SearchDropdownProps {
    setSearchVisible: (value: boolean) => void;
}


export const SearchDropdown: FC<SearchDropdownProps> = ({ setSearchVisible }) => {
    const dispatch = useAppDispatch();
    const search = useAppSelector((state) => state.search.term);
    const { list  } = useAppSelector((state) => state.movies);
    
	useEffect(() => {
        if (list.length === 0) {
            dispatch(fetchMovies());
        }
    }, [dispatch, list ]);
    


    const filteredMovies = useMemo(() => 
        list.filter((movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase())
    ), [list, search]);

    if(!search.trim()) return null

    return (
        <div className="search-mode">
            <ul className="search-list">
                {filteredMovies && filteredMovies.length > 0 ? 
                    (filteredMovies.slice(0 , 10 ).map((movie) =>(
                        <li className="search-item" key={movie.id}>
                            <Link 
                            className="search-link"
                            to={`movie/${movie.id}`}
                            onClick={() => {
                                setSearchVisible(false);
                                dispatch(setSearchTerm(""));
                            }}>
                                <img className="search-poster"
                                    src={movie.posterUrl ? movie.posterUrl : '/empty.png'}
                                    alt={movie.title}
                                    loading='lazy'/>
                                <div className="search-info">
                                    <div className="search-meta">
                                        <Rating tmdbRating={movie.tmdbRating}/>
                                        <span className="search-year">{movie.releaseYear}</span>
                                        <span className="search-genre">{movie.genres?.[0]}</span>
                                        <span className="search-runtime ">{timeComversion(movie.runtime)}</span>
                                    </div>
                                    <h3 className="search-title ">{movie.title}</h3>
                                </div>
                            </Link>
                        </li>
                    ))) : <li className="search-item"> Никаких фильмов не найдено</li> }
            </ul>
        </div>
    )
}