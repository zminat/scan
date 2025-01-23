import "../styles/Main.css";
import WhyUs from "../assets/img/Main/Group14.svg";
import SearchImg from "../assets/img/Main/Group19.svg";
import Rates from "../pages/Rates.tsx";

function Main() {
    return (
        <div>
            <div className="search">
                <div className="container">
                    <div className="title-container">
                        <h1>сервис&nbsp;по&nbsp;поиску</h1>
                        <h1>публикаций</h1>
                        <h1>о&nbsp;компании</h1>
                        <h1>по&nbsp;его&nbsp;ИНН</h1>
                    </div>
                    <p>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
                    <button className="request-btn">Запросить данные</button>
                </div>
                <div className="search-img">
                    <img src={SearchImg} alt="сервис по поиску публикаций о компании по его ИНН" />
                </div>
            </div>
            <h2>Почему именно мы</h2>
            {/* <Carousel /> */}
            <div className="why-us">
                <img src={WhyUs} alt="Почему именно мы" />
            </div>
            <Rates />
        </div>
    );
}

export default Main;
