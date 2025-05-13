export interface User {
    username: string;
    email: string;
    name?:string;
    surname?:string;
    favorites?: string[];
    profileLoaded: boolean;
}

export interface AuthState {
    user: null | User
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

export interface AuthFormProps {
    onClose?: () => void;
}