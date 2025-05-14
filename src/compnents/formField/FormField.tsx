import { FC, ReactNode } from "react";
import Icon from "../icon/Icon";


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
        <div className={`form-field ${errorMessage ? "form-field--error" : ""}`}>
            <div className="form-field__input-wrapper">
                {iconNmae && (
                <div className="form-field__icon">
                    <Icon name={iconNmae} />
                </div>
                )}
                {children}
            </div>
            {errorMessage && (
                <span className="form-field__error-text">{errorMessage}</span>
            )}
        </div>
    );
};