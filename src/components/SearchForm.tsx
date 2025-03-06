import {useState} from "react";
import {isBefore, isValid, parseISO} from "date-fns";
import "../styles/SearchForm.css";
import Checkboxes from "./Checkboxes.tsx";
import {useNavigate} from "react-router-dom";

const validateINN = (inn: string) => {
    return /^\d{10}$/.test(inn);
};

const SearchForm: React.FC = () => {
    const [companyINN, setCompanyINN] = useState("");
    const [touchedINN, setTouchedINN] = useState(false);
    const [tonality, setTonality] = useState("any");
    const [docCount, setDocCount] = useState("");
    const [touchedDocCount, setTouchedDocCount] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const navigate = useNavigate();

    const [checkboxStates, setCheckboxStates] = useState<Record<string, boolean>>({
        maxCompleteness: false,
        businessMentions: false,
        mainRole: false,
        riskFactorsOnly: false,
        includeMarketNews: false,
        includeAnnouncements: false,
        includeNewsSummaries: false,
    });

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name} = event.target as { name: keyof typeof checkboxStates };
        setCheckboxStates((prev) => ({...prev, [name]: !prev[name]}));
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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (isFormValid) {

            const searchParams = {
                issueDateInterval: {
                    startDate: `${startDate}T00:00:00.000Z`,
                    endDate: `${endDate}T23:59:59.999Z`
                },
                searchContext: {
                    targetSearchEntitiesContext: {
                        targetSearchEntities: [{
                            type: "company",
                            inn: companyINN,
                            maxFullness: checkboxStates.maxCompleteness,
                        }],
                        onlyMainRole: checkboxStates.mainRole,
                        tonality: tonality,
                        onlyWithRiskFactors: checkboxStates.riskFactorsOnly,
                    }
                },
                attributeFilters: {
                    excludeTechNews: !checkboxStates.includeMarketNews,
                    excludeAnnouncements: !checkboxStates.includeAnnouncements,
                    excludeDigests: !checkboxStates.includeNewsSummaries,
                },
                limit: Number(docCount),
                sortType: "sourceInfluence",
                sortDirectionType: "desc",
                intervalType: "month",
                histogramTypes: ["totalDocuments", "riskFactors"]
            };

            console.log('Отправка запроса на сервер с данными:', searchParams);

            navigate('/results', {state: {searchParams: searchParams}});
        } else {
            console.log('Форма не валидна, перенаправление не выполнено.');
        }
    };


    const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.type = 'date';
    };

    const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value) {
            event.target.type = 'text';
        }
    };

    return (
        <form className="formContainer" onSubmit={handleSearch}>
            <div className="inputsContainer">
                <div className="inputContainer">
                    <label className="label">ИНН компании *</label>
                    <input
                        type="text"
                        className={`input`}
                        value={companyINN}
                        onChange={(e) => setCompanyINN(e.target.value)}
                        onBlur={() => setTouchedINN(true)}
                        placeholder="10 цифр"
                    />
                    {touchedINN && !isINNValid && <p className="error-message">ИНН должен содержать 10 цифр</p>}
                </div>

                <div>
                    <label className="label">Тональность *</label>
                    <select className="custom-select" value={tonality} onChange={(e) => setTonality(e.target.value)}>
                        <option value="any">Любая</option>
                        <option value="positive">Позитивная</option>
                        <option value="negative">Негативная</option>
                    </select>
                </div>

                <div className="inputContainer">
                    <label className="label">Количество документов в выдаче *</label>
                    <input
                        type="number"
                        className={`input ${!isDocCountValid && touchedDocCount ? "input-error" : ""}`}
                        value={docCount}
                        onChange={(e) => setDocCount(e.target.value)}
                        onBlur={() => setTouchedDocCount(true)}
                        placeholder="От 1 до 1000"
                    />
                    {touchedDocCount && !isDocCountValid && <p className="error-message">Введите число от 1 до 1000</p>}
                </div>

            </div>
            <div className="checkboxGroup">
                <Checkboxes checkboxStates={checkboxStates} handleCheckboxChange={handleCheckboxChange}/>
            </div>
            <div>
                <label className="label">Диапазон поиска *</label>
                <div className="dateRange">
                    <input
                        type="date"
                        className={`dateInput ${!isStartDateValid ? "input-error" : ""}`}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="Дата начала"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    <input
                        type="date"
                        className={`dateInput ${!isEndDateValid ? "input-error" : ""}`}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="Дата конца"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>
                {!isDateRangeValid && <p className="error-message">Дата начала не может быть позже даты конца</p>}
            </div>
            <div className="button-container">
                <button className="button" type="submit" disabled={!isFormValid}>
                    Поиск
                </button>
                <p className="note">* Обязательные к заполнению поля</p>
            </div>
        </form>
    );
};

export default SearchForm;
