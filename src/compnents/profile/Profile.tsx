import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/Redux";
import { Button } from "../button/Button";
import { deleteFavorite, getFavorites } from "../../features/favorite/FavoriteSlice";
import { Link, useNavigate } from "react-router-dom";
import { ErrorFunction } from "../error/Error";
import { Loader } from "../loader/Loader";
import Icon from "../icon/Icon";
import { logoutUser } from "../../features/auth/authSlice";


type ProfileSwitch = "favorite" | "date";

const Profile = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { favorites, loading, error } = useAppSelector((state) => state.favorites);
    const { user } = useAppSelector((state) => state.auth);
    const [showComponents , setShowComponents] = useState<ProfileSwitch>('favorite');
    const [loadingFavorites, setLoadingFavorites] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/'); 
        } else {
            dispatch(getFavorites());
        }
    }, [dispatch, user, navigate]);

    const handleLogout = () => {
        dispatch(logoutUser())
            .then(() => {
                navigate('/');  
            })
            .catch((error) => {
                console.error('Error during logout:', error);
            });
    };

    const handleDeleteFavorite = ({ id }: { id: string }) => {
        setLoadingFavorites(true);
        dispatch(deleteFavorite({ id: id.toString() }))
            .then(() => {
                dispatch(getFavorites());
            })
            .finally(() => {
                setLoadingFavorites(false);
            });
    };

    const switchToFavorite = () => {
        setShowComponents('favorite')
    };

    const switchToData = () => {
        setShowComponents('date')
    };

    const Favorite = () => (
        <div className="movies">
            {loadingFavorites || loading ? (
                <div className="loading-indicator">
                    <Loader />
                </div>
            ) : (
                <ul className="movies__list">
                    {error ? (
                        <ErrorFunction error={error} />
                    ) : favorites && favorites.length > 0 ? (
                        favorites.map((movie) => (
                            <li className="movies__item" key={movie.id}>
                                <Button 
                                    className="profile__delete"
                                    type="button"
                                    onClick={() => handleDeleteFavorite({ id: movie.id.toString() })}
                                >
                                    <Icon className="movies__item-icon" name="close" />
                                </Button>
                                <Link to={`/movie/${movie.id}`} className="movies__item-link">
                                    <img
                                        className="movies__item-poster"
                                        src={movie.posterUrl ? movie.posterUrl : '/empty.png'}
                                        alt={movie.title}
                                    />
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p className="movies__empty">нет фильмов</p>
                    )}
                </ul>
            )}
        </div>
    );

    const getInitials = (phrase: string): string => {
        const words = phrase.trim().split(" ");
        if (words.length < 2) return "";
        const firstInitial = words[0][0];
        const secondInitial = words[1][0];
        return (firstInitial + secondInitial).toUpperCase();
    };

    const Date = () => (
        <div className="profile__data">
            <ul className="profile__data-info">
                <li className="profile__data-meta">
                    <span className="profile__data-icon">{user?.name && user?.surname ? getInitials(`${user.name} ${user.surname}`) : "??"}</span>
                    <p className="profile__data-key">Имя Фамилия</p>
                    <h2 className="profile__data-value">{user?.name && user?.surname ? `${user.name} ${user.surname}` : 'нет Имя'}</h2>
                </li>
                <li className="profile__data-meta">
                    <span className="profile__data-icon">
                        <Icon className="" name="email" />
                    </span>
                    <p className="profile__data-key">Электронная почта</p>
                    <h2 className="profile__data-value">{user?.email || 'нет логин'}</h2>
                </li>
            </ul>
            <div className="profile__logout">
                <Link className="btn" to={'/'} onClick={handleLogout}>
                    Выйти из аккаунта
                </Link>
            </div>
        </div>
    );

    if (!user) {
        return <div><Loader /></div>; 
    }

    return (
        <div className="profile">
            <div className="container">
                <h1 className="profile__title">Мой аккаунт</h1>

                <ul className="profile__list">
                    <li className="profile__item">
                        <Button className={`profile__item-btn ${showComponents === 'favorite' ? 'active' : ''}`} onClick={switchToFavorite}>
                            <Icon className="profile__item-icon" name="favorite" />
                            Избранные фильмы
                        </Button>
                    </li>
                    <li className="profile__item">
                        <Button className={`profile__item-btn ${showComponents === 'date' ? 'active' : ''}`} onClick={switchToData}>
                            <Icon className="profile__item-icon" name="auth" />
                            Настройка аккаунта
                        </Button>
                    </li>
                </ul>

                <div className="profile__content">
                    {showComponents === 'favorite' ? <Favorite/> : <Date /> }
                    
                </div>
            </div>
        </div>
    );
};

export default Profile;
