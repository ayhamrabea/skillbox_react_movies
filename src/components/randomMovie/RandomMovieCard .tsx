import { FC } from "react"
import { MovieCardProps } from "../../models/Movies"
import MovieCardCommon from "../movieCardCommonProps/MovieCardCommonProps"





export const RandomMovieCard: FC<MovieCardProps> = ({ movie, onResetMovie }) => {
    
    return (
        <>
            <MovieCardCommon
                movie={movie}
                onResetMovie={onResetMovie}
                showDetails={true}
            />
        </>
    );
};