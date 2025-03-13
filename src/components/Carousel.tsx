import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Carousel.css";
import ClockImg from "../assets/img/Main/WhyUs/icons8-время-64.svg";
import GlassImg from "../assets/img/Main/WhyUs/icons8-расширенный-поиск-100.svg";
import ShieldImg from "../assets/img/Main/WhyUs/icons8-накладка дверного-замка-64.svg";
import LeftArrow from "../assets/img/Main/icons8-шеврон-вправо-90 1.svg";
import RightArrow from "../assets/img/Main/icons8-шеврон-вправо-90 2.svg";

type ArrowProps = {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
};

const CustomPrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
    return (
        <img
            src={LeftArrow}
            alt="prev"
            className={className}
            style={{ ...style, display: "block", width: "40px", height: "40px", zIndex: 2 }}
            onClick={onClick}
        />
    );
};

const CustomNextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
    return (
        <img
            src={RightArrow}
            alt="next"
            className={className}
            style={{ ...style, display: "block", width: "40px", height: "40px", zIndex: 2 }}
            onClick={onClick}
        />
    );
};

type CarouselCardProps = {
    title: string;
    imageSrc: string;
    text: string;
};

const CarouselCard: React.FC<CarouselCardProps> = ({ title, imageSrc, text }) => {
    return (
        <div className="carousel-card">
            <div className="carousel-card-content">
                <img src={imageSrc} alt={`${title} Icon`} className="card-icon" />
                <p className="card-text">{text}</p>
            </div>
        </div>
    );
};

const Carousel: React.FC = () => {
    const [slidesToShow, setSlidesToShow] = useState<number>(3);

    useEffect(() => {
        const updateSlidesToShow = () => {
            if (window.innerWidth <= 1360) {
                setSlidesToShow(1);
            } else {
                setSlidesToShow(3);
            }
        };

        updateSlidesToShow(); // Вызываем сразу, чтобы обновить значение при монтировании
        window.addEventListener("resize", updateSlidesToShow);

        return () => window.removeEventListener("resize", updateSlidesToShow);
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow, // Обновляемое состояние
        slidesToScroll: 1,
        arrows: true,
        centerMode: false,
        centerPadding: "2px",
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    const cards = [
        { title: "Clock", imageSrc: ClockImg, text: "Высокая и оперативная скорость обработки заявки" },
        { title: "Glass", imageSrc: GlassImg, text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос" },
        { title: "Shield", imageSrc: ShieldImg, text: "Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству" },
    ];

    return (
        <div className="main-container">
            <h1>Почему именно мы</h1>
            <div className="carousel-wrapper">
                <Slider key={slidesToShow} {...settings}>
                    {cards.map((card, index) => (
                        <CarouselCard key={index} {...card} />
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Carousel;
