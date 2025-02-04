import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import LoginPage from "./components/LoginPage.tsx";
import "./App.css";


function App() {
    return (
        <>
            <Header />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/auth" element={<LoginPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
