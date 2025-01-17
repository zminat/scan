import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Rates from "./pages/Rates";
import Faq from "./pages/Faq";
import "./App.css";

function App() {
    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/rates" element={<Rates />} />
                    <Route path="/faq" element={<Faq />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
