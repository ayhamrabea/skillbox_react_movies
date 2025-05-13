import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/Redux";
import { fetchGenresMovies } from "../../features/genres/GenresSlice";
import { Loader } from "../../compnents/loader/Loader";
import { Link } from "react-router-dom";
import posters  from '../../api/images.json'

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
			<h1 className="movies__title">Жанры фильмов</h1>
			<ul className="movies__list">
				{loading && <Loader />}
				{error && <p>{error}</p>}
				{!loading &&
					!error &&
					list.length > 0 &&
					list.map((item , index) => (
						<li key={item} className="movies__item">
							<Link to={`/movie?genre=${item}`}>
								<div className="movies__item-poster">
									<img  className="movies__item-poster-img" src={posters[index] ? posters[index]  : '/empty.png' } alt={item} />
								</div>
								<div className="movies__item-title">
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