import "../styles/Header.css";
import headerIconUrl from "../assets/img/SGN_09_24_2022_1663968217400 1.svg";
import avatar from "../assets/img/users/Alex.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LOGIN_INFO_URL } from "./API.tsx";
import { useAuth } from "./AuthContext.tsx";


interface AccountInfo {
    eventFiltersInfo: {
        usedCompanyCount: number;
        companyLimit: number;
    }
}

function Header() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            setLoading(true);
            fetch(LOGIN_INFO_URL, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
                .then((response) => response.json())
                .then((data: AccountInfo) => {
                    setAccountInfo(data);
                })
                .catch((error) => console.error("Ошибка загрузки лимитов:", error))
                .finally(() => setLoading(false));
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tokenExpire");
        setIsLoggedIn(false);
        navigate("/auth");
    };

    return (
        <header className="header">
            <div className="header-icon">
                <img src={headerIconUrl} alt="Header Icon" />
            </div>
            <nav className="header-nav">
                <NavLink to="/" className="nav-link">Главная</NavLink>
                <NavLink to="/rates" className="nav-link">Тарифы</NavLink>
                <NavLink to="/faq" className="nav-link">FAQ</NavLink>
            </nav>
            <div className="header-actions">
                {isLoggedIn ? (
                    <>
                        <div>
                        {loading ? (
                            <div className="limit-info-loader">
                                <span className="loader"></span>
                            </div>
                        ) : (
                            accountInfo ? (
                            <div className="limit-info">
                                <div className="limit-info-text">
                                    Использовано компаний
                                    <br/>
                                    Лимит по компаниям
                                </div>
                                <div className="limit-info-quantity">
                                    <span className="limit-quantity">{accountInfo.eventFiltersInfo.usedCompanyCount}</span>
                                    <br/>
                                    <span className="limit-quantity-green">{accountInfo.eventFiltersInfo.companyLimit}</span>
                                </div>
                            </div>
                        ) : (
                                <p>Не удалось загрузить данные о лимитах</p>
                            ))}
                        </div>
                        <div className="user-info">
                            <div className="user">
                                <span>Алексей А.</span>
                                <br/>
                                <a className="logout-button" onClick={handleLogout}>Выйти</a>
                            </div>
                            <img className="avatar" src={avatar} alt="Alex" />
                        </div>
                    </>
                ) : (
                    <>
                        <NavLink to="/auth" className="register-link">Зарегистрироваться</NavLink>
                        <div className="divider"></div>
                        <button className="login-button" onClick={() => navigate("/auth")}>Войти</button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
