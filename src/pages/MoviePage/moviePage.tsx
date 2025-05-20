import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/Redux";
import { fetchMovie } from "../../features/movie/MovieSlice";
import { ErrorFunction } from "../../components/error/Error";
import { MovieCard } from "../../components/moviecard/MovieCard";
import { Loader } from "../../components/loader/Loader";
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
                    {movie ? <MovieCard  movie={movie}/> : <ErrorFunction error={movieError} /> }
            </div>
        </section>
    )
}

export default MoviePage;