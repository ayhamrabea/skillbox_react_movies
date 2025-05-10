;import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { registerUser } from "../../features/auth/aythSlice";
import { FormField } from "../formField/FormField";
import { Button } from "../button/Button";
import { useState } from "react";
import { LoginForm } from "../loginForm/LoginForm";



export const RegisterForm = () => {
  const dispatch = useAppDispatch();

  const { loading , error } = useAppSelector((state) => state.auth);
  const [localError, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    surname: '',
    password: '',
    password2: '',
  });

  const [isRegistered, setIsRegistered] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      setError(" пароль не совпадает ");
      return;
    }
    const result = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(result)) {
      setIsRegistered(true);
    }
  };

  if (isRegistered) {
    return <LoginForm />;
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      {localError && <p className="register-form__error">{localError}</p>}

      <FormField errorMessage={error?.general}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Электронная почта"
          required
        />
      </FormField>

      <FormField errorMessage={error?.general}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
           placeholder="Имя"
          required
        />
      </FormField>

      <FormField errorMessage={error?.general}>
        <input
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
           placeholder="Фамилия"
          required
        />
      </FormField>

      <FormField errorMessage={localError}>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
           placeholder="Пароль"
          required
        />
      </FormField>

      <FormField errorMessage={localError}>
        <input
          type="password"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
           placeholder="Подтвердите пароль"
          required
        />
      </FormField>

      <Button type="submit" className="btn" disabled={loading}>
        Зарегистрироваться
      </Button>
    </form>
  );
};