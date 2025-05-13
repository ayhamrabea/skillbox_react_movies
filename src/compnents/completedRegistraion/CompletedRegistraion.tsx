import { Button } from "../button/Button";

type CompletedRegistrationProps = {
  onGoToLogin: () => void;
};

export const CompletedRegistration = ({ onGoToLogin }: CompletedRegistrationProps) => {
    return (
        <div className="auth-form__copleted">
        <h2 className="auth-form__copleted-title">Регистрация завершена</h2>
        <p className="auth-form__copleted-text">Используйте вашу электронную почту для входа</p>
        <Button className="btn" onClick={onGoToLogin}>Войти</Button>
        </div>
    );
};