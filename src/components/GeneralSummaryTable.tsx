import React, { useRef, useEffect, useState } from 'react';
import '../styles/GeneralSummaryTable.css';
import loading_icon from "../assets/img/spinner.png"

interface HistogramItem {
    date: string;
    value: number;
}

interface Histogram {
    histogramType: 'totalDocuments' | 'riskFactors';
    data: HistogramItem[];
}

interface SearchData {
    data: Histogram[];
}

interface CombinedData {
    period: string;
    total: number;
    risks: number;
}

interface GeneralSummaryTableProps {
    searchData?: SearchData;
    isLoading: boolean;
    isError: boolean;
}

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

export const combineDataByDate = (data: Histogram[]): CombinedData[] => {
    const combinedData: Record<string, CombinedData> = {};

    data.forEach((histogram) => {
        histogram.data.forEach((item) => {
            const dateKey = item.date.split('T')[0];
            if (!combinedData[dateKey]) {
                combinedData[dateKey] = { period: formatDate(dateKey), total: 0, risks: 0 };
            }
            if (histogram.histogramType === 'totalDocuments') {
                combinedData[dateKey].total += item.value;
            } else if (histogram.histogramType === 'riskFactors') {
                combinedData[dateKey].risks += item.value;
            }
        });
    });

    return Object.values(combinedData).sort((a, b) => new Date(a.period).getTime() - new Date(b.period).getTime());
};

const GeneralSummaryTable: React.FC<GeneralSummaryTableProps> = ({ searchData, isLoading, isError }) => {
    const [combinedData, setCombinedData] = useState<CombinedData[]>([]);
    const [totalDataCount, setTotalDataCount] = useState<number>(0);

    const tableWrapperRef = useRef<HTMLDivElement | null>(null);

    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    const checkScrollButtons = () => {
        if (tableWrapperRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = tableWrapperRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
        }
    };

    useEffect(() => {
        const wrapper = tableWrapperRef.current;
        if (wrapper) {
            wrapper.addEventListener('scroll', checkScrollButtons);
            checkScrollButtons();
        }
        return () => {
            if (wrapper) {
                wrapper.removeEventListener('scroll', checkScrollButtons);
            }
        };
    }, []);


    useEffect(() => {
        if (tableWrapperRef.current) {
            tableWrapperRef.current.scrollLeft = 0;
        }
    }, [combinedData]);

    useEffect(() => {
        if (searchData && !isError) {
            const totalDocuments = searchData.data.find((histogram) => histogram.histogramType === 'totalDocuments');
            if (totalDocuments) {
                const total = totalDocuments.data.reduce((acc, item) => acc + item.value, 0);
                setTotalDataCount(total);
            }
            const combined = combineDataByDate(searchData.data);
            setCombinedData(combined);
        }
    }, [searchData, isError]);

    const scrollTable = (direction: 'left' | 'right') => {
        const scrollAmount = direction === 'left' ? -300 : 300;
        if (tableWrapperRef.current) {
            tableWrapperRef.current.scrollLeft += scrollAmount;
        }
    };

    return (
        <div className="table-container">
            <h1 className="table-results-title">Общая сводка</h1>
            <p className="data-count">Найдено {totalDataCount} вариантов</p>
            <div className="table-and-arrows-container">
                {showLeftArrow && (
                    <button className="scroll-btn left" onClick={() => scrollTable('left')} />
                )}
                <div className="table-wrapper-main">
                    <div className="table-headers">
                        <div className="header-title">Период</div>
                        <div className="header-title">Всего</div>
                        <div className="header-title">Риски</div>
                    </div>
                    <div className="table-wrapper" ref={tableWrapperRef}>
                        {isLoading ? (
                            <div className="table-data-loading">
                                <img src={loading_icon} alt="Loading" className="loading-icon-general-summary" />
                                <p className="loading-sign">Загружаем данные...</p>
                            </div>
                        ) : isError ? (
                            <div className="table-data">
                                <p className="error-message">Ошибка сервера. Попробуйте чуть позже или проверьте свой тариф.</p>
                            </div>
                        ) : (
                            <div className="table-data">
                                {combinedData.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <div className="data-row">
                                            <div className="data-cell">{item.period}</div>
                                            <div className="data-cell">{item.total}</div>
                                            <div className="data-cell">{item.risks}</div>
                                        </div>
                                        {index < combinedData.length - 1 && <div className="table-divider"></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {showRightArrow && (
                    <button className="scroll-btn" onClick={() => scrollTable('right')} />
                )}
            </div>
        </div>
    );
};

export default GeneralSummaryTable;