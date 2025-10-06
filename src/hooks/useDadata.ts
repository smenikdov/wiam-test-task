import { useState, useMemo } from 'react';
import { fetchNameSuggestions, fetchAddressSuggestions } from '../api/dadataApi';
import { debounce } from '../utils/helpers';
import type { AutoCompleteProps } from 'antd';

export const useNameSuggestions = (type: 'NAME' | 'SURNAME' | 'PATRONYMIC') => {
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

    const onSearch = useMemo(
        () =>
            debounce(async (query: string) => {
                const result = await fetchNameSuggestions(query, {
                    count: 5,
                    type: type,
                });
                const newSuggestions = result.map(s => ({ value: s.value }));
                setOptions(newSuggestions);
            }, 500),
        [type]
    );

    return { onSearch, options };
};

export const useAddressSuggestions = () => {
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

    const onSearch = useMemo(
        () =>
            debounce(async (query: string) => {
                const result = await fetchAddressSuggestions(query, { count: 5 });
                const newSuggestions = result.map(s => ({ value: s.value }));
                setOptions(newSuggestions);
            }, 500),
        []
    );

    return { onSearch, options };
};
