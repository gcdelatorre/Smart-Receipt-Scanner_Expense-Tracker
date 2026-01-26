import { useAuth } from "@/contexts/AuthContext";
import { getSymbol } from "@/components/utils/getSymbol";
import api from "@/services/api";

export const useCurrency = () => {
    const { user, setUser } = useAuth();
    const currency = user?.settingsPreferences?.currency || 'USD';

    // Helper to format any number based on user preference
    const format = (amount) => {
        const symbol = getSymbol(currency);
        return `${symbol}${amount.toLocaleString()}`;
    };

    const changeCurrency = async (newCurrency) => {
        try {
            const res = await api.put('/user/settings-preferences', { currency: newCurrency });
            setUser(res.data.data);
        } catch (error) {
            console.error('Error changing currency:', error);
        }
    }

    return { format, currency, changeCurrency };
};