import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext.tsx";
import "../styles/LoginPage.css";
import CharactersImg from "../assets/img/LoginPage/Characters.svg";
import Google from "../assets/img/LoginPage/Google.svg";
import Facebook from "../assets/img/LoginPage/Facebook.svg";
import Yandex from "../assets/img/LoginPage/Яндекс.svg";
import LockImg from "../assets/img/LoginPage/Lock.svg"
import {LOGIN_URL} from "../components/API.tsx";

function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const { setIsLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [errorMessage] = useState("");
    const [activeTab, setActiveTab] = useState('login'); // 'login' или 'register'

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch(LOGIN_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login, password }),
            });

            if (!response.ok) throw new Error("Ошибка авторизации");

            const data = await response.json();
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("tokenExpire", data.expire);
            setIsLoggedIn(true);
            navigate("/");
        } catch (error) {
            console.error("Ошибка входа:", error);
            alert("Ошибка авторизации, проверьте данные");
        }
    };

        return (
        <div className="login-page">
            <div className="container">
                <h1>Для оформления подписки на{'\u00A0'}тариф, необходимо авторизоваться.</h1>
                <img src={CharactersImg} alt="Для оформления подписки на тариф, необходимо авторизоваться" />
            </div>
            <div className="login-form-container">
                <img className="lock-icon" src={LockImg} alt="Lock image" />
                <div className="login-form">

                    <div className="form-tabs">
                        <div className="tab">
                            <button
                                className={`login-btn ${activeTab === 'login' ? 'active' : ''}`}
                                onClick={() => setActiveTab('login')}
                            >
                                Войти
                            </button>
                            <div className={`tab-line ${activeTab === 'login' ? 'active' : ''}`} />
                        </div>

                        <div className="tab">
                            <button
                                className={`register-btn ${activeTab === 'register' ? 'active' : ''}`}
                                onClick={() => setActiveTab('register')}
                            >
                                Зарегистрироваться
                            </button>
                            <div className={`tab-line ${activeTab === 'register' ? 'active' : ''}`} />
                        </div>
                    </div>
                    <form onSubmit={handleLogin}>
                        <label>
                            Логин или номер телефона:
                            <input
                                type="text"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Пароль:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button type="submit" className="submit-button" disabled={!login || !password}>
                            Войти
                        </button>
                    </form>
                    <a href="#" className="forgot-password">Восстановить пароль</a>
                    <div className="social-login">
                        <p>Войти через:</p>
                        <div className="social-buttons">
                            <button><img src={Google} alt="Google" /></button>
                            <button><img src={Facebook} alt="Facebook" /></button>
                            <button><img src={Yandex} alt="Яндекс" /></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="img-container">
                <img src={CharactersImg} alt="Для оформления подписки на тариф, необходимо авторизоваться" />
            </div>
        </div>
    );
}

export default LoginPage;
