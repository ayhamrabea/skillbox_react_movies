export interface Movie {
    id: number;
    title: string;
    originalTitle: string;
    countriesOfOrigin: string[];
    genres?: string[];
    budget : string;
    revenue : string;
    language : string
    releaseYear: number;
    director:string;
    posterUrl:string;
    trailerUrl:string;
    tmdbRating: number;
    runtime:number;
    plot:string;
    production:string;
    awardsSummary:string;
}
export interface MovieState {
    movie: Movie | null;
    movieLoading : boolean;
    movieError : string | null;
}

export interface RandomMovieState {
    randomMovie: Movie | null;
    randomMovieLoading : boolean;
    randomMovieError : string | null;
}

export interface MoviesState {
    list: Movie[];
    loading?: boolean;
    error?: string | null;
    title?:string | null;
}


export interface MovieCardProps {
    movie: Movie,
    onResetMovie?: () => void;
}