import { FC, ReactNode } from "react";


interface IFormFieldProps {
    children: ReactNode;
    errorMessage?: string | null;
    iconNmae?:string;
}

export const FormField: FC<IFormFieldProps> = ({
    
    children,
    errorMessage,
    iconNmae,
}) => {
    return (
        <>
            <label className="form-field">
                <div className="form-field__icon">
                    <svg width="24" height="24" aria-hidden="true">
                        <use xlinkHref={`vite.svg#icon-${iconNmae}`} />
                    </svg>
                </div>
                {children}
            </label>
            {errorMessage && (
                <span className="form-field__error-text">{errorMessage}</span>
            )}
        </>
        );
};