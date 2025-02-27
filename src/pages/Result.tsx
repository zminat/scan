import "../styles/Main.css";
import SearchingWomanImg from "../assets/img/SearchingWomanImg.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext.tsx";
import PublicationCard from "../components/PublicationCard.tsx";
import GeneralSummaryTable from "../components/GeneralSummaryTable.tsx";
import { DOCUMENTS, HISTOGRAMS, OBJECTSEARCH } from "../components/API.tsx";

type HistogramType = "totalDocuments" | "riskFactors";

interface Histogram {
    histogramType: HistogramType;
    data: { date: string; value: number }[];
}

interface SearchData {
    data: Histogram[];
}

interface DocumentAPI {
    id: string;
    title: string;
    content: string;
    source: string;
    date: string;
    url: string;
    sourceName: string;
    picture: string;
    wordCount: number;
}

function Results() {
    const location = useLocation();
    const searchParams = location.state?.searchParams;
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchData, setSearchData] = useState<SearchData | undefined>(undefined);
    const [documentsData, setDocumentsData] = useState<DocumentAPI[]>([]);
    const [isError, setIsError] = useState<boolean>(false);
    const [isAllDataLoaded, setIsAllDataLoaded] = useState<boolean>(false);
    const [visibleDocs, setVisibleDocs] = useState<number>(10);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/auth');
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!searchParams) {
                console.error('Search parameters are missing.');
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setIsError(false);

            try {
                // const testSearchParams = {
                //     "intervalType": "day",
                //     "histogramTypes": [
                //         "totalDocuments"
                //     ],
                //     "issueDateInterval": {
                //         "startDate": "2018-02-09T08:24:17.264Z",
                //         "endDate": "2025-02-09T08:24:17.264Z"
                //     },
                //     "searchContext": {
                //         "targetSearchEntitiesContext": {
                //             "targetSearchEntities": [
                //                 {
                //                     "type": "company",
                //                     "sparkId": null,
                //                     "entityId": null,
                //                     "inn": 7710137066,
                //                     "maxFullness": true,
                //                     "inBusinessNews": null
                //                 }
                //             ],
                //             "onlyMainRole": true,
                //             "tonality": "any",
                //             "onlyWithRiskFactors": false, // Установите на false, если не хотите фильтровать по рисковым факторам
                //             "riskFactors": { // Убедитесь, что это поле пустое, если onlyWithRiskFactors: false
                //                 "and": [],
                //                 "or": [],
                //                 "not": []
                //             },
                //             "themes": {
                //                 "and": [],
                //                 "or": [],
                //                 "not": []
                //             }
                //         },
                //         "themesFilter": {
                //             "and": [],
                //             "or": [],
                //             "not": []
                //         }
                //     },
                //     "searchArea": {
                //         "includedSources": [
                //             0 // Или уберите, если не нужно
                //         ],
                //         "excludedSources": [
                //             0 // Или уберите, если не нужно
                //         ],
                //         "includedSourceGroups": [
                //             0 // Или уберите, если не нужно
                //         ],
                //         "excludedSourceGroups": [
                //             0 // Или уберите, если не нужно
                //         ],
                //         "includedDistributionMethods": [
                //             0 // Убедитесь, что используете только один из фильтров
                //         ],
                //         "excludedDistributionMethods": [] // Оставьте пустым или уберите
                //     },
                //     "attributeFilters": {
                //         "excludeTechNews": true,
                //         "excludeAnnouncements": true,
                //         "excludeDigests": true
                //     },
                //     "similarMode": "duplicates"
                // }

                const histogramResponse = await fetch(HISTOGRAMS, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                    body: JSON.stringify(searchParams),
                    credentials: 'omit',
                });

                if (!histogramResponse.ok) throw new Error(`Ошибка: ${histogramResponse.status}`);
                const histogramData: SearchData = await histogramResponse.json();

                const publicationIdsResponse = await fetch(OBJECTSEARCH, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                    body: JSON.stringify(searchParams),
                    credentials: 'omit',
                });

                if (!publicationIdsResponse.ok) throw new Error(`Ошибка: ${publicationIdsResponse.status}`);
                const publicationIdsData = await publicationIdsResponse.json();
                const publicationIds: string[] = publicationIdsData.items.map((item: { encodedId: string }) => item.encodedId);

                console.log("Количество публикаций:", publicationIds.length);

                const fetchDocuments = async (ids: string[]): Promise<DocumentAPI[]> => {
                    const documentsResponse = await fetch(DOCUMENTS, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        },
                        body: JSON.stringify({ ids }),
                        credentials: 'omit',
                    });

                    if (!documentsResponse.ok) throw new Error(`Ошибка: ${documentsResponse.status}`);
                    return await documentsResponse.json();
                };

                const initialDocuments = await fetchDocuments(publicationIds.slice(0, 10));
                setSearchData(histogramData);
                setDocumentsData(initialDocuments);
                setIsAllDataLoaded(publicationIds.length <= 10);
            } catch (error) {
                console.error("Ошибка при выполнении запроса:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchParams]);

    const loadMoreDocuments = async () => {
        if (!searchParams) return;

        try {
            const publicationIdsResponse = await fetch(OBJECTSEARCH, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify(searchParams),
                credentials: 'omit',
            });

            if (!publicationIdsResponse.ok) return;
            const publicationIdsData = await publicationIdsResponse.json();
            const publicationIds: string[] = publicationIdsData.items.map((item: { encodedId: string }) => item.encodedId);

            const nextBatch = publicationIds.slice(visibleDocs, visibleDocs + 10);
            if (nextBatch.length === 0) {
                setIsAllDataLoaded(true);
                return;
            }

            const moreDocumentsResponse = await fetch(DOCUMENTS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({ ids: nextBatch }),
                credentials: 'omit',
            });

            if (!moreDocumentsResponse.ok) return;
            const moreDocumentsData: DocumentAPI[] = await moreDocumentsResponse.json();
            setDocumentsData((prevData) => [...prevData, ...moreDocumentsData]);
            setVisibleDocs(visibleDocs + 10);
            setIsAllDataLoaded(visibleDocs + 10 >= publicationIds.length);
        } catch (error) {
            console.error("Ошибка при загрузке дополнительных документов:", error);
        }
    };

    return (
        <div>
            <div className="search">
                <div className="container">
                    <h1>Ищем. Скоро будут результаты</h1>
                    <p className="title-context">Поиск может занять некоторое время, просим сохранять терпение.</p>
                </div>
                <img src={SearchingWomanImg} alt="Ожидание выдачи результатов" />
            </div>
                <GeneralSummaryTable searchData={searchData} isLoading={isLoading} isError={isError} />
            <div className="main-container">
                <h1 className="results-title">Список документов</h1>
                {!isLoading && !isError && documentsData.map((doc) => (
                    <PublicationCard key={doc.id} {...doc} />
                ))}
                { isLoading && (
                    <p>Поиск может занять некоторое время, просим сохранять терпение.</p>
                )}
                { isError && (
                    <p className="error-500-message">Ошибка сервера. Попробуйте чуть позже или проверьте свой тариф.</p>
                )}
                {!isAllDataLoaded && <button className="request-btn" onClick={loadMoreDocuments}>Показать больше</button>}
            </div>
        </div>
    );
}

export default Results;