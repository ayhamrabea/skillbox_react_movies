import { useState } from "react";
import { LoginForm } from "../loginForm/LoginForm";
import { RegisterForm } from "../registerForm/RegisterForm";

interface AuthFormProps {
    onClose: () => void;
}

export const AuthForm = ({ onClose }: AuthFormProps) => {
    const [authType, setAuthType] = useState<"register" | "auth">("register");

    const toggleAuthType = () => {
        setAuthType(prev => (prev === "register" ? "auth" : "register"));
    };

    return (
        <div className="auth">
        <div className="auth-form">
            <div className="auth-form__logo">
            <img src="/auth.png" alt="logo" width={143} height={32} />
            </div>

            {authType === "register" ? (
            <RegisterForm />
            ) : (
            <LoginForm onSuccess={onClose} />
            )}

            <div className="auth-form__info">
            <button className="auth-form__button" onClick={toggleAuthType}>
                {authType === "register" ? "Уже есть аккаунт?" : "Ещё нет аккаунта?"}
            </button>
            </div>

            <button className="auth-form__close" type="button" onClick={onClose}>
                <svg className="auth-form__close-icon" width="24" height="24" aria-hidden="true">
                    <use xlinkHref="/vite.svg#icon-close" />
                </svg>
            </button>
        </div>
        </div>
    );
};