import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { AuthState, ServerError  } from '../../models/auth';


const initialState: AuthState = {
    user:  null,
    token: null,
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
        try {
            const response = await axios.post('https://cinemaguide.skillbox.cc/auth/login', { email, password });
            return response.data; // { email, token }
        } catch (err) {
            const error = err as AxiosError<ServerError>;
            const serverData = error.response?.data;

            return thunkAPI.rejectWithValue({
            general: serverData?.message || 'Неверная почта или пароль',
            });
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (formData: { username: string; email: string; password: string , surname:string , password2:string }, thunkAPI) => {
        try {
            const response = await axios.post('https://cinemaguide.skillbox.cc/user', formData);
            return response.data.user;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            return thunkAPI.rejectWithValue({message: error.response?.data.message || 'register failed'});
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
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
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            const payload = action.payload as {
                email?: string;
                password?: string;
                general?: string;
            };

            state.error = payload || { general: 'Unknown error' };
        })

        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            localStorage.setItem('user', JSON.stringify(action.payload));
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            const payload = action.payload as {
                email?: string;
                password?: string;
                general?: string;
            };

            state.error = payload || { general: 'Unknown error' };
        });
    }
})

export const { logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;