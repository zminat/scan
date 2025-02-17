import "../styles/Main.css";
import SearchImg from "../assets/img/Main/Group19.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WhyUsImg from "../assets/img/Main/Group14.svg";
import Rates from "../pages/Rates.tsx";
import Carousel from "../components/Carousel.tsx"


function Main() {
    return (
        <div>
            <div className="search">
                <div className="container">
                    <div className="title-container">
                        <h1>сервис по поиску<br/>публикаций<br/>о компании<br/>по его ИНН</h1>
                    </div>
                    <p>Комплексный анализ публикаций, получение данных<br/>в формате PDF на электронную почту.</p>
                    <button className="request-btn">Запросить данные</button>
                </div>
                <div>
                    <img src={SearchImg} alt="сервис по поиску публикаций о компании по его ИНН" />
                </div>
            </div>
            <h2>Почему именно мы</h2>
            <Carousel />
            <div className="why-us">
                <img src={WhyUsImg} alt="Почему именно мы" />
            </div>
            <Rates />
        </div>
    );
}

export default Main;
