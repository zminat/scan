import "../styles/Header.css";
import headerIconUrl from "../assets/img/SGN_09_24_2022_1663968217400 1.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.tsx";
import LimitInfo from "./LimitInfo.tsx";
import UserInfo from "./UserInfo.tsx";

function Header() {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="header-icon">
                <img src={headerIconUrl} alt="Header Icon" />
            </div>
            <nav className="header-nav">
                <NavLink to="/" className="nav-link">Главная</NavLink>
                <NavLink to="/" className="nav-link">Тарифы</NavLink>
                <NavLink to="/" className="nav-link">FAQ</NavLink>
            </nav>
            <div className="header-actions">
                {isLoggedIn ? (
                    <>
                        <LimitInfo />
                        <UserInfo />
                    </>
                ) : (
                    <>
                        <NavLink to="/auth" className="register-link">Зарегистрироваться</NavLink>
                        <div className="divider"></div>
                        <button className="login-button" onClick={() => navigate("/auth")}>
                            Войти
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
