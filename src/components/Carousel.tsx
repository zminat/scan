import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/Carousel.css';
import ClockImg from "../assets/img/Main/WhyUs/icons8-время-64.svg";
import GlassImg from "../assets/img/Main/WhyUs/icons8-расширенный-поиск-100.svg";
import ShieldImg from "../assets/img/Main/WhyUs/icons8-накладка дверного-замка-64.svg";
import LeftArrow from "../assets/img/Main/icons8-шеврон-вправо-90 1.svg";
import RightArrow from "../assets/img/Main/icons8-шеврон-вправо-90 2.svg";


const CustomPrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <img
            src={LeftArrow}
            alt="prev"
            className={className}
            style={{ ...style, display: "block", width: "40px", height: "40px", left: "-50px" }}
            onClick={onClick}
        />
    );
};

const CustomNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <img
            src={RightArrow}
            alt="next"
            className={className}
            style={{ ...style, display: "block", width: "40px", height: "40px", right: "-50px" }}
            onClick={onClick}
        />
    );
};

interface CarouselCardProps {
    title: string;
    imageSrc: string;
    text: string;
}

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
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        centerMode: false,
        centerPadding: "20px",
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        useCSS: true,
        transform: "translate3d(0px, 0px, 0px)",
    };

    const cards = [
        { title: 'Clock', imageSrc: ClockImg, text: 'Высокая и оперативная скорость обработки заявки' },
        { title: 'Glass', imageSrc: GlassImg, text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос' },
        { title: 'Shield', imageSrc: ShieldImg, text: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству' },
        // { title: 'Clock', imageSrc: ClockImg, text: 'Высокая скорость обработки' },

    ];

    return (
        <div className="carousel">
            <Slider {...settings}>
                {cards.map((card, index) => (
                    <CarouselCard key={index} {...card} />
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
