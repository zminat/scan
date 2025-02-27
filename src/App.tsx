import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import LoginPage from "./pages/LoginPage.tsx";
import Search from "./pages/Search.tsx";
import Results from "./pages/Result.tsx";


function App() {
    return (
        <>
            <Header />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/auth" element={<LoginPage />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/results" element={<Results />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
