import React, { useState } from 'react';
import TariffCard from '../components/TariffCard.tsx';
import '../styles/Rates.css';
import Beginner from "../assets/img/Rates/beginner-icon.svg";
import Pro from "../assets/img/Rates/pro-icon.svg";
import Business from "../assets/img/Rates/business-icon.svg";

const Rates: React.FC = () => {
    const tariffs = [
        {
            id: 1,
            title: 'Beginner',
            description: 'Для небольшого исследования',
            imageSrc: Beginner,
            price: '799 ₽',
            oldPrice: '1 200 ₽',
            installments: 'или 150 ₽/мес. при рассрочке на 24 мес.',
            details: ['Безлимитная история запросов', 'Безопасная сделка', 'Поддержка 24/7'],
            isCurrent: true,
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

    const [activeTariffId, setActiveTariffId] = useState<number | null>(null);

    const handleCardClick = (id: number) => {
        setActiveTariffId(id);
    };

    return (
        <div className="app">
            <h2>Наши тарифы</h2>
            <div className="tariff-container">
                {tariffs.map((tariff) => (
                    <TariffCard
                        key={tariff.id}
                        title={tariff.title}
                        description={tariff.description}
                        imageSrc={tariff.imageSrc}
                        price={tariff.price}
                        oldPrice={tariff.oldPrice}
                        installments={tariff.installments}
                        details={tariff.details}
                        isCurrent={tariff.isCurrent}
                        backgroundColor={tariff.backgroundColor}
                        color={tariff.color}
                        isActive={tariff.id === activeTariffId}
                        onClick={() => handleCardClick(tariff.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Rates;
