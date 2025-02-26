import { useState, useEffect } from "react";
import { LOGIN_INFO_URL } from "./API.tsx";
import { useAuth } from "./AuthContext.tsx";
import "../styles/Header.css";


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
            <div className="limit-info">
                <span className="loader"></span>
            </div>
        );
    }

    if (!accountInfo) {
        return <p>Не удалось загрузить данные о лимитах</p>;
    }

    return (
        <div className="limit-info">
            <div className="limit-info-text">
                Использовано компаний
                <br />
                Лимит по компаниям
            </div>
            <div className="limit-info-quantity">
                <span className="limit-quantity">{accountInfo.eventFiltersInfo.usedCompanyCount}</span>
                <br />
                <span className="limit-quantity-green">{accountInfo.eventFiltersInfo.companyLimit}</span>
            </div>
        </div>
    );
};

export default LimitInfo;
