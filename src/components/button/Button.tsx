import { FC, ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    type?: 'button' | 'submit';
}

export const Button: FC<ButtonProps> = ({ children, className = '', type = 'button', ...rest }) => {
    return (
        <button className={className} type={type} {...rest}>
            {children}
        </button>
    );
};