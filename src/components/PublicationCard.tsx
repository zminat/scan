import { useEffect, useState} from "react";
import "../styles/PublicationCard.css";
import { DocumentAPI } from "./DocumentAPI.types.ts";
import PICTURE from "../assets/img/Result/publication.png"
import {format} from "date-fns";

function decodeHtml(html: string): string {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function cleanHtmlContent(htmlContent: string): string {
    const decodedHtml = decodeHtml(htmlContent);
    return decodedHtml.replace(/(<([^>]+)>)/gi, "");
}

const PublicationCard = (props: DocumentAPI) => {
    const [cleanContent, setCleanContent] = useState<string>("");

    useEffect(() => {
        setCleanContent(cleanHtmlContent(props.ok.content.markup)); // Используем правильную функцию
    }, [props.ok.content.markup]);

    const tagLabel = props.ok.attributes.isTechNews
        ? "Технические новости"
        : props.ok.attributes.isAnnouncement
            ? "Анонсы и события"
            : "Сводки новостей";

    return (
        <div className="publication-card">
            <div className="publication-info">
                <time className="publication-date">
                    {format(new Date(props.ok.issueDate), 'dd.MM.yyyy')}
                </time>
                <a href={props.ok.url} className="publication-source" target="_blank" rel="noopener noreferrer">
                    {props.ok.source.name}
                </a>
            </div>
            <h3 className="publication-title">{props.ok.title.text}</h3>
            <div className="tag">{tagLabel}</div>
            <img src={ PICTURE } alt="Publication" className="publication-picture" />
            <p className="publication-content">{cleanContent}</p>
            <div className="publication-footer">
                <a href={props.ok.url} className="read-original" target="_blank" rel="noopener noreferrer">
                    Читать в источнике
                </a>
                <span className="word-count">{props.ok.attributes.wordCount} слова</span>
            </div>
        </div>
    );
};

export default PublicationCard;
