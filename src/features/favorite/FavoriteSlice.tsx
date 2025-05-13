import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Movie } from '../../models/Movies';

interface FavoriteState {
    favorites: Movie[];
    loading: boolean;
    error: string | null;
}

// الحالة الأولية
const initialState : FavoriteState = {
    favorites: [] , // مصفوفة لحفظ ids للأفلام المفضلة (تأكد من أنها ستكون string)
    loading: false,
    error: null as string | null,
};

// إضافة الفيلم إلى المفضلة
export const addFavorite = createAsyncThunk(
    'movies/addFavorite',
    async ({ id }: { id: string }, thunkAPI) => {
        try {
            // إرسال id الفيلم إلى API لإضافته إلى المفضلة
            const response = await axios.post('https://cinemaguide.skillbox.cc/favorites', { id: String(id) });
            return response.data.favorites;  // نعيد المصفوفة المحدثة للأفلام المفضلة
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
            // إرسال id الفيلم إلى API لإضافته إلى المفضلة
            const response = await axios.delete(`https://cinemaguide.skillbox.cc/favorites/${id}`, );
            return response.data.favorites;  // نعيد المصفوفة المحدثة للأفلام المفضلة
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
    name: 'movie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(addFavorite.pending, (state) => {
            state.loading = true;
            state.error = null;  // عند بدء العملية نعيد الـ error إلى null
        })
        .addCase(addFavorite.fulfilled, (state, action) => {
            state.loading = false;
            state.favorites = action.payload;  // تحديث المصفوفة المفضلة
        })
        .addCase(addFavorite.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error adding favorite';  // تعيين خطأ في حالة الفشل
        })

        .addCase(deleteFavorite.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteFavorite.fulfilled, (state, action) => {
            state.loading = false;
            state.favorites = action.payload;  
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
        })
        .addCase(getFavorites.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Error delete favorite';  
        });
}
});

export default favoriteSlice.reducer;
