import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface User {
    username: string;
    email: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (formData: { username: string; email: string; password: string , lastname:string , password2:string }, thunkAPI) => {
        try {
            const response = await axios.post('https://cinemaguide.skillbox.cc/user', formData);
            return response.data.user;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            return thunkAPI.rejectWithValue(error.response?.data.message || 'حدث خطأ أثناء التسجيل');
        }
    }
);

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user')
        },
        loadUserFromStorage: (state) => {
            const storedUser = localStorage.getItem('user');
            if(storedUser) state.user = JSON.parse(storedUser)
        }
    },
    extraReducers: (builder) => {
        builder
    
    }

})

export const { logout , loadUserFromStorage } = registerSlice.actions;
export default registerSlice.reducer;