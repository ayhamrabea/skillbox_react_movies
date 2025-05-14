import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Movie } from '../../models/Movies';

interface FavoriteState {
    favorites: Movie[];
    loading: boolean;
    error: string | null;
}


const initialState : FavoriteState = {
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    loading: false,
    error: null as string | null,
};

export const addFavorite = createAsyncThunk(
    'movies/addFavorite',
    async ({ id }: { id: string }, thunkAPI) => {
        try {
            
            const response = await axios.post('https://cinemaguide.skillbox.cc/favorites', { id: String(id) });
            return response.data.favorites; 
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            return thunkAPI.rejectWithValue(error.response?.data || 'Error adding favorite');
        }
    }
);

export const deleteFavorite = createAsyncThunk(
    'movies/deleteFavorite',
    async ({ id }: { id: string }, thunkAPI) => {
        try {
            
            const response = await axios.delete(`https://cinemaguide.skillbox.cc/favorites/${id}`, );
            return response.data.favorites;  
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            return thunkAPI.rejectWithValue(error.response?.data || 'Error adding favorite');
        }
    }
);

export const getFavorites = createAsyncThunk(
    'movies/getFavorites',
    async ( _ ,thunkAPI) => {
        try {
            const response = await axios.get<Movie[]>('https://cinemaguide.skillbox.cc/favorites');
            return response.data;  
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            return thunkAPI.rejectWithValue(error.response?.data || 'Error adding favorite');
        }
    }
);

// Slice الخاص بـ Redux
const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(addFavorite.pending, (state) => {
            state.loading = true;
            state.error = null; 
        })
        .addCase(addFavorite.fulfilled, (state, action) => {
            state.loading = false;
            state.favorites = action.payload;
            localStorage.setItem('favorites', JSON.stringify(state.favorites));  
        })
        .addCase(addFavorite.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error adding favorite';  
        })

        .addCase(deleteFavorite.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteFavorite.fulfilled, (state, action) => {
            state.loading = false;
            state.favorites = action.payload;
            localStorage.setItem('favorites', JSON.stringify(state.favorites));  
        })
        .addCase(deleteFavorite.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error delete favorite';  
        })

        .addCase(getFavorites.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getFavorites.fulfilled, (state, action) => {
            state.loading = false;
            state.favorites = action.payload;
            localStorage.setItem('favorites', JSON.stringify(state.favorites));  
        })
        .addCase(getFavorites.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error delete favorite';  
        });
}
});

export default favoriteSlice.reducer;
