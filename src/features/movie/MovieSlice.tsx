import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Movie , MovieState} from '../../models/Movies'



const initialState: MovieState = {
    movie: null,
    movieLoading: false,
    movieError: null,
}

// دالة لجلب البيانات بأستخدام redux-toolkit
export const fetchMovie = createAsyncThunk<Movie , number>('movies/fetchMovie' , async (id , {rejectWithValue}) => {
    try{
        const response = await axios.get(`https://cinemaguide.skillbox.cc/movie/${id}`)
        return response.data;
    }catch(err){
        const error = err as AxiosError<{ message: string }>;
        return rejectWithValue(error.response?.data || 'Error fetching movie' )
    }
})




const MovieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovie.pending, (state) => {
                state.movieLoading = true;
                state.movieError = null;
            })
            .addCase(fetchMovie.fulfilled, (state, action) => {
                state.movieLoading = false;
                state.movie = action.payload;
            })
            .addCase(fetchMovie.rejected, (state, action) => {
                state.movieLoading = false;
                state.movieError = action.error.message ?? 'error fetching random movie';
            });
    }
})

export default MovieSlice.reducer;