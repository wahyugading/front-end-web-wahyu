// src/context/AuthContext.jsx
import React, { createContext, useState } from "react";
import { authService } from "../services/authService";
const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
const [user, setUser] = useState(
JSON.parse(localStorage.getItem("user")) || null
);
const [token, setToken] = useState(localStorage.getItem("token") || null);
const [loading, setLoading] = useState(false);

const [error, setError] = useState(null);
const loginAction = async (email, password) => {
setLoading(true);
setError(null);
try {
const response = await authService.login(email, password);
setUser(response.user);
setToken(response.token);
localStorage.setItem("user", JSON.stringify(response.user));
localStorage.setItem("token", response.token);
return response;
} catch (error) {
console.error("Login error:", error);
setError(error.message);
throw error;
} finally {
setLoading(false);
}
};
    const logoutAction = async () => {
        try {
            // 1. Panggil API untuk hapus token di server
            await authService.logout();

            // 2. Hapus data dari state
            setUser(null);
            setToken(null);

            // 3. Hapus data dari Local Storage browser
            localStorage.removeItem("user");
            localStorage.removeItem("token");

        } catch (error) {
            console.error("Logout error:", error);
            // Anda bisa melempar error jika ingin menanganinya di komponen
            throw error;
        }
    };
const clearError = () => {
setError(null);
};
return (
<AuthContext.Provider value={{ user, token, loginAction, logoutAction,
loading, error, clearError }}>
{children}
</AuthContext.Provider>
);
};

export { AuthContext, AuthProvider };