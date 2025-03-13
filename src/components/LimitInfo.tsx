import { useState, useEffect } from "react";
import { LOGIN_INFO_URL } from "./API.tsx";
import { useAuth } from "./AuthContext.tsx";
import "../styles/Header.css";
import loading_icon from "../assets/img/spinner.png"


interface AccountInfo {
    eventFiltersInfo: {
        usedCompanyCount: number;
        companyLimit: number;
    };
}

const LimitInfo: React.FC = () => {
    const { isLoggedIn } = useAuth();
    const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            setLoading(true);
            fetch(LOGIN_INFO_URL, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
                .then((response) => response.json())
                .then((data: AccountInfo) => setAccountInfo(data))
                .catch((error) => console.error("Ошибка загрузки лимитов:", error))
                .finally(() => setLoading(false));
        }
    }, [isLoggedIn]);

    if (loading) {
        return (
            <div className="limit-info-container">
                <div className="limit-data">
                    <img src={loading_icon} alt="Loading" className="loading-icon" />
                </div>
            </div>
        );
    }

    if (!accountInfo) {
        return (
            <div className="limit-info-container">
                <div className="limit-data">
                    <p>Не удалось загрузить данные о лимитах</p>;
                </div>
            </div>
        )
    }

    return (
        <div className="limit-info-container">
                <div className="limit-data">
                    <div className="text-item">Использовано компаний</div>
                    <div className="number-item used-quantity">{accountInfo.eventFiltersInfo.usedCompanyCount}</div>
                    <div className="text-item">Лимит по компаниям</div>
                    <div className="number-item limit-quantity">{accountInfo.eventFiltersInfo.companyLimit}</div>
                </div>
        </div>
    );
};

export default LimitInfo;
