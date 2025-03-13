import "../styles/Main.css";
import SearchImg from "../assets/img/Main/Group19.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WhyUsImg from "../assets/img/Main/Group14.svg";
import Rates from "../components/Rates.tsx";
import Carousel from "../components/Carousel.tsx"
import {useNavigate} from "react-router-dom";
import {useAuth} from "../components/AuthContext.tsx";


function Main() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    return (
        <div>
            <div className="about-container">
                <div className="container">
                    <div className="title-container">
                        <h1>сервис по поиску публикаций о{'\u00A0'}компании по{'\u00A0'}его ИНН</h1>
                    </div>
                    <p className="title-context">Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
                    <button
                        className="request-btn"
                        onClick={() => navigate(isLoggedIn ? "/search" : "/auth")}
                    >
                        Запросить данные
                    </button>
                </div>
                <div className="about-img">
                    <img src={SearchImg} alt="сервис по поиску публикаций о компании по его ИНН" />
                </div>
            </div>
            <Carousel />
            <div className="why-us">
                <img src={WhyUsImg} alt="Почему именно мы" />
            </div>
            <Rates />
        </div>
    );
}

export default Main;
