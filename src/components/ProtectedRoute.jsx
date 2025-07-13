// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Anda akan memerlukan AuthContext dan useAuth

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth(); // Mendapatkan data user dari AuthContext [cite: 663]

    // Jika tidak ada data user (belum login), arahkan ke halaman /login [cite: 665, 667]
    if (!user) {
        return <Navigate to="/login" replace />; // [cite: 667]
    }

    // Jika sudah login, tampilkan komponen yang diminta (children) [cite: 668]
    return children;
};

export default ProtectedRoute;