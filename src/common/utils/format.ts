/**
 * @Author: egafrandika
 * @Date: 2025-03-07 10:00:45
 * @LastEditors: egafrandika
 * @LastEditTime: 2025-03-13 15:43:31
 */

export const numberWithComma = ({ text }: { text?: string | number }): string => {
    if (text === undefined || text === null) return '';
    const value = Number(text);
    return isNaN(value) ? String(text) : value.toLocaleString('id-ID');
};

export const numberWithCommaIdr = ({ text }: { text?: string | number }): string => {
    if (text === undefined || text === null) return '';
    const value = Number(text);
    return isNaN(value)
        ? String(text)
        : value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
};

export const formatDateTime = ({ text }: { text: string }) => {
    if (!text) return '';
    const date = new Date(text);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
};

export const formatAmountIdr = (value) => {
    if (typeof value !== 'number') return value;
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(value);
};
