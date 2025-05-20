import { Loader } from "../loader/Loader";
import { ErrorFunction } from "../error/Error";
import { MoviesState } from '../../models/Movies'
import { FC } from "react";
import { Link } from "react-router-dom";


export const MoviesList:FC<MoviesState> = ({list , loading , error , title}) => {

  if (loading) {
    return <Loader />;
  }

  
  return (
    <section className="movies">
      <div className="container">
        <h1 className="movies__title">{title}</h1>
        <ul className="movies__list">
            {error ? (
              <ErrorFunction error={error} />
            ) : list && list.length > 0 ? (
              list.map((movie , index) => (
                <li className="movies__item" key={movie.id}>
                  {title === 'Топ 10 фильмов' && <div className="movies__item-count">{index + 1}</div>}
                  <Link to={`/movie/${movie.id}`} className="movies__item-link">
                    <img
                      className="movies__item-poster"
                      src={movie.posterUrl || '/empty.png'}
                      alt={movie.title}
                    />
                  </Link>
                </li>
              ))
            ) : (
              <p className="movies__empty-message">Нет фильмов для отображения.</p>
            )}
        </ul>
      </div>
    </section>
  );
};