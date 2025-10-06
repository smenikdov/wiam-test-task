export const formatCurrency = (value: number | undefined) => {
    if (value === undefined) {
        return '';
    }

    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};