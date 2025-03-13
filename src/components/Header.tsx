import "../styles/Header.css";
import colorfulHeaderIconUrl from "../assets/img/SGN_09_24_2022_1663968217400 1.svg";
import headerIconUrl from "../assets/img/eqw 1.svg"
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.tsx";
import LimitInfo from "./LimitInfo.tsx";
import UserInfo from "./UserInfo.tsx";
import {useEffect, useState} from "react";
import { slide as Menu } from "react-burger-menu";

function Header() {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1000);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleMenuStateChange = (state: { isOpen: boolean | ((prevState: boolean) => boolean); }) => {
        setMenuOpen(state.isOpen);
        onscroll= function() {return false;}
    };

    const handleCloseMenu = () => {
        setMenuOpen(false);
    };

    const styles = {
        bmBurgerButton: {
            display: 'none'
            },
        bmMenu: {
            overflow: 'hidden',
        },
        bmMenuWrap: {
            background: 'var(--main-color)',
            cursor: 'context-menu',
            top: '0',
            width: '100%',
            high: 'auto',
        },
        bmItemList: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '120px'
        },
        bmOverlay: {
            display: 'none'
        }
    };

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
                        {!menuOpen ? (<LimitInfo />) : null}
                        {!isMobile ? (<UserInfo/>) : null}
                    </>
                ) : (
                    <>
                        {!menuOpen && !isMobile ? (
                            <>
                                <NavLink to="/auth" className="register-link">Зарегистрироваться</NavLink>
                                <div className="header-divider"></div>
                                <button className="login-button" onClick={() => navigate("/auth")}>
                                    Войти
                                </button>
                            </>
                        ) : null}
                    </>
                )}
            </div>

            <div className="burger-container">
                <div className="burger-container">
                    <Menu styles={styles} right isOpen={menuOpen} onStateChange={handleMenuStateChange} width={'100%'}>
                        <div className="menu-page">
                            <div className="menu-nav">
                                <NavLink to="/" className="burger-bar" onClick={handleCloseMenu}>Главная</NavLink>
                                <NavLink to="/" className="burger-bar" onClick={handleCloseMenu}>Тарифы</NavLink>
                                <NavLink to="/" className="burger-bar" onClick={handleCloseMenu}>FAQ</NavLink>
                            </div>

                            {isLoggedIn ? (
                                <UserInfo />
                            ) : (
                                <div className="reg-block">
                                    <NavLink to="/auth" className="register-link">Зарегистрироваться</NavLink>
                                    <button className="login-button" onClick={() => { navigate("/auth"); handleCloseMenu(); }}>
                                        Войти
                                    </button>
                                </div>
                            )}
                        </div>
                    </Menu>
                    <div className={`icon ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
                        <div className="hamburger"></div>
                    </div>
                </div>
            </div>
        </header>
);
}

export default Header;
