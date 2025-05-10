import { Link } from "react-router-dom"

export const Footer = () => {
return (
    <div className="footer">
        <div className="container">
            <ul className="footer__list">
                <li className="footer__item">
                    <Link className='footer__item-link' to='#' aria-label="vk">
                        <svg className="footer__item-icon" width="19" height="11" aria-hidden="true">
                            <use xlinkHref="/vite.svg#icon-vk" />
                        </svg>
                    </Link>
                </li>
                <li className="footer__item">
                    <Link className='footer__item-link' to='#' aria-label="youtube">
                        <svg className="footer__item-icon" width="15" height="11" aria-hidden="true">
                            <use xlinkHref="/vite.svg#icon-youtube" />
                        </svg>
                    </Link>
                </li>
                <li className="footer__item">
                    <Link className='footer__item-link' to='#' aria-label="group">
                        <svg className="footer__item-icon" width="11" height="18" aria-hidden="true">
                            <use xlinkHref="/vite.svg#icon-group" />
                        </svg>
                    </Link>
                </li>
                <li className="footer__item">
                    <Link className='footer__item-link' to='#' aria-label="telegram">
                        <svg className="footer__item-icon" width="16.45" height="13.63" aria-hidden="true">
                            <use xlinkHref="/vite.svg#icon-telegram" />
                        </svg>
                    </Link>
                </li>
            </ul>
        </div>
    </div>
)
}