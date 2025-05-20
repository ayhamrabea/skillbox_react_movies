import { useAppDispatch, useAppSelector } from "../../hooks/Redux";
import { fetchUserProfile, login } from "../../features/auth/authSlice";
import { FormField } from "../formField/FormField";
import { Button } from "../button/Button";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchemaType } from "../../validation/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";


export interface LoginFormProps {
    onSuccess?: () => void;
}

export const LoginForm =  ({ onSuccess }: LoginFormProps) => {
    const dispatch = useAppDispatch();
    const { loading , error} = useAppSelector((state) => state.auth);

    const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginSchemaType) => {
        const result = await dispatch(login(data as { email: string; password: string }));
        if (login.fulfilled.match(result)) {
            dispatch(fetchUserProfile());
            onSuccess?.();
        }
    }


    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <FormField 
                errorMessage={errors.email?.message}
                iconNmae="email"
                >
                <input
                type="email"
                placeholder="Электронная почта"
                autoComplete="email"
                {...register("email")}
                />
            </FormField>

            <FormField
                errorMessage={errors.password?.message}
                iconNmae="password"
                >
                <input
                type="password"
                placeholder="Пароль"
                autoComplete="current-password"
                {...register("password")}
                />
            </FormField>
                {error?.general && <span className="form-field__error-text">Ошибка входа! Проверьте введенные данные.</span>}

            <Button
                type="submit"
                className="btn"
                disabled={loading}
                >
                {loading ? "Загрузка..." : "Войти"}
            </Button>
        </form>
    );
};