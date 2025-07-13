// src/components/PublicationDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { publicationService } from '../services/publicationService';

export default function PublicationDetailPage() {
    const { id } = useParams(); // Ambil ID dari URL
    const navigate = useNavigate(); // Untuk tombol kembali
    
    const [publication, setPublication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublication = async () => {
            try {
                setLoading(true);
                const data = await publicationService.getPublicationById(id);
                setPublication(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPublication();
    }, [id]); // Jalankan effect ini setiap kali ID di URL berubah

    if (loading) {
        return <div className="text-center mt-10">Memuat detail publikasi...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
    }

    if (!publication) {
        return <div className="text-center mt-10">Data publikasi tidak ditemukan.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <img src={publication.coverUrl} alt={publication.title} className="w-full h-auto object-cover rounded-lg shadow-md" />
                </div>
                <div className="md:col-span-2">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{publication.title}</h1>
                    <p className="text-md text-gray-500 mb-6">Tanggal Rilis: {publication.releaseDate}</p>
                    <div className="prose max-w-none">
                        <p>{publication.description}</p>
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center">
                <button
                    onClick={() => navigate('/publications')}
                    className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                    Kembali ke Daftar Publikasi
                </button>
            </div>
        </div>
    );
}