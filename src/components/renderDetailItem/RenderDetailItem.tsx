export const renderDetailItem = (label: string, value?: string | number) => (
    <li className="movie-detailes__item">
        <span className="movie-detailes__key">
            <span className="movie-detailes__key-text">{label}</span>
            <span className="movie-detailes__key-line"></span>
        </span>
        <span className="movie-detailes__value">{value || "неизвестно"}</span>
    </li>
);