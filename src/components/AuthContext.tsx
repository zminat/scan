import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    checkAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkAuthStatus = () => {
        const accessToken = localStorage.getItem("accessToken");
        const tokenExpire = localStorage.getItem("tokenExpire");
        const now = new Date();
        if (!accessToken || !tokenExpire || new Date(tokenExpire) <= now) {
            console.log("Token expired or not found.");
            setIsLoggedIn(false);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("tokenExpire");
        } else {
            setIsLoggedIn(true);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
