import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MoviesState } from '../../models/Movies';


const initialState:MoviesState = {
    list: [] ,
    loading: false,
    error: null as string | null,
};

export const fetchMoviesByGenre  = createAsyncThunk('genreMovies/fetchMoviesByGenre', async (genre: string) => {
    const response = await axios.get(`https://cinemaguide.skillbox.cc/movie?genre=${genre}`);
    if (response.data) {
        return response.data;
    }
    throw new Error('Error fetching movie genres');
});

const GenreMoviesSlice  = createSlice({
    name: 'genreMovies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoviesByGenre.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchMoviesByGenre.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Error fetching movies by genre';
            });
    }
});

export default GenreMoviesSlice.reducer;
