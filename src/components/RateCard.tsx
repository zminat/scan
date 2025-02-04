import React from 'react';
import '../styles/Rates.css';

interface RateCardProps {
    title: string;
    description: string;
    imageSrc: string;
    price: string;
    installments: string;
    oldPrice?: string;
    details: string[];
    isCurrent: boolean;
    backgroundColor: string;
    color: string;
    isActive: boolean;
    onClick: () => void;
}

const RateCard: React.FC<RateCardProps> = ({
                                                   title,
                                                   description,
                                                   imageSrc,
                                                   price,
                                                   installments,
                                                   oldPrice,
                                                   details,
                                                   isCurrent,
                                                   backgroundColor,
                                                   color,
                                                   isActive,
                                                   onClick,
                                               }) => {
    return (
        <div
            className={`rate-card ${isCurrent ? 'current' : ''}`}
            style={{ borderColor: isActive ? backgroundColor : '#ddd' }}
            onClick={onClick}
        >
            <div
                className="card-header"
                style={{ backgroundColor, color }}
            >
                <h3>{title}</h3>
                <p>{description}</p>
                <img src={imageSrc} alt={`${title} Icon`} />
            </div>

            <div className="card-body">
                {isCurrent && <div className="current-badge">Текущий тариф</div>}
                <p className="price">
                    {price}
                    {oldPrice && <span className="old-price">{oldPrice}</span>}
                </p>
                <p>{installments}</p>
                <ul>
                    В тариф входит:
                    {details.map((detail, id) => (
                        <li key={id}>{detail}</li>
                    ))}
                </ul>
            </div>
            <button
                className={`btn ${isCurrent ? 'current-btn' : ''}`}
                disabled
            >
                {isCurrent ? 'Перейти в личный кабинет' : 'Подробнее'}
            </button>
        </div>
    );
};

export default RateCard;
