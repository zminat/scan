import "../styles/Header.css";
import colorfulHeaderIconUrl from "../assets/img/SGN_09_24_2022_1663968217400 1.svg";
import headerIconUrl from "../assets/img/eqw 1.svg"
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.tsx";
import LimitInfo from "./LimitInfo.tsx";
import UserInfo from "./UserInfo.tsx";
import {useState} from "react";
import { slide as Menu } from "react-burger-menu";

function Header() {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuStateChange = (state: { isOpen: boolean | ((prevState: boolean) => boolean); }) => {
        setMenuOpen(state.isOpen);
    };

    const styles = {
        bmBurgerButton: {
            display: 'none' // Скрываем встроенную кнопку бургера
            },
        bmItem: {
            display: 'inline-block'
        },
        bmOverlay: {
            background: 'var(--main-color)',
            margin: '0 auto',
            top: '0'
        }
    }

    return (
        <header className="header">
            {!menuOpen ? (
                <div className="header-icon">
                        <img src={colorfulHeaderIconUrl} alt="Header Icon"/>
                </div>
            ) : (
                <div className="header-icon">
                <img src={headerIconUrl} alt="Header Icon"/>
                </div>
            )}

            <nav className="header-nav">
                <NavLink to="/" className="nav-link">Главная</NavLink>
                <NavLink to="/" className="nav-link">Тарифы</NavLink>
                <NavLink to="/" className="nav-link">FAQ</NavLink>
            </nav>

            <div className="header-actions">
                {isLoggedIn ? (
                    <>
                        {!menuOpen ? (<LimitInfo/>) : ("")}
                        <UserInfo/>
                    </>
                ) : (
                    <>
                        {!menuOpen ? (
                            <>
                                <NavLink to="/auth" className="register-link">Зарегистрироваться</NavLink>
                                <div className="header-divider"></div>
                                <button className="login-button" onClick={() => navigate("/auth")}>
                                    Войти
                                </button>
                            </>
                        ) : ("")}
                    </>
                )}
            </div>
            <div className="burger-container">
            <Menu styles = {styles} right isOpen={menuOpen} width={ '50%' } itemListElement="div" onStateChange={handleMenuStateChange}>
                {menuOpen && (
                    <div className="menu-page">
                        <div className="menu-nav">
                            <NavLink to="/" className="burger-bar" onClick={() => setMenuOpen(false)}>Главная</NavLink>
                            <NavLink to="/" className="burger-bar" onClick={() => setMenuOpen(false)}>Тарифы</NavLink>
                            <NavLink to="/" className="burger-bar" onClick={() => setMenuOpen(false)}>FAQ</NavLink>
                        </div>
                        {isLoggedIn ? (<UserInfo/>) : (
                            <div className="reg-block">
                                <NavLink to="/auth" className="register-link">Зарегистрироваться</NavLink>
                                <button className="login-button" onClick={() => navigate("/auth")}>
                                    Войти
                                </button>
                            </div>
                        )}
                    </div>
                )}
                <div>
                    {isLoggedIn ? (
                        <>
                            {!menuOpen ? (<LimitInfo/>) : ("")}
                            <UserInfo/>
                        </>
                        ) : (
                        <>
                            <NavLink to="/auth" className="register-link">Зарегистрироваться</NavLink>
                            <div className="header-divider"></div>
                            <button className="login-button" onClick={() => navigate("/auth")}>
                                Войти
                            </button>
                        </>
                )}
                </div>
            </Menu>
            <div className={`icon ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
                <div className="hamburger"></div>
            </div>
        </div>
        </header>
    );
}

export default Header;
