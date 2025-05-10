import { FC, useState } from "react"
import { MovieCardProps } from "../../models/Movies"
import { Trailer } from "../trailer/Trailer"
import { renderDetailItem } from "../renderDetailItem/RenderDetailItem"
import MovieCardCommon from "../movieCardCommonProps/MovieCardCommonProps";




export const MovieCard: FC<MovieCardProps> = ({ movie }) => {
    const [isTrailer, setIsTrailer] = useState(false);

    const handleTrailerClick = () => {
        setIsTrailer(true);
    };

    return (
        <>
            {isTrailer && <Trailer url={movie.trailerUrl} onClose={() => setIsTrailer(false)} />}
                <MovieCardCommon
                    movie={movie}
                    onTrailerClick={handleTrailerClick}
                    showDetails={false}
                />
            <div className="movie-detailes">
                <h2 className="movie-detailes__title">О фильме</h2>
                <ul className="movie-detailes__list">
                {renderDetailItem("Язык оригинала", movie.language)}
                {renderDetailItem("Бюджет", movie.budget ? `${movie.budget} руб` : undefined)}
                {renderDetailItem("Выручка", movie.revenue ? `${movie.revenue} руб` : undefined)}
                {renderDetailItem("Режиссёр", movie.director)}
                {renderDetailItem("Продакшен", movie.countriesOfOrigin?.[0])}
                {renderDetailItem("Награды", movie.awardsSummary)}
                </ul>
            </div>
        </>
    );
};
