import { FC, ReactNode } from "react";


interface IFormFieldProps {
    children: ReactNode;
    errorMessage?: string | null;
}

export const FormField: FC<IFormFieldProps> = ({
    
    children,
    errorMessage,
}) => {
    return (
        <>
            <label className="form-field">
            {children}
            </label>
            {errorMessage && (
                <span className="form-field__error-text">{errorMessage}</span>
            )}
        </>
        );
};