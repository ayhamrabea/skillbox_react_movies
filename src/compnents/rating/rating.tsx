import { FC } from 'react';

interface RatingProps {
    tmdbRating: number;
}

export const Rating: FC<RatingProps> = ({tmdbRating}) => {
    const ratingClass = tmdbRating >= 8 ? '--yellow' :
                        tmdbRating >= 7 ? '--Green' : 
                        tmdbRating >= 6 ? '--Boulder' :
                        '--red';

    return (
        <span className={`movie-card__rating movie-card__rating${ratingClass}`}>
            ⭐ {tmdbRating?.toFixed(1) || 'N/A'}
        </span>
    )
}   
