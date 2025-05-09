import { FC, useState } from "react"
import { Movie } from "../../models/Movies"
import { timeComversion } from "../../utils/tuleComverstion"
import { Button } from "../button/Button"
import { Link } from "react-router-dom"
import { Trailer } from "../trailer/Trailer"


interface MovieCardprops {
    movie: Movie,
    is_random:boolean
    onResetMovie?: () => void;
}



export const MovieCard:FC<MovieCardprops> = ({movie , is_random , onResetMovie}) => {
    
    const [isTrailer, setIsTrailer] = useState(false);

    const handleAuthButtonClick = () => {
        setIsTrailer(true);
    };
    

    return(
        <>
        {isTrailer && <Trailer url={movie.trailerUrl} onClose={() => setIsTrailer(false)} />}

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
                    {is_random ? (
                        <>
                            <Button className="btn btn--trailer" onClick={handleAuthButtonClick}> Трейлер </Button>
                            <Link className="btn btn--Onyx" to={`movie/${movie.id}`}>О фильме</Link>
                            <Button className="btn btn--Onyx btn--icon">
                                <svg className="movie-card__actions-icon" width="24" height="24" aria-hidden="true">
                                    <use xlinkHref="/vite.svg#icon-favorite" />
                                </svg>
                            </Button>
                            <Button className="btn btn--Onyx btn--icon" onClick={onResetMovie}>
                                <svg className="movie-card__actions-icon" width="24" height="24" aria-hidden="true">
                                    <use xlinkHref="/vite.svg#icon-reset" />
                                </svg>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button className="btn btn--trailer" onClick={handleAuthButtonClick}> Трейлер </Button>
                            <Button className="btn btn--Onyx btn--icon">
                                <svg className="movie-card__actions-icon" width="24" height="24" aria-hidden="true">
                                    <use xlinkHref="/vite.svg#icon-favorite" />
                                </svg>
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <div className="movie-card__poster">
                <div className="movie-card__poster-img">
                    <img src={movie.posterUrl} alt={movie.title} />
                </div>
            </div>
        </div>
        {!is_random && 
        <div className="movie-detailes">
            <h2 className="movie-detailes__title">О фильме</h2>
            <ul className="movie-detailes__list">
                <li className="movie-detailes__item">
                    <span className="movie-detailes__key">
                        <span className="movie-detailes__key-text">Язык оригинала</span>
                        <span className="movie-detailes__key-line"></span>
                    </span>
                    <span className="movie-detailes__value">{movie.language ? movie.language : 'неизвестно'}</span>
                </li>
                <li className="movie-detailes__item">
                    <span className="movie-detailes__key">
                        <span className="movie-detailes__key-text">Бюджет</span>
                        <span className="movie-detailes__key-line"></span>
                    </span>
                    <span className="movie-detailes__value">{movie.budget ? `${movie.budget} руб` : 'неизвестно'}</span>
                </li>
                <li className="movie-detailes__item">
                    <span className="movie-detailes__key">
                        <span className="movie-detailes__key-text">Выручка</span>
                        <span className="movie-detailes__key-line"></span>
                    </span>
                    <span className="movie-detailes__value">{movie.revenue ? `${movie.revenue} руб` : 'неизвестно'}</span>
                </li>
                <li className="movie-detailes__item">
                    <span className="movie-detailes__key">
                        <span className="movie-detailes__key-text">Режиссёр</span>
                        <span className="movie-detailes__key-line"></span>
                    </span>
                    <span className="movie-detailes__value">{movie.director ? movie.director : 'неизвестно'}</span>
                </li>
                <li className="movie-detailes__item">
                    <span className="movie-detailes__key">
                        <span className="movie-detailes__key-text">Продакшен</span>
                        <span className="movie-detailes__key-line"></span>
                    </span>
                    <span className="movie-detailes__value">{movie.countriesOfOrigin[0] ? movie.countriesOfOrigin[0] : 'неизвестно'}</span>
                </li>
                <li className="movie-detailes__item">
                    <span className="movie-detailes__key">
                        <span className="movie-detailes__key-text">Награды</span>
                        <span className="movie-detailes__key-line"></span>
                    </span>
                    <span className="movie-detailes__value">{movie.awardsSummary ? movie.awardsSummary : 'неизвестно'}</span>
                </li>
            </ul>
        </div>
        }

        </>
    )
}