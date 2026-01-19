import api from '../../services/api';

export const fetchUserBudget = async () => {
    const res = await api.get("/user/me");

    return {
        overallBudget: res.data.data.overallBudget,
        categoryBudgets: res.data.data.categoryBudgets
    };
};

