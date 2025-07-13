// src/components/PublicationListPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { usePublications } from '../hooks/usePublications';

export default function PublicationListPage() {
    // Ambil fungsi deletePublication dari context
    const { publications, loading, error, deletePublication } = usePublications();

    const handleDelete = async (id, title) => {
        // Tampilkan konfirmasi sebelum menghapus
        if (window.confirm(`Apakah Anda yakin ingin menghapus publikasi "${title}"?`)) {
            try {
                await deletePublication(id);
                alert('Publikasi berhasil dihapus!');
            } catch {
                alert('Gagal menghapus publikasi.');
            }
        }
    };

    if (loading) {
        return <div className="text-center mt-8">Memuat publikasi...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Daftar Publikasi BPS Provinsi DI Yogyakarta</h1>
            <p className="text-gray-500 mb-6">Sumber data publikasi terkini</p>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-sky-800 text-white">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">No</th>
                            <th className="w-2/5 text-left py-3 px-4 uppercase font-semibold text-sm">Judul</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Tanggal Rilis</th>
                            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Sampul</th>
                            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {publications.map((pub, index) => (
                            <tr key={pub.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">{pub.title}</td>
                                
                                <td className="py-3 px-4">{pub.releaseDate}</td>
                                <td className="py-3 px-4 flex justify-center">
                                    
                                    <img src={pub.coverUrl} alt={pub.title} className="h-20 w-16 object-cover rounded" />
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <div className="flex justify-center items-center space-x-2">
                                        {/* ✅ TAMBAHKAN TOMBOL/LINK INI */}
                                        <Link
                                            to={`/publications/detail/${pub.id}`}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                                        >
                                            Detail
                                        </Link>
                                        <Link
                                            to={`/publications/edit/${pub.id}`}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition-colors"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(pub.id, pub.title)}
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {publications.length === 0 && !loading && (
                <p className="text-center text-gray-500 mt-8">Belum ada data publikasi.</p>
            )}
        </div>
    );
}