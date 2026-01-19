import api from '../../services/api';

export const fetchTransactions = async () => {
    const res1 = await api.get("/income");
    const res2 = await api.get("/expenses");
    return [...res1.data.data, ...res2.data.data];
};

