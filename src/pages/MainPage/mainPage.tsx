import { MoviesList } from "../../compnents/moviesList/MoviesList";
import { FC, useEffect } from "react";
import { useAppDispatch , useAppSelector } from "../../app/hooks";
import { fetchTopTenMovies } from "../../features/topTen/TopTenSlice";
import { FetchRandomMovie } from "../../features/randomMovie/RandomMovieSlice";
import { Loader } from "../../compnents/loader/Loader";
import { MovieCard } from "../../compnents/moviecard/MovieCard";
import { ErrorFunction } from "../../compnents/error/Error";


const Mainpage: FC = () => {

	const dispatch = useAppDispatch();
    const { list ,loading , error } = useAppSelector((state) => state.topTen);
	const { randomMovie , randomMovieLoading , randomMovieError } = useAppSelector((state) => state.randomMovie);

    useEffect(() => {
        dispatch(fetchTopTenMovies()); // get top 10 movies
		dispatch(FetchRandomMovie()); // get a random movies
    }, [dispatch])

	// search filter
	const handleResetMovie = () => dispatch(FetchRandomMovie());

	return (
		<>  
			<section className="random-movie">
				<div className="container">
				<div className="movies__random">
					{randomMovieLoading && <Loader />}
					
					{!randomMovieLoading && randomMovieError && ( // show error  
						<ErrorFunction error={`Random movie error: ${randomMovieError}`} />
					)}

					{randomMovie && !randomMovieLoading && ( 
						<MovieCard movie={randomMovie} is_random={true} onResetMovie={handleResetMovie}/>
					)}
				</div>
				</div>
        	</section>
			<section className="movies">
				<MoviesList list={list} loading={loading} error={error} />
			</section>
		</>
	);
};

export default Mainpage;

