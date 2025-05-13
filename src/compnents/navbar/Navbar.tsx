import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector} from "../../hooks/Redux";
import { Search } from '../search/Search';
import { SearchDropdown } from '../search/SearchDropdown';
import { AuthForm } from '../authForm/AuthForm';
import { Button } from '../button/Button';
import Icon from '../icon/Icon';
import { setSearchTerm } from '../../features/search/searchSlice';
import { useClickOutside } from '../../hooks/ClickOutside';

export const Navbar = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const [isAuthFormVisible, setAuthFormVisible] = useState(false);
    const [isSearchVisible, setSearchVisible] = useState(false);
    const searchRef = useRef<HTMLDivElement | null>(null);
    const searchTerm = useAppSelector((state) => state.search.term);
    const handleAuthClick = () => setAuthFormVisible(true);
    const handleSearchToggle = () => setSearchVisible(true);

    useClickOutside(searchRef , () => {
        setSearchVisible(false)
        dispatch(setSearchTerm(""))
    })

    

    return (
        <div className="container"  >
            <nav className="navbar">
                <div className="navbar__left">
                    <div className="navbar__logo">
                        <Link className="navbar__logo-link" to="/">
                            <img src="/logo_.png" alt="logo" width={143} height={32} />
                        </Link>
                    </div>
                </div>
                
                <div className="navbar__right">
                    <div className="navbar__links">
                        <ul className="navbar__list">
                            <li className="navbar__item">
                                <Link className="navbar__item-link" to="/">Главная</Link>
                            </li>
                            <li className="navbar__item">
                                <Link className="navbar__item-link" to="/movie/genres">Жанры</Link>
                            </li>
                        </ul>
                        <Link className="navbar__mobile" to="/movie/genres">
                            <Icon className="navbar__nav-btn-icon" name="genre" />
                        </Link>
                    </div>

                    <div className="navbar__search" ref={searchRef}>
                        <div className={`navbar__search-input ${isSearchVisible ? 'navbar__search-input--move' : ''}`}>
                            <Search setSearchInput={setSearchVisible} /> 
                        </div>
                            {searchTerm.trim() && <SearchDropdown setSearchVisible={setSearchVisible} />} 

                        <Button className="navbar__mobile" onClick={handleSearchToggle}>
                                <Icon className="navbar__nav-btn-icon" name="search" />
                        </Button>

                    </div>
                </div>

                <div className="navbar__auth">
                    <Link
                        className="navbar__auth-link"
                        to={user ? "/profile" : "#"}
                        onClick={!user ? handleAuthClick : undefined}
                        >
                        {user ? user.name : "Войти"}
                    </Link>

                    <Link
                        className="navbar__auth-link navbar__mobile"
                        to={user ? "/profile" : "#"}
                        onClick={!user ? handleAuthClick : undefined}
                        >
                        <Icon className="navbar__nav-btn-icon" name="auth" />
                    </Link>

                </div>
                {/* Auth Modal */}
                {isAuthFormVisible && <AuthForm onClose={() => setAuthFormVisible(false)} />}
            </nav>
        </div>
    );
};
