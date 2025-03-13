import {useState} from "react";
import {isBefore, isValid, parseISO} from "date-fns";
import "../styles/SearchForm.css";
import Checkboxes from "./Checkboxes.tsx";
import {useNavigate} from "react-router-dom";
import validateInn from "./ValidateInn.ts";


const SearchForm: React.FC = () => {
    const [companyINN, setCompanyINN] = useState("");
    const [touchedINN, setTouchedINN] = useState(false);
    const [tonality, setTonality] = useState("any");
    const [docCount, setDocCount] = useState("");
    const [touchedDocCount, setTouchedDocCount] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [touchedStartDate, setTouchedStartDate] = useState(false);
    const [touchedEndDate, setTouchedEndDate] = useState(false);
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

    const isINNValid = validateInn(String(companyINN));
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

    const getINNErrorMessage = () => {
        if (touchedINN) {
            if (!companyINN) {
                return "Обязательное поле";
            }
            if (companyINN && !isINNValid) {
                return "Введите корректные данные";
            }
        }
        return "";
    };

    const getDocCountErrorMessage = () => {
        if (touchedDocCount) {
            if (!docCount) {
                return "Обязательное поле";
            }
            if (docCount && !isDocCountValid) {
                return "Введите корректные данные";
            }
        }
        return "";
    };

    const getDateErrorMessage = () => {
        if (touchedStartDate && !startDate) {
            return "Обязательное поле";
        }
        if (touchedEndDate && !endDate) {
            return "Обязательное поле";
        }
        if (startDate && !isStartDateValid) {
            return "Введите корректные данные";
        }
        if (endDate && !isEndDateValid) {
            return "Введите корректные данные";
        }
        if (startDate && endDate && !isDateRangeValid) {
            return "Дата начала должна быть меньше или равна дате окончания";
        }
        return "";
    };


    return (
        <form className="formContainer" onSubmit={handleSearch}>
            <div className="inputsContainer">
                <div className="inputContainer">
                    <div className="label-container">
                        <label className="label" htmlFor="inn">ИНН компании</label>
                        <span className={`required ${touchedINN && !companyINN ? 'touched-empty' : ''}`}>*</span>
                    </div>
                    <input
                        id="inn"
                        className={`input ${touchedINN && !isINNValid ? 'error' : ''}`}
                        type="text"
                        value={companyINN}
                        onChange={(e) => setCompanyINN(e.target.value)}
                        onBlur={() => setTouchedINN(true)}
                        placeholder="10 или 12 цифр"
                    />
                    {getINNErrorMessage() && (
                        <div className="error-text">{getINNErrorMessage()}</div>
                    )}
                </div>

                <div className="inputContainer">
                    <label className="label">Тональность</label>
                    <select className="custom-select" value={tonality} onChange={(e) => setTonality(e.target.value)}>
                        <option value="any">Любая</option>
                        <option value="positive">Позитивная</option>
                        <option value="negative">Негативная</option>
                    </select>
                </div>

                <div className="inputContainer">
                    <div className="label-container">
                        <label className="label" htmlFor="docCount">Количество документов в выдаче
                            <span className={`required ${touchedDocCount && !docCount ? 'touched-empty' : ''}`}>*</span>
                        </label>
                    </div>
                    <input
                        id="docCount"
                        className={`input ${touchedDocCount && !isDocCountValid ? 'error' : ''}`}
                        type="number"
                        value={docCount}
                        onChange={(e) => setDocCount(e.target.value)}
                        onBlur={() => setTouchedDocCount(true)}
                        placeholder="От 1 до 1000"
                    />
                    {getDocCountErrorMessage() && (
                        <div className="error-text">{getDocCountErrorMessage()}</div>
                    )}
                </div>
            </div>
            <div className="checkboxGroup">
                <Checkboxes checkboxStates={checkboxStates} handleCheckboxChange={handleCheckboxChange}/>
            </div>
            <div className="inputsContainer">
                <div className="inputContainer">
                    <div className="label-container">
                        <label className="label">Диапазон поиска</label>
                        <span className={`required ${
                            ((startDate === "" && touchedStartDate) ||
                                (endDate === "" && touchedEndDate)) ? 'touched-empty' : ''
                        }`}>*</span>
                    </div>

                    <div className="dateRange">
                        <input
                            type="text"
                            className={`dateInput ${touchedStartDate && !isStartDateValid ? 'error' : ''}`}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            placeholder="Дата начала"
                            onFocus={handleFocus}
                            onBlur={(e) => {
                                handleBlur(e);
                                setTouchedStartDate(true);
                            }}
                        />
                        <input
                            type="text"
                            className={`dateInput ${touchedEndDate && !isEndDateValid ? 'error' : ''}`}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            placeholder="Дата конца"
                            onFocus={handleFocus}
                            onBlur={(e) => {
                                handleBlur(e);
                                setTouchedEndDate(true);
                            }}
                        />
                    </div>
                    {getDateErrorMessage() && (
                        <div className="error-text">{getDateErrorMessage()}</div>
                    )}
                </div>
            </div>
            {/*<div className="inputsContainer">*/}
                <div className="button-container">
                <button className="button" type="submit" disabled={!isFormValid}>
                    Поиск
                </button>
                <p className="note">* Обязательные к заполнению поля</p>
            </div>
            {/*</div>*/}
        </form>
    );
};

export default SearchForm;
