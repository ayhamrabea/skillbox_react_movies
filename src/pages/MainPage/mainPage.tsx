import { MoviesList } from "../../components/moviesList/MoviesList";
import { FC, useEffect } from "react";
import { useAppDispatch , useAppSelector } from "../../hooks/Redux";
import { fetchTopTenMovies } from "../../features/topTen/TopTenSlice";
import { FetchRandomMovie } from "../../features/randomMovie/RandomMovieSlice";
import { Loader } from "../../components/loader/Loader";
import { ErrorFunction } from "../../components/error/Error";
import { RandomMovieCard } from "../../components/randomMovie/RandomMovieCard ";


const Mainpage: FC = () => {

	const dispatch = useAppDispatch();
    const { list ,loading , error } = useAppSelector((state) => state.topTen);
	const { randomMovie , randomMovieLoading , randomMovieError } = useAppSelector((state) => state.randomMovie);


	useEffect(() => {
		if (list.length === 0 && !loading) {
			dispatch(fetchTopTenMovies()); 
		}
		if (!randomMovie && !randomMovieLoading) {
			dispatch(FetchRandomMovie()); 
		}
	}, [dispatch, list.length, loading, randomMovie, randomMovieLoading]);

	// reset movie
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
							<RandomMovieCard movie={randomMovie} onResetMovie={handleResetMovie}/>
						)}
					</div>
				</div>
        	</section>
			<section className="movies">
				<MoviesList list={list} loading={loading} error={error} title='Топ 10 фильмов'/>
			</section>
		</>
	);
};

export default Mainpage;

