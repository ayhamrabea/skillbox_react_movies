import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import axios from 'axios';
import { Movie , RandomMovieState} from '../../models/Movies'



const initialState: RandomMovieState = {
    randomMovie: null,
    randomMovieLoading: false,
    randomMovieError: null,
}

// دالة لجلب البيانات بأستخدام redux-toolkit
export const FetchRandomMovie = createAsyncThunk<Movie>('movies/fetchRandomMovie' , async () => {
    const response = await axios.get('https://cinemaguide.skillbox.cc/movie/random/')
    if (response.data) {
        return response.data ; 
    }
    throw new Error('error fetching random movie');  
})




const RandomMovieSlice = createSlice({
    name: 'randomMovie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(FetchRandomMovie.pending, (state) => {
                state.randomMovieLoading = true;
                state.randomMovieError = null;
            })
            .addCase(FetchRandomMovie.fulfilled, (state, action) => {
                state.randomMovieLoading = false;
                state.randomMovie = action.payload;
            })
            .addCase(FetchRandomMovie.rejected, (state, action) => {
                state.randomMovieLoading = false;
                state.randomMovieError = action.error.message ?? 'error fetching random movie';
            });
    }
})

export default RandomMovieSlice.reducer;