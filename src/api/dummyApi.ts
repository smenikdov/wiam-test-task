import axios from 'axios';
import type { IPlace } from '../types';

const API_URL = 'https://dummyjson.com';

export const fetchWorkPlaces = async () => {
    try {
        const response = await axios.get<IPlace[]>(`${API_URL}/products/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching work places:', error);
        return [];
    }
};

export const submitApplication = async (title: string) => {
    try {
        const response = await axios.post(`${API_URL}/products/add`, { title });
        return response.data;
    } catch (error) {
        console.error('Error submitting application:', error);
        return null;
    }
};
