import { useAuth } from "@/contexts/AuthContext";
import { getSymbol } from "@/components/utils/getSymbol";
import api from "@/services/api";

export const usePreferences = () => {
    const { user, setUser } = useAuth();

    // Raw values from backend
    const rawCurrency = user?.settingsPreferences?.currency;
    const rawDateFormat = user?.settingsPreferences?.dateFormat;
    const rawNumberFormat = user?.settingsPreferences?.numberFormat;

    // Normalize Date Format
    let dateFormat = 'mdy'; // Default
    if (rawDateFormat) {
        if (rawDateFormat === 'MM/DD/YYYY') dateFormat = 'mdy';
        else if (rawDateFormat === 'DD/MM/YYYY') dateFormat = 'dmy';
        else if (rawDateFormat === 'YYYY/MM/DD') dateFormat = 'ymd';
        else dateFormat = rawDateFormat; // Assume it's already correct if not one of the verbose ones
    }

    // Normalize Number Format
    let numberFormat = 'standard'; // Default
    if (rawNumberFormat) {
        const lower = rawNumberFormat.toLowerCase();
        if (lower === 'standard' || lower === 'decimal point system') numberFormat = 'standard';
        else if (lower === 'continental') numberFormat = 'continental';
        else numberFormat = rawNumberFormat;
    }

    // Currency doesn't usually need normalization but good to fallback
    const currency = rawCurrency || 'USD';


    // Helper to get locale from number format preference
    const getLocale = () => {
        return numberFormat === 'continental' ? 'de-DE' : 'en-US';
    };

    // Format Number: 1,234.56 vs 1.234,56
    const formatNumber = (value) => {
        if (value === undefined || value === null) return '';
        const num = Number(value);
        if (isNaN(num)) return value;
        return new Intl.NumberFormat(getLocale(), {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(num);
    };

    // Format Currency: $1,234.56
    const formatCurrency = (amount) => {
        if (amount === undefined || amount === null) return '';

        // We want to combine the user's currency symbol with their number formatting preference.
        // Standard Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }) 
        // puts the symbol in a specific place and uses standard separators.
        // To respect the "numberFormat" preference (separators), we might need to mix locales.
        // E.g. User wants USD but Continental separators: "$ 1.234,56" or "1.234,56 $"

        // Strategy: Get the formatted number using the preferred locale (sep), then prepend/append symbol.
        // Current existing app behavior: `${symbol}${amount.toLocaleString()}`
        // We will improve this to use the preferred separators.

        const symbol = getSymbol(currency);
        const formattedNumber = formatNumber(amount);

        // Simple append for now as per existing app style
        return `${symbol}${formattedNumber}`;
    };

    // Format Date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;

        // Intl.DateTimeFormat is robust
        // mdy: MM/DD/YYYY
        // dmy: DD/MM/YYYY
        // ymd: YYYY/MM/DD

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        switch (dateFormat) {
            case 'dmy':
                return `${day}/${month}/${year}`;
            case 'ymd':
                return `${year}/${month}/${day}`;
            case 'mdy':
            default:
                return `${month}/${day}/${year}`;
        }
    };

    const updatePreferences = async (updates) => {
        try {
            // updates is { currency?: '...', dateFormat?: '...', numberFormat?: '...' }
            const res = await api.put('/user/settings-preferences', updates);
            setUser(res.data.data);
            return res.data;
        } catch (error) {
            console.error('Error updating preferences:', error);
            throw error;
        }   
    };

    const changeCurrency = (newCurrency) => updatePreferences({ currency: newCurrency });

    return {
        // State
        currency,
        dateFormat,
        numberFormat,

        // Actions
        updatePreferences,
        changeCurrency, // Keep for backward compat if needed, or migration

        // Formatters
        formatNumber,
        formatCurrency,
        formatDate
    };
};
