import { useEffect, useState } from 'react';
import '../styles/PublicationCard.css';

interface PublicationCardProps {
    content: string;
    date: string;
    url: string;
    sourceName: string;
    title: string;
    picture: string;
    wordCount: number;
    isTechNews?: boolean;
    isAnnouncement?: boolean;
}

function decodeHtml(html: string): string {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function cleanHtmlContent(htmlContent: string): string {
    const decodedHtml = decodeHtml(htmlContent);
    return decodedHtml.replace(/(<([^>]+)>)/gi, "");
}

const PublicationCard: React.FC<PublicationCardProps> = (props) => {
    const [cleanContent, setCleanContent] = useState<string>('');

    useEffect(() => {
        setCleanContent(cleanHtmlContent(props.content));
    }, [props.content]);

    const tagLabel = props.isTechNews ? "Технические новости" : props.isAnnouncement ? "Анонсы и события" : "Сводки новостей";

    return (
        <div className="publication-card">
            <div className="publication-info">
                <span className="publication-date">{props.date}</span>
                <a href={props.url} className="publication-source" target="_blank" rel="noopener noreferrer">{props.sourceName}</a>
            </div>
            <h3 className="publication-title">{props.title}</h3>
            <div className="tag">{tagLabel}</div>
            <img src={props.picture} alt="Publication" className="publication-picture" />
            <p className="publication-content">{cleanContent}</p>
            <div className="publication-footer">
                <a href={props.url} className="button read-more" target="_blank" rel="noopener noreferrer">Читать в источнике</a>
                <span className="word-count">{props.wordCount} слова</span>
            </div>
        </div>
    );
};

export default PublicationCard;
