import "../styles/Header.css";
import headerIconUrl from "../assets/img/SGN_09_24_2022_1663968217400 1.svg";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <div className="header-icon">
                <img src={headerIconUrl} alt="Header Icon" />
            </div>
            <nav className="header-nav">
                <NavLink to="/" className="nav-link">
                    Главная
                </NavLink>
                <NavLink to="/rates" className="nav-link">
                    Тарифы
                </NavLink>
                <NavLink to="/faq" className="nav-link">
                    FAQ
                </NavLink>
            </nav>
            <div className="header-actions">
                <a href="/register" className="register-link">
                    Зарегистрироваться
                </a>
                <div className="divider"></div>
                <button className="login-button">Войти</button>
            </div>
        </header>
    );
}

export default Header;
