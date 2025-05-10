export interface User {
    username: string;
    email: string;
    name?:string;
    surname?:string;
}

export interface AuthState {
    user: null | User
    token: string | null
    loading: boolean
    error: null | {
        email?: string;
        password?: string;
        general?: string;
    };
}

export interface ServerError {
    message?: string;
    errors?: {
        email?: string;
        password?: string;
        general?: string;
    };
}