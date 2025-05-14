import { Link } from "react-router-dom"
import Icon from "../icon/Icon"

export const Footer = () => {
return (
    <div className="footer">
        <div className="container">
            <ul className="footer__list">
                <li className="footer__item">
                    <Link className='footer__item-link' to='#' aria-label="vk">
                        <Icon className="footer__item-icon" name="vk" />
                    </Link>
                </li>
                <li className="footer__item">
                    <Link className='footer__item-link' to='#' aria-label="youtube">
                        <Icon className="footer__item-icon" name="youtube" />
                    </Link>
                </li>
                <li className="footer__item">
                    <Link className='footer__item-link' to='#' aria-label="group">
                        <Icon className="footer__item-icon" name="group" />
                    </Link>
                </li>
                <li className="footer__item">
                    <Link className='footer__item-link' to='#' aria-label="telegram">
                        <Icon className="footer__item-icon" name="telegram" />
                    </Link>
                </li>
            </ul>
        </div>
    </div>
)
}