import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchMovie } from "../../features/movie/MovieSlice";
import { ErrorFunction } from "../../compnents/error/Error";
import { MovieCard } from "../../compnents/moviecard/MovieCard";
import { Loader } from "../../compnents/loader/Loader";
import { useParams } from "react-router-dom";

const MoviePage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { movie , movieLoading , movieError } = useAppSelector((state) => state.movie);

    useEffect(() => {
        if(id){
            dispatch(fetchMovie(Number(id)));
        }
    }, [dispatch , id])

    return(
        <section className="movie">
            <div className="container">
                    {movieLoading && <Loader /> }
                    {movie ? <MovieCard  movie={movie} is_random={false}/> : <ErrorFunction error={movieError} /> }
            </div>
        </section>
    )
}

export default MoviePage;