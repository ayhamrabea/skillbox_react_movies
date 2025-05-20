import { FC } from 'react';
import Icon from '../icon/Icon';

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
            <Icon className='movie-card__rating-icon' name='start' /> {tmdbRating?.toFixed(1) || 'N/A'}
        </span>
    )
}   
