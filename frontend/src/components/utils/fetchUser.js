export const fetchUserBudget = async () => {
    const res = await fetch("/api/user/693aec9c08d1f6edd4c2ad5f").then(r => r.json());

    return {
        overallBudget: res.data.overallBudget,
        categoryBudgets: res.data.categoryBudgets
    };
};

