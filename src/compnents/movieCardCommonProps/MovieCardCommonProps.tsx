import { FC } from "react"
import { Movie } from "../../models/Movies"
import { timeComversion } from "../../utils/tuleComverstion"
import { Button } from "../button/Button"
import { Link } from "react-router-dom";


interface MovieCardCommonProps {
    movie: Movie;
    onTrailerClick: () => void;
    onResetMovie?: () => void;
    showDetails: boolean;
}

const MovieCardCommon: FC<MovieCardCommonProps> = ({ movie, onTrailerClick, onResetMovie, showDetails }) => (
    <div className="movie-card">
        <div className="movie-card__details">
            <div className="movie-card__info">
                <div className="movie-card__meta">
                    <span className="movie-card__rating">⭐ {movie.tmdbRating?.toFixed(1) || 'N/A'}</span>
                    <span className="movie-card__year">{movie.releaseYear}</span>
                    <span className="movie-card__genre">{movie.genres?.[0]}</span>
                    <span className="movie-card__runtime">{timeComversion(movie.runtime)}</span>
                </div>
                    <h1 className="movie-card__title">{movie.title}</h1>
                    <p className="movie-card__description">{movie.plot}</p>
            </div>
            <div className="movie-card__actions">
                <Button className="btn btn--trailer" onClick={onTrailerClick}>Трейлер</Button>

                {showDetails && <Link className="btn btn--Onyx" to={`movie/${movie.id}`}>О фильме</Link>}

                <Button className="btn btn--Onyx btn--icon" aria-label="добавить в избранне">
                    <svg className="movie-card__actions-icon" width="24" height="24" aria-hidden="true">
                        <use xlinkHref="/vite.svg#icon-favorite" />
                    </svg>
                </Button>

                {onResetMovie && (
                    <Button className="btn btn--Onyx btn--icon" onClick={onResetMovie} aria-label="менять филм">
                        <svg className="movie-card__actions-icon" width="24" height="24" aria-hidden="true">
                        <use xlinkHref="/vite.svg#icon-reset" />
                        </svg>
                    </Button>
                )}
            </div>
        </div>
        <div className="movie-card__poster">
            <div className="movie-card__poster-img">
                <img src={movie.posterUrl} alt={movie.title} />
            </div>
        </div>
    </div>
);

export default MovieCardCommon;
