import { configureStore } from "@reduxjs/toolkit";
import MovieSlice  from '../features/movie/MovieSlice'
import RandomMovieSlice from "../features/randomMovie/RandomMovieSlice";
import MoviesSlice from "../features/movies/MoviesSlice";
import MoviesTopTenSlice from '../features/topTen/TopTenSlice'
import Geners from '../features/genres/GenresSlice'
import searchSlice from "../features/search/searchSlice";
import authSlice from "../features/auth/authSlice";
import GenreMoviesSlice from "../features/genres/GenreMoviesSlice";
import favoriteSlice from "../features/favorite/FavoriteSlice";

export const store = configureStore({
    reducer:{
        movies: MoviesSlice,
        randomMovie:RandomMovieSlice ,
        movie:MovieSlice,
        topTen: MoviesTopTenSlice,
        genres:Geners,
        search:searchSlice,
        auth:authSlice,
        moviesByGener:GenreMoviesSlice,
        favorites:favoriteSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


