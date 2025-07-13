// src/hooks/usePublications.js
import { useContext } from 'react';
import { PublicationContext } from '../context/PublicationsContext'; // Sesuaikan path

// Hook ini menyederhanakan cara komponen mendapatkan akses ke context
export function usePublications() {
    const context = useContext(PublicationContext);
    
    if (!context) {
        throw new Error('usePublications harus digunakan di dalam PublicationProvider');
    }
    
    return context;
}