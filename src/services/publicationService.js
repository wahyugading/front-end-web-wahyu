// src/services/publicationService.js
import apiClient from '../api/axios';

export const publicationService = {

    // ✅ TAMBAHKAN FUNGSI INI YANG HILANG
    async getPublications() {
        try {
            const response = await apiClient.get('/publikasi');
            return response.data;
        } catch (error) {
            throw new Error('Gagal mengambil data publikasi: ' + (error.response?.data?.message || 'Terjadi kesalahan'));
        }
    },
    
    async addPublication(newPublication) {
        try {
            const response = await apiClient.post('/publikasi', newPublication);
            return response.data;
        } catch (error) {
            throw new Error('Gagal menambahkan data: ' + (error.response?.data?.message || 'Terjadi kesalahan'));
        }
    },

    async getPublicationById(id) {
        try {
            const response = await apiClient.get(`/publikasi/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Gagal mengambil detail data: ' + (error.response?.data?.message || 'Terjadi kesalahan'));
        }
    },

    async updatePublication(id, updatedData) {
        try {
            const response = await apiClient.post(`/publikasi/update/${id}`, updatedData);
            return response.data;
        } catch (error) {
            throw new Error('Gagal update data: ' + (error.response?.data?.message || 'Terjadi kesalahan'));
        }
    },

    async deletePublication(id) {
        try {
            const response = await apiClient.delete(`/publikasi/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Gagal menghapus data: ' + (error.response?.data?.message || 'Terjadi kesalahan'));
        }
    }
};

export async function uploadImageToCloudinary(file) {
    const formData = new FormData();
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    if (!uploadPreset || !cloudName) {
        throw new Error('Konfigurasi Cloudinary (VITE_CLOUDINARY_UPLOAD_PRESET atau VITE_CLOUDINARY_CLOUD_NAME) tidak ditemukan di file .env');
    }

    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) throw new Error('Upload gagal');
        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        throw new Error('Gagal upload ke Cloudinary: ' + error.message);
    }
}