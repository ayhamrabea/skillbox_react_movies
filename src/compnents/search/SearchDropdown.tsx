import { useEffect } from 'react';
import {  useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchMovies } from '../../features/movies/MoviesSlice';
import { timeComversion } from '../../utils/tuleComverstion';
import { Link } from 'react-router-dom';


export const SearchDropdown = () => {
    const dispatch = useAppDispatch();
    const search = useAppSelector((state) => state.search.term);
    const { list  } = useAppSelector((state) => state.movies);

	useEffect(() => {
        if (list.length === 0) {
            dispatch(fetchMovies());
        }
    }, [dispatch, list]);
    
	const filteredMovies = list.filter((movie) =>
		movie.title.toLowerCase().includes(search.toLowerCase())
	);

    if(!search.trim()) return null

    return (
        <div className="navbar__search-mode">
            <ul className="navbar__search-list">
                {filteredMovies && filteredMovies.length > 0 ? 
                    (filteredMovies.map((movie) =>(
                        <li className="navbar__search-item" key={movie.id}>
                            <Link className="navbar__search-link" to={`movie/${movie.id}`}>
                                <img className="navbar__search-poster"
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    loading='lazy'/>
                                    <div className="navbar__search-info">
                                        <div className="navbar__search-meta">
                                            <span className="navbar__search-rating">⭐ {movie.tmdbRating?.toFixed(1) || 'N/A'}</span>
                                            <span className="navbar__search-year">{movie.releaseYear}</span>
                                            <span className="navbar__search-genre">{movie.genres?.[0]}</span>
                                            <span className="navbar__search-runtime ">{timeComversion(movie.runtime)}</span>
                                        </div>
                                        <h3 className="navbar__search-title ">{movie.title}</h3>
                                    </div>
                            </Link>
                        </li>
                    ))) : <li className="navbar__search-item"> there are no movies</li> }
            </ul>
        </div>
    )
}