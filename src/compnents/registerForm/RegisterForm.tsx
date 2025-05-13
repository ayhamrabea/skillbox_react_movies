;import { useAppDispatch, useAppSelector } from "../../hooks/Redux";
import { registerUser } from "../../features/auth/aythSlice";
import { FormField } from "../formField/FormField";
import { Button } from "../button/Button";
import { useEffect, useState } from "react";


type RegisterFormProps = {
  onCompleted: () => void;
};

export const RegisterForm = ({ onCompleted }: RegisterFormProps) => {
  const dispatch = useAppDispatch();

  const { loading  } = useAppSelector((state) => state.auth);
  const [localError, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
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

  useEffect(() => {
    if (isRegistered) {
      onCompleted();
    }
  }, [isRegistered, onCompleted]);

  const isFormInvalid = !formData;

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      {localError && <p className="register-form__error">{localError}</p>}

      <FormField iconNmae="email">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Электронная почта"
          required
        />
      </FormField>

      <FormField iconNmae="auth">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Имя"
          required
        />
      </FormField>

      <FormField iconNmae="auth">
        <input
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
           placeholder="Фамилия"
          required
        />
      </FormField>

      <FormField iconNmae="password">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
           placeholder="Пароль"
          required
        />
      </FormField>

      <FormField iconNmae="password">
        <input
          type="password"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
           placeholder="Подтвердите пароль"
          required
        />
      </FormField>

      <Button
            type="submit"
            className="btn"
            disabled={loading || isFormInvalid}
            >
            {loading ? "Загрузка..." : "Зарегистрироваться"}
        </Button>
    </form>
  );
};