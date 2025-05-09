import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import axios from 'axios';
import { Movie , MoviesState} from '../../models/Movies'



// الحالة الأبتدائية
const initialState: MoviesState = {
    list: [],
    loading: false,
    error: null,
};

// دالة لجلب البيانات بأستخدام redux-toolkit
export const fetchMovies = createAsyncThunk<Movie[]>('movies/fetchMovies' , async () => {
    const response = await axios.get('https://cinemaguide.skillbox.cc/movie/')
    if (response.data) {
        return response.data as Movie[]; 
    }
    throw new Error('error fetching movies');  
})




const MoviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'error fetching movies';
            });
    }
})

export default MoviesSlice.reducer;