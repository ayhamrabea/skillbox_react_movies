import { FC, useState } from "react"
import { Movie } from "../../models/Movies"
import { timeComversion } from "../../utils/tuleComverstion"
import { Button } from "../button/Button"
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/Redux";
import { addFavorite, deleteFavorite, getFavorites } from "../../features/favorite/FavoriteSlice";
import { Trailer } from "../trailer/Trailer";
import { AuthForm } from "../authForm/AuthForm";
import { Rating } from "../rating/rating";
import Icon from "../icon/Icon";

interface MovieCardCommonProps {
    movie: Movie;
    onResetMovie?: () => void;
    showDetails: boolean;
}

const MovieCardCommon: FC<MovieCardCommonProps> = ({ movie, onResetMovie, showDetails  }) => {
    const dispatch = useAppDispatch();
    const [isTrailer, setIsTrailer] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const {user} = useAppSelector((state) => state.auth)
    const favoriteMovies = useAppSelector((state) => state.favorites.favorites);

    const isFavorite = Array.isArray(favoriteMovies) && favoriteMovies.some((fav) => fav.id === movie.id);

    const handleTrailerClick = () => {
        setIsTrailer(true);
    };

    const handleAddToFavorites = async () => {
        if (user) {
            if (isFavorite) {
                await dispatch(deleteFavorite({ id: movie.id.toString() }));
            } else {
                await dispatch(addFavorite({ id: movie.id.toString() }));
            }

            dispatch(getFavorites()); // يعيد تحميل المفضلة بعد التحديث
        } else {
            setShowLoginForm(true);
        }
    };

    // const rating = movie.tmdbRating?.toFixed(1);

    
    
    return (
        <>
            {isTrailer && <Trailer url={movie.trailerUrl} onClose={() => setIsTrailer(false)} />}
            {showLoginForm && <AuthForm onClose={() => setShowLoginForm(false)} />}

            <div className="movie-card">
                <div className="movie-card__details">
                    <div className="movie-card__info">
                        <div className="movie-card__meta">
                            <Rating tmdbRating={movie.tmdbRating}/>
                            <span className="movie-card__year">{movie.releaseYear}</span>
                            <span className="movie-card__genre">{movie.genres?.[0]}</span>
                            <span className="movie-card__runtime">{timeComversion(movie.runtime)}</span>
                        </div>
                            <h1 className="movie-card__title">{movie.title}</h1>
                            <p className="movie-card__description">{movie.plot}</p>
                    </div>
                    <div className="movie-card__actions">
                        <Button className="btn btn--trailer" onClick={handleTrailerClick}>Трейлер</Button>

                        {showDetails && <Link className="btn btn--Onyx" to={`movie/${movie.id}`}>О фильме</Link>}

                        <Button className='btn btn--Onyx btn--icon' aria-label="добавить в избранне" onClick={handleAddToFavorites}>
                            <Icon className="movie-card__actions-icon" name={`${isFavorite ? 'favoriteTrue' : 'favorite'}`}/>
                        </Button>

                        {onResetMovie && (
                            <Button className="btn btn--Onyx btn--icon" onClick={onResetMovie} aria-label="менять филм">
                                <Icon className="movie-card__actions-icon" name='reset'/>
                            </Button>
                        )}
                    </div>
                </div>
                <div className="movie-card__poster">
                    <div className="movie-card__poster-img">
                        <img src={movie.posterUrl ? movie.posterUrl : '/empty.png'} alt={movie.title} />
                    </div>
                </div>
            </div>
        </>
    )
};

export default MovieCardCommon;
