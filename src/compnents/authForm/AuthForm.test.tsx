import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthForm } from "./AuthForm";

const onClose = jest.fn();

type RegisterFormProps = {
  onCompleted: () => void;
};

type LoginFormProps = {
  onSuccess: () => void;
};

type CompletedRegistrationProps = {
  onGoToLogin: () => void;
};

jest.mock("../registerForm/RegisterForm", () => ({
  RegisterForm: (props: RegisterFormProps) => (
    <div>
      <div>RegisterForm</div>
      <button onClick={props.onCompleted}>Завершить регистрацию</button>
    </div>
  ),
}));

jest.mock("../loginForm/LoginForm", () => ({
  LoginForm: (props: LoginFormProps) => (
    <div>
      <div>LoginForm</div>
      <button onClick={props.onSuccess}>Успешный вход</button>
    </div>
  ),
}));

jest.mock("../completedRegistraion/CompletedRegistraion", () => ({
  CompletedRegistration: (props: CompletedRegistrationProps) => (
    <div>
      <div>CompletedRegistration</div>
      <button onClick={props.onGoToLogin}>Вернуться ко входу</button>
    </div>
  ),
}));

describe("AuthForm", () => {
  test("Должна отображаться форма регистрации по умолчанию", () => {
    render(<AuthForm onClose={onClose} />);
    expect(screen.getByText("RegisterForm")).toBeInTheDocument();
    expect(screen.getByText(/Уже есть аккаунт/i)).toBeInTheDocument();
  });

  test("Переключение между формами при нажатии на кнопку", async () => {
    render(<AuthForm onClose={onClose} />);
    fireEvent.click(screen.getByText(/Уже есть аккаунт/i));

    await waitFor(() => {
      expect(screen.getByText("LoginForm")).toBeInTheDocument();
      expect(screen.getByText(/Ещё нет аккаунта/i)).toBeInTheDocument();
    });
  });

  test("Отображение формы завершения регистрации после регистрации", async () => {
    render(<AuthForm onClose={onClose} />);
    fireEvent.click(screen.getByText("Завершить регистрацию"));

    await waitFor(() => {
      expect(screen.getByText("CompletedRegistration")).toBeInTheDocument();
    });
  });

  test("Возврат к форме входа со страницы завершения", async () => {
    render(<AuthForm onClose={onClose} />);
    fireEvent.click(screen.getByText("Завершить регистрацию"));

    await waitFor(() => {
      expect(screen.getByText("CompletedRegistration")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Вернуться ко входу"));

    await waitFor(() => {
      expect(screen.getByText("LoginForm")).toBeInTheDocument();
    });
  });

  test("Закрытие компонента при нажатии на кнопку закрытия", () => {
    render(<AuthForm onClose={onClose} />);
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
