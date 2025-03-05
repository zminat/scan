import { useState } from 'react';
import RateCard from './RateCard.tsx';
import '../styles/Rates.css';
import Beginner from "../assets/img/Rates/beginner-icon.svg";
import Pro from "../assets/img/Rates/pro-icon.svg";
import Business from "../assets/img/Rates/business-icon.svg";
import { useAuth } from "./AuthContext.tsx";

const Rates: React.FC = () => {
    const { isLoggedIn } = useAuth();

    const rates = [
        {
            id: 1,
            title: 'Beginner',
            description: 'Для небольшого исследования',
            imageSrc: Beginner,
            price: '799 ₽',
            oldPrice: '1 200 ₽',
            installments: 'или 150 ₽/мес. при рассрочке на 24 мес.',
            details: ['Безлимитная история запросов', 'Безопасная сделка', 'Поддержка 24/7'],
            isCurrent: isLoggedIn,
            backgroundColor: '#FFB64F',
            color: '#000000',
        },
        {
            id: 2,
            title: 'Pro',
            description: 'Для HR и фрилансеров',
            imageSrc: Pro,
            price: '1 299 ₽',
            oldPrice: '2 600 ₽',
            installments: 'или 279 ₽/мес. при рассрочке на 24 мес.',
            details: [
                'Все пункты тарифа Beginner',
                'Экспорт истории',
                'Рекомендации по приоритетам',
            ],
            isCurrent: false,
            backgroundColor: '#7CE3E1',
            color: '#000000',
        },
        {
            id: 3,
            title: 'Business',
            description: 'Для корпоративных клиентов',
            imageSrc: Business,
            price: '2 379 ₽',
            oldPrice: '3 700 ₽',
            installments: '',
            details: [
                'Все пункты тарифа Pro',
                'Безлимитное количество запросов',
                'Приоритетная поддержка',
            ],
            isCurrent: false,
            backgroundColor: '#000000',
            color: '#FFFFFF',
        },
    ];

    const [activeRateId, setActiveRateId] = useState<number | null>(null);

    const handleCardClick = (id: number) => {
        setActiveRateId(id);
    };

    return (
        <div className="main-container">
            <h1>Наши тарифы</h1>
            <div className="rate-container">
                {rates.map((rate) => (
                    <RateCard
                        key={rate.id}
                        title={rate.title}
                        description={rate.description}
                        imageSrc={rate.imageSrc}
                        price={rate.price}
                        oldPrice={rate.oldPrice}
                        installments={rate.installments}
                        details={rate.details}
                        isCurrent={rate.isCurrent}
                        backgroundColor={rate.backgroundColor}
                        color={rate.color}
                        isActive={rate.id === activeRateId}
                        onClick={() => handleCardClick(rate.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Rates;
