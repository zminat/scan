import "../styles/Footer.css";
import footerIconUrl from "../assets/img/eqw 1.svg";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-icon">
                <img src={footerIconUrl} alt="Footer Icon" />
            </div>
            <div className="footer-text">
                <span>г. Москва, Цветной б-р, 40</span>
                <span>+7 495 771 21 11</span>
                <span>info@skan.ru</span>
                <p>Copyright. 2022</p>
            </div>
        </footer>
    );
}

export default Footer;
