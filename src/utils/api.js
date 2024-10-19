// frontend/src/utils/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'https://flashcardbackend-qmxy.onrender.com/api' });

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);

export const createFlashcard = async (data, token) => {
    try {
        const response = await API.post('/flashcards', data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        
        // Check if response is successful
        if (!response.status.toString().startsWith('2')) {
            throw new Error('Failed to create flashcard');
        }

        return response.data; // Return the created flashcard data
    } catch (error) {
        // Handle specific error cases for better messaging
        const message = error.response?.data?.message || 'An error occurred while creating the flashcard';
        throw new Error(message); // Throw a new error with the specific message
    }
};

export const getFlashcards = async (token) => {
    try {
        const response = await API.get('/flashcards', { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching flashcards');
    }
};

export const getFlashcardById = async (id, token) => {
    try {
        const response = await API.get(`/flashcards/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching flashcard');
    }
};

export const deleteFlashcard = async (id, token) => {
    try {
        const response = await API.delete(`/flashcards/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error deleting flashcard');
    }
};

export const updateFlashcard = async (flashcard, token) => {
    try {
        const response = await API.put(`/flashcards/${flashcard._id}`, flashcard, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating flashcard');
    }
};
