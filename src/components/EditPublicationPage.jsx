// src/components/EditPublicationPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { usePublications } from '../hooks/usePublications';
import { uploadImageToCloudinary } from '../services/publicationService';

export default function EditPublicationPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { publications, editPublication } = usePublications();

    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [description, setDescription] = useState('');
    const [coverUrl, setCoverUrl] = useState('');
    const [coverFile, setCoverFile] = useState(null);

    useEffect(() => {
        const publicationToEdit = publications.find(p => p.id == id);
        if (publicationToEdit) {
            setTitle(publicationToEdit.title);
            // Gunakan snake_case untuk konsistensi dengan data dari API
            setReleaseDate(publicationToEdit.releaseDate);
            setDescription(publicationToEdit.description);
            setCoverUrl(publicationToEdit.coverUrl);
        }
    }, [id, publications]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let finalCoverUrl = coverUrl;
        if (coverFile) {
            try {
                finalCoverUrl = await uploadImageToCloudinary(coverFile);
            } catch (err) {
                alert('Gagal upload gambar baru: ' + err.message);
                return;
            }
        }

        // Pastikan objek yang dikirim ke backend menggunakan snake_case
        const updatedPublicationData = {
            title: title,
            releaseDate: releaseDate,
            description: description,
            coverUrl: finalCoverUrl,
        };

        try {
            await editPublication(id, updatedPublicationData);
            alert('Data berhasil diperbarui!');
            navigate('/publications');
        } catch (error) {
            alert('Gagal menyimpan perubahan: ' + error.message);
        }
    };
    
    // Tidak ada perubahan pada bagian JSX/return
    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Edit Publikasi</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                 {/* ... form fields ... */}
                 <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                    <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" required />
                </div>
                <div>
                    <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Rilis</label>
                    <input id="releaseDate" type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" required />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" required />
                </div>
                <div>
                    <label htmlFor="cover" className="block text-sm font-medium text-gray-700 mb-1">Sampul (Gambar)</label>
                    <input id="cover" type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0])} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                    {coverUrl && (
                        <div className="mt-4">
                            <p>Preview Sampul:</p>
                            <img src={coverFile ? URL.createObjectURL(coverFile) : coverUrl} alt="Preview Sampul" className="h-48 w-auto object-cover rounded shadow-md" />
                        </div>
                    )}
                </div>
                <div className="flex justify-between pt-4">
                    <button type="button" onClick={() => navigate('/publications')} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg">Batal</button>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">Simpan Perubahan</button>
                </div>
            </form>
        </div>
    );
}