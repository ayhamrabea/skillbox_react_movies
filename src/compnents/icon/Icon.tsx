import { FC } from "react";

interface IconProps {
    name: string;
    className?: string; // اجعلها اختيارية إن أحببت
}

const Icon: FC<IconProps> = ({ name, className }) => (
    <svg className={className} width="24" height="24" aria-hidden="true">
        <use xlinkHref={`vite.svg#icon-${name}`} />
    </svg>
);

export default Icon;