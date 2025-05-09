import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login } from "../../features/auth/aythSlice";
import { FormField } from "../formField/FormField";
import { Button } from "../button/Button";


interface LoginFormProps {
    onSuccess?: () => void;
}

export const LoginForm =  ({ onSuccess }: LoginFormProps) => {

    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
            const result = await dispatch(login({ email, password }));
        if (login.fulfilled.match(result)) {
            onSuccess?.();
        }
    };


    return (
        <form className="login-form" onSubmit={handleSubmit}>
        <FormField errorMessage={error?.general}>
            <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Электронная почта"
            />
        </FormField>

        <FormField errorMessage={error?.general}>
            <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Пароль"
            autoComplete="current-password"
            />
        </FormField>

        <Button type="submit" className="btn" disabled={loading}>
            {loading ? "Загрузка..." : "Войти"}
        </Button>
        </form>
    );
};