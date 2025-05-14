import { useState } from "react";
import { LoginForm } from "../loginForm/LoginForm";
import { RegisterForm } from "../registerForm/RegisterForm";
import { AuthFormProps } from "../../models/auth";
import { CompletedRegistration } from "../completedRegistraion/CompletedRegistraion";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "../icon/Icon";
import { Button } from "../button/Button";

type AuthStep = "login" | "register" | "completed";

export const AuthForm = ({ onClose }: AuthFormProps) => {
    const [authStep, setAuthStep] = useState<AuthStep>("register");

const renderForm = () => {
    const authComponents = {
        register: <RegisterForm onCompleted={() => setAuthStep("completed")} />,
        login: <LoginForm onSuccess={onClose} />,
        completed: <CompletedRegistration onGoToLogin={() => setAuthStep("login")} />,
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={authStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
            >
                {authComponents[authStep]}
            </motion.div>
        </AnimatePresence>
    );
};

    const toggleAuthStep = () => {
        if (authStep === "register") setAuthStep("login");
        else if (authStep === "login") setAuthStep("register");
    };

    return (
        <AnimatePresence>
            <motion.div
                className="auth"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="auth-form"
                    >

                    <div className="auth-form__logo">
                        <img src="/auth.png" alt="logo" width={143} height={32} />
                    </div>

                    {renderForm()}

                    {(authStep === "register" || authStep === "login") && (
                        <div className="auth-form__info">
                            <button className="auth-form__button" onClick={toggleAuthStep}>
                                {authStep === "register"
                                    ? "Уже есть аккаунт?"
                                    : "Ещё нет аккаунта?"}
                            </button>
                        </div>
                    )}

                    <Button className="auth-form__close" type="button" onClick={onClose} aria-label="close">
                        <Icon className="auth-form__close-icon" name="close" />
                    </Button>
                    
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};