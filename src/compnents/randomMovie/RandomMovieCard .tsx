import { FC, useState } from "react"
import { MovieCardProps } from "../../models/Movies"
import { Trailer } from "../trailer/Trailer"
import MovieCardCommon from "../movieCardCommonProps/MovieCardCommonProps"






export const RandomMovieCard: FC<MovieCardProps> = ({ movie, onResetMovie }) => {
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
                onResetMovie={onResetMovie}
                showDetails={true}
            />
        </>
    );
};