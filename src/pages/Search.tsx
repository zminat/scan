import "../styles/Search.css";
import DocumentImg from "../assets/img/search/Document.svg";
import FoldersImg from "../assets/img/search/Folders.svg";
import SearchingManImg from "../assets/img/search/SearchingManImg.svg";
import SearchForm from "../components/SearchForm.tsx";


function Search() {
    return (
        <div>
            <div className="search">
                <div className="title-container">
                    <h1>Найдите необходимые данные в пару кликов.</h1>
                    <p className="title-context">Задайте параметры поиска. <br/>
                        Чем больше заполните, тем точнее поиск</p>
                    <SearchForm />
                </div>
                <div className="search-images">
                    <div className="documents">
                        <img className="document" src={DocumentImg} alt="Документ" />
                        <img className="folders" src={FoldersImg} alt="Папки" />
                    </div>
                    <img className="searching-man" src={SearchingManImg} alt="Мужчина с лупой" />
                </div>
            </div>
        </div>
    );
}

export default Search;
