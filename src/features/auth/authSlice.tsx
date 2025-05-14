import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { AuthState, ServerError } from '../../models/auth';

// ✅ إعداد Axios لإرسال الكوكي دائمًا
axios.defaults.withCredentials = true;

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

// --- Login ---
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
        try {
            const response = await axios.post('https://cinemaguide.skillbox.cc/auth/login', { email, password });
            return response.data;
        } catch (err) {
            const error = err as AxiosError<ServerError>;
            return thunkAPI.rejectWithValue({
                general: error.response?.data?.message || 'Неверная почта или пароль',
            });
        }
    }
);

// --- Fetch User Profile ---
export const fetchUserProfile = createAsyncThunk(
    'auth/fetchUserProfile',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('https://cinemaguide.skillbox.cc/profile', {
                withCredentials: true,
            });
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            // إذا كان الخطأ 401 نعيد null بدل رفض البيانات
            if (error.response?.status === 401) {
                return thunkAPI.rejectWithValue(null);
            }
            return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'Failed to load user data' });
        }
    }
);

// --- Register ---
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (formData: { name: string; email: string; password: string, surname: string, password2: string }, thunkAPI) => {
        try {
            const response = await axios.post('https://cinemaguide.skillbox.cc/user', formData);
            return response.data.user;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            return thunkAPI.rejectWithValue({ message: error.response?.data.message || 'register failed' });
        }
    }
);


export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, thunkAPI) => {
        try {
            await axios.get('https://cinemaguide.skillbox.cc/auth/logout'); 
            return true;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            console.error('Logout failed', error);
            return thunkAPI.rejectWithValue({
                general: error.response?.data.message || 'Logout failed',
            });
        }
    }
);

// --- Slice ---
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.error = null;
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder
            //login
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
            //register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as {
                    email?: string;
                    password?: string;
                    general?: string;
                };
                state.error = payload || { general: 'Unknown error' };
            })
            //profile
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                if (action.payload === null) {
                    state.user = null;
                    state.error = null;
                } else {
                    state.error = action.payload || { general: 'Unknown error' };
                }
            })
            //logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                const payload = action.payload as { general?: string };
                state.error = payload || { general: 'Logout failed' };
            })
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
