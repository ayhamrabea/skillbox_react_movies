import { Loader } from "../loader/Loader";
import { ErrorFunction } from "../error/Error";
import { MoviesState } from '../../models/Movies'
import { FC } from "react";
import { Link } from "react-router-dom";


export const MoviesList:FC<MoviesState> = ({list , loading , error , title}) => {

  if (loading) {
    return <Loader />;
  }
  let count = 1
  
  return (
    <section className="movies">
      <div className="container">
        <h1 className="movies__title">{title}</h1>
        <ul className="movies__list">
            {error ? (
              <ErrorFunction error={error} />
            ) : list && list.length > 0 ? (
              list.map((movie) => (
                <li className="movies__item" key={movie.id}>
                  {title === 'Топ 10 фильмов' && <div className="movies__item-count">{count++}</div>}
                  <Link to={`/movie/${movie.id}`} className="movies__item-link">
                    <img
                      className="movies__item-poster"
                      src={movie.posterUrl}
                      alt={movie.title}
                    />
                  </Link>
                </li>
              ))
            ) : (
              <p>لا توجد أفلام حالياً.</p>
            )}
        </ul>
      </div>
    </section>
  );
};