;import { useAppDispatch, useAppSelector } from "../../hooks/Redux";
import { registerUser } from "../../features/auth/authSlice";
import { FormField } from "../formField/FormField";
import { Button } from "../button/Button";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchemaType } from "../../validation/registerSchema";
import { useForm } from "react-hook-form";


export type RegisterFormProps = {
  onCompleted: () => void;
};

export const RegisterForm = ({ onCompleted }: RegisterFormProps) => {
  const dispatch = useAppDispatch();
  const { loading , error  } = useAppSelector((state) => state.auth);
  const [isRegistered, setIsRegistered] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });



  const onSubmit = async (data: RegisterSchemaType) => {
    const result = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(result)) {
      setIsRegistered(true);
    }
  }

    useEffect(() => {
    if (isRegistered) {
      onCompleted();
    }
  }, [isRegistered, onCompleted]);





  

  return (
    <form className="register-form"onSubmit={handleSubmit(onSubmit)}>
      {error && <p className="auth-form__error"> {error.general}</p>}
      <FormField errorMessage={errors.email?.message} iconNmae="email">
        <input
          type="email"
          {...register("email")}
          placeholder="Электронная почта"
        />
      </FormField>


      <FormField errorMessage={errors.name?.message} iconNmae="auth">
        <input
          type="text"
          {...register("name")}
          placeholder="Имя"
        />
      </FormField>

      <FormField errorMessage={errors.surname?.message} iconNmae="auth">
        <input
          type="text"
          {...register("surname")}
          placeholder="Фамилия"
        />
      </FormField>

      <FormField errorMessage={errors.password?.message} iconNmae="password">
        <input
          type="password"
          {...register("password")}
          placeholder="Пароль"
        />
      </FormField>

      <FormField errorMessage={errors.password2?.message} iconNmae="password">
        <input
          type="password"
          {...register("password2")}
          placeholder="Подтвердите пароль"
        />
      </FormField>

      <Button
            type="submit"
            className="btn"
            disabled={loading}
            >
            {loading ? "Загрузка..." : "Зарегистрироваться"}
        </Button>
    </form>
  );
};