import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    list: [] as string[],
    loading: false,
    error: null as string | null,
};

export const fetchGenresMovies = createAsyncThunk('genres/fetchGenres', async () => {
    const response = await axios.get('https://cinemaguide.skillbox.cc/movie/genres');
    if (response.data) {
        return response.data;
    }
    throw new Error('Error fetching movie genres');
});

const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenresMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGenresMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchGenresMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Error fetching movie genres';
            });
    }
});

export default genresSlice.reducer;
