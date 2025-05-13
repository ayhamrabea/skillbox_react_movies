import { FC } from "react"
import { MovieCardProps } from "../../models/Movies"
import { renderDetailItem } from "../renderDetailItem/RenderDetailItem"
import MovieCardCommon from "../movieCardCommonProps/MovieCardCommonProps";




export const MovieCard: FC<MovieCardProps> = ({ movie }) => {




    return (
        <>
                <MovieCardCommon
                    movie={movie}
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
