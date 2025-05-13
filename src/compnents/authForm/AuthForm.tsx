import { useState } from "react";
import { LoginForm } from "../loginForm/LoginForm";
import { RegisterForm } from "../registerForm/RegisterForm";
import { AuthFormProps } from "../../models/auth";
import { CompletedRegistration } from "../completedRegistraion/CompletedRegistraion";
import { AnimatePresence, motion } from "framer-motion";

type AuthStep = "login" | "register" | "completed";

export const AuthForm = ({ onClose }: AuthFormProps) => {
    const [authStep, setAuthStep] = useState<AuthStep>("register");

    const renderForm = () => {

    let content;
    switch (authStep) {
        case "register":
            content = <RegisterForm onCompleted={() => setAuthStep("completed")} />;
            break;
        case "login":
            content = <LoginForm onSuccess={onClose} />;
            break;
        case "completed":
            content = <CompletedRegistration onGoToLogin={() => setAuthStep("login")} />;
            break;
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={authStep}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{ duration: 0.4 }}
            >
                {content}
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

                    <button className="auth-form__close" type="button" onClick={onClose}>
                        <svg className="auth-form__close-icon" width="24" height="24" aria-hidden="true">
                            <use xlinkHref="/vite.svg#icon-close" />
                        </svg>
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};