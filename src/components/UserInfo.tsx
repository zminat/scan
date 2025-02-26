import avatar from "../assets/img/users/Alex.svg";
import { useAuth } from "./AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";


const UserInfo: React.FC = () => {
    const { setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tokenExpire");
        setIsLoggedIn(false);
        navigate("/auth");
    };

    return (
        <div className="user-info">
            <div className="user">
                <span>Алексей А.</span>
                <br />
                <a className="logout-button" onClick={handleLogout}>
                    Выйти
                </a>
            </div>
            <img className="avatar" src={avatar} alt="Alex" />
        </div>
    );
};

export default UserInfo;
