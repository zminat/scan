import { useState } from "react";
import { isBefore, isValid, parseISO } from "date-fns";
import "../styles/SearchForm.css";

const validateINN = (inn: string) => {
    return /^\d{10}$/.test(inn);
};

const SearchForm: React.FC = () => {
    const [companyINN, setCompanyINN] = useState("");
    const [tonality, setTonality] = useState("Любая");
    const [docCount, setDocCount] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [options, setOptions] = useState({
        fullCoverage: true,
        businessContext: true,
        mainRole: true,
        riskFactors: false,
        marketNews: false,
        announcements: true,
        newsSummaries: false,
    });

    const handleCheckboxChange = (option: keyof typeof options) => {
        setOptions((prev) => ({ ...prev, [option]: !prev[option] }));
    };

    const today = new Date();
    const start = parseISO(startDate);
    const end = parseISO(endDate);

    const isINNValid = validateINN(companyINN);
    const isDocCountValid = docCount !== "" && Number(docCount) >= 1 && Number(docCount) <= 1000;
    const isStartDateValid = startDate && isValid(start) && isBefore(start, today);
    const isEndDateValid = endDate && isValid(end) && isBefore(end, today);
    const isDateRangeValid = startDate && endDate && (isBefore(start, end) || start.getTime() === end.getTime());

    const isFormValid = isINNValid && isDocCountValid && isStartDateValid && isEndDateValid && isDateRangeValid;

    return (
        <div className="formContainer">
            <div className="inputsContainer">
                <label className="label">ИНН компании *</label>
                <input
                    type="text"
                    className={`input ${!isINNValid ? "input-error" : ""}`}
                    value={companyINN}
                    onChange={(e) => setCompanyINN(e.target.value)}
                    placeholder="10 цифр"
                />
                {!isINNValid && <p className="error-message">ИНН должен содержать 10 цифр</p>}

                <label className="label">Тональность *</label>
                <select className="custom-select" value={tonality} onChange={(e) => setTonality(e.target.value)}>
                    <option value="Любая">Любая</option>
                    <option value="Позитивная">Позитивная</option>
                    <option value="Негативная">Негативная</option>
                </select>

                <label className="label">Количество документов в выдаче *</label>
                <input
                    type="number"
                    className={`input ${!isDocCountValid ? "input-error" : ""}`}
                    value={docCount}
                    onChange={(e) => setDocCount(e.target.value)}
                    placeholder="От 1 до 1000"
                />
                {!isDocCountValid && <p className="error-message">Введите число от 1 до 1000</p>}

                <label className="label">Диапазон поиска *</label>
                <div className="dateRange">
                    <input
                        type="date"
                        className={`dateInput ${!isStartDateValid ? "input-error" : ""}`}
                        placeholder="Дата начала"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                        type="date"
                        className={`dateInput ${!isEndDateValid ? "input-error" : ""}`}
                        value={endDate}
                        placeholder="Дата конца"
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                {!isDateRangeValid && <p className="error-message">Дата начала не может быть позже даты конца</p>}
            </div>

            <div className="checkboxGroup">
                {Object.entries(options).map(([key, value]) => (
                    <label key={key} className="checkbox">
                        <input type="checkbox" checked={value} onChange={() => handleCheckboxChange(key as keyof typeof options)} />
                        {key === "fullCoverage"
                            ? "Признак максимальной полноты"
                            : key === "businessContext"
                                ? "Упоминания в бизнес-контексте"
                                : key === "mainRole"
                                    ? "Главная роль в публикации"
                                    : key === "riskFactors"
                                        ? "Публикации только с риск-факторами"
                                        : key === "marketNews"
                                            ? "Включать технические новости рынков"
                                            : key === "announcements"
                                                ? "Включать анонсы и календари"
                                                : "Включать сводки новостей"}
                    </label>
                ))}
                <div className="button-container">
                    <button className="button" disabled={!isFormValid}>
                        Поиск
                    </button>
                    <p className="note">* Обязательные к заполнению поля</p>
                </div>
            </div>
        </div>
    );
};

export default SearchForm;
