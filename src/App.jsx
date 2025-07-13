import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import semua komponen halaman Anda
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import PublicationListPage from "./components/PublicationListPage";
import AddPublicationPage from "./components/AddPublicationPage";
import EditPublicationPage from "./components/EditPublicationPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicationDetailPage from "./components/PublicationDetailPage";

export default function App() {
    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <Navbar />
            <main className="p-4 sm:p-6 lg:p-8">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />

                    <Route
                        path="/publications"
                        element={
                            <ProtectedRoute>
                                <PublicationListPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/publications/add"
                        element={
                            <ProtectedRoute>
                                <AddPublicationPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/publications/edit/:id"
                        element={
                            <ProtectedRoute>
                                <EditPublicationPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/publications/detail/:id"
                        element={
                            <ProtectedRoute>
                                <PublicationDetailPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Rute Redirect: mengarahkan URL default ke halaman utama */}
                    <Route path="/" element={<Navigate to="/publications" replace />} />
                    <Route path="*" element={<Navigate to="/publications" replace />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}