import "../styles/Result.css";
import "../styles/Main.css";
import SearchingWomanImg from "../assets/img/SearchingWomanImg.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext.tsx";
import PublicationCard from "../components/PublicationCard.tsx";
import GeneralSummaryTable from "../components/GeneralSummaryTable.tsx";
import { DOCUMENTS, HISTOGRAMS, OBJECTSEARCH } from "../components/API.tsx";
import { DocumentAPI } from "../components/DocumentAPI.types.ts";


type HistogramType = "totalDocuments" | "riskFactors";

interface Histogram {
    histogramType: HistogramType;
    data: { date: string; value: number }[];
}

interface SearchData {
    data: Histogram[];
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
    const [visibleDocs, setVisibleDocs] = useState<number>(2);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/auth');
        }
    },
        [isLoggedIn, navigate]);

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
                const publicationIdsData: { items: { encodedId: string }[] } = await publicationIdsResponse.json();
                const publicationIds: string[] = [...new Set(publicationIdsData.items.map((item: {
                    encodedId: string
                }) => item.encodedId))];

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
            <div className="waiting-results-container">
                <div className="container">
                    <h1>Ищем. Скоро будут результаты</h1>
                    <p className="title-context">Поиск может занять некоторое время, просим сохранять терпение.</p>
                </div>
                <img src={SearchingWomanImg} alt="Ожидание выдачи результатов" />
            </div>
                <GeneralSummaryTable searchData={searchData} isLoading={isLoading} isError={isError} />
            <div className="publications-block">
                <h1 className="results-title">Список документов</h1>
                <div className="publications-container">
                    {!isLoading && !isError && documentsData.map((doc) => (
                            <PublicationCard key={doc.ok.id} {...doc} />
                    ))}
                </div>
                { isLoading && (
                    <p>Поиск может занять некоторое время, просим сохранять терпение.</p>
                )}
                { isError && (
                    <p>Публикации не найдены.</p>
                )}
                {!isLoading && !isError && !isAllDataLoaded &&
                <div className="show-more-container">
                    <button className="button show-more" onClick={loadMoreDocuments}>
                        Показать больше
                    </button>
                </div>
                }
            </div>
        </div>
    );
}

export default Results;