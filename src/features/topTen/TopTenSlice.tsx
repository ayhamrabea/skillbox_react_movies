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
export const fetchTopTenMovies = createAsyncThunk<Movie[]>('movies/fetchTopTenMovies' , async () => {
    const response = await axios.get('https://cinemaguide.skillbox.cc/movie/top10')
    if (response.data) {
        return response.data as Movie[]; 
    }
    throw new Error('error fetching top ten movies');  
})




const MoviesTopTenSlice = createSlice({
    name: 'topTen',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopTenMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTopTenMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchTopTenMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'error fetching movies';
            });
    }
})

export default MoviesTopTenSlice.reducer;