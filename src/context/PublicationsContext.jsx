// src/context/PublicationContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { publicationService } from "../services/publicationService";
import { useAuth } from "../hooks/useAuth";

// PERBAIKAN 1: Hapus `export` dari baris ini
const PublicationContext = createContext(null);

// PERBAIKAN 2: Hapus `export` dari baris ini
const PublicationProvider = ({ children }) => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();
    
    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const data = await publicationService.getPublications();
                setPublications(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    const addPublication = async (newPublicationData) => {
        try {
            const addedPublication = await publicationService.addPublication(newPublicationData);
            setPublications((prev) => [addedPublication, ...prev]);
            setError(null);
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const editPublication = async (id, updatedData) => {
        try {
            const updatedFromServer = await publicationService.updatePublication(id, updatedData);
            // Update state dengan data terbaru dari server
            setPublications(prev => 
                prev.map(pub => pub.id === updatedFromServer.id ? updatedFromServer : pub)
            );
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    };
    
    const deletePublication = async (id) => {
        try {
            await publicationService.deletePublication(id);
            // Update state untuk menghapus publikasi dari tampilan
            setPublications(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            // Jika ingin menampilkan error ke user, bisa set state error di sini
            console.error(err.message);
            throw err; // Lempar error agar bisa ditangani di komponen jika perlu
        }
    };

    return (
        <PublicationContext.Provider
            value={{
                publications,
                loading,
                error,
                addPublication,
                editPublication,
                deletePublication, // <-- Sediakan fungsi baru ini ke provider
            }}
        >
            {children}
        </PublicationContext.Provider>
    );
};

export { PublicationContext, PublicationProvider };