import axios from 'axios';

const DADATA_API_KEY = import.meta.env.VITE_DADATA_API_KEY;
const DADATA_FIO_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio';
const DADATA_ADDRESS_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

export interface DaDataSuggestion {
    value: string;
    unrestricted_value: string;
    data: {
        surname: string | null;
        name: string | null;
        patronymic: string | null;
        gender: string;
        qc: string | null;
    };
}

export interface DaDataAddressSuggestion {
    value: string;
    unrestricted_value: string;
    data: {
        city: string | null;
        street: string | null;
        house: string | null;
        qc: string | null;
    };
}

interface FetchNameSuggestionsOptions {
    count?: number;
    type?: 'NAME' | 'SURNAME' | 'PATRONYMIC';
}

export const fetchNameSuggestions = async (query: string, options: FetchNameSuggestionsOptions = {}) => {
    if (!query) {
        return [];
    }

    const {
        count = 10,
        type = 'NAME',
    } = options;

    try {
        const response = await axios.post<{ suggestions: DaDataSuggestion[] } >(
            DADATA_FIO_URL,
            { query, count, parts: [ type ] },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${DADATA_API_KEY}`,
                },
            }
        );
        return response.data.suggestions;
    } catch (error) {
        console.error('Error fetching DaData suggestions:', error);
        return [];
    }
};

interface FetchAddressSuggestionsOptions {
    count?: number;
}

export const fetchAddressSuggestions = async (query: string, options: FetchAddressSuggestionsOptions) => {
    if (!query) {
        return [];
    }

    const { count = 10 } = options;

    try {
        const response = await axios.post<{ suggestions: DaDataAddressSuggestion[] } >(
            DADATA_ADDRESS_URL,
            { query, count },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${DADATA_API_KEY}`,
                },
            }
        );
        return response.data.suggestions;
    } catch (error) {
        console.error('Error fetching DaData address suggestions:', error);
        return [];
    }
};
