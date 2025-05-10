import { Search } from '../search/Search'
import { Link } from 'react-router-dom';
import { Button } from '../button/Button';
import { SearchDropdown } from '../search/SearchDropdown';
import { AuthForm } from '../authForm/AuthForm';
import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';

export const Navbar = () => {
    const { user } = useAppSelector((state) => state.auth);
    const [isAuthFormVisible, setIsAuthFormVisible] = useState(false);

    const handleAuthButtonClick = () => {
        setIsAuthFormVisible(true);
    };
    return (
        <div className="container">
            <nav className="navbar">

                <div className="navbar__logo">
                    <Link className="navbar__logo-link" to="/">
                        <img src="/logo_.png" alt="logo" width={143} height={32}/>
                    </Link>
                </div>

                <div className="navbar__nav">
                    <ul className="navbar__list">
                        <li className="navbar__item">
                            <Link className="navbar__item-link" to="/">Главная</Link>
                        </li>
                        <li className="navbar__item">
                            <Link className="navbar__item-link" to="/movie/genres">Жанры</Link>
                        </li>
                    </ul>
                    <div className="navbar__search">
                        <Search/>
                        <SearchDropdown />
                    </div>
                    {user ?
                        <p>{user.name}</p> 
                        : 
                        <Button className='btn btn-auth' onClick={handleAuthButtonClick}>
                            Войти
                        </Button>
                    }
                    
                </div>
                    {isAuthFormVisible && <AuthForm onClose={() => setIsAuthFormVisible(false)} />}

                <div className="navbar__nav-mob">
                    <Button className='navbar__nav-btn' >
                        <svg className='navbar__nav-btn-icon' width="24" height="24" aria-hidden="true">
                            <use xlinkHref="vite.svg#icon-genre" />
                        </svg>
                    </Button>
                    <Button className='navbar__nav-btn' >
                        <svg className='navbar__nav-btn-icon' width="24" height="24" aria-hidden="true">
                            <use xlinkHref="vite.svg#icon-search" />
                        </svg>
                    </Button>
                    <Button className='navbar__nav-btn' >
                        <svg className='navbar__nav-btn-icon' width="24" height="24" aria-hidden="true">
                            <use xlinkHref="vite.svg#icon-auth" />
                        </svg>
                    </Button>
                </div>
            </nav>
        </div>
    )
}