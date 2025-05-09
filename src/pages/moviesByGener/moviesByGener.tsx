import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MoviesList } from "../../compnents/moviesList/MoviesList";
import { fetchMoviesByGenre } from "../../features/genres/GenreMoviesSlice";
import { useSearchParams } from "react-router-dom";


const MoviesByGener: FC = () => {
	const [visibleCount, setVisibleCount] = useState(10); //  to control how many movies we'll show 

	const [searchParams] = useSearchParams();
    const genre = searchParams.get("genre");

	const dispatch = useAppDispatch();
	const { list ,loading , error } = useAppSelector((state) => state.moviesByGener);

	// deal with scrol and count movies
	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
			) {
				setVisibleCount((prev) => prev + 10); // delay to simulate loading
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		if (genre) {
			setVisibleCount(10);
			dispatch(fetchMoviesByGenre(genre));
		}
	}, [dispatch , genre])
		
	return (
		<>
            <section className="movies">
                    <MoviesList list={list.slice(0, visibleCount)} loading={loading} error={error} />
			</section>
		</>
	);
};

export default MoviesByGener;