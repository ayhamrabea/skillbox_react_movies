import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchGenresMovies } from "../../features/genres/GenresSlice";
import { Loader } from "../../compnents/loader/Loader";
import { Link } from "react-router-dom";


const GenrePage: FC = () => {
	
	const dispatch = useAppDispatch();
	const { list ,loading , error } = useAppSelector((state) => state.genres);
	
		useEffect(() => {
			dispatch(fetchGenresMovies());
		}, [dispatch])
		
	return (
		<>
		<section className="movies">
            <div className="container">
			<ul className="movies__list">
				{loading && <Loader />}
				{error && <p>{error}</p>}
				{!loading && !error && list.length > 0 && list.map((item) => (
					<li key={item} className="movies__item">
						<Link to={`/movie?genre=${item}`}>
							<div className="movies__item-ganre">
								{item}
							</div>
						</Link>
					</li>
				))}
			</ul>
            </div>
        </section>
		</>
	);
};

export default GenrePage;