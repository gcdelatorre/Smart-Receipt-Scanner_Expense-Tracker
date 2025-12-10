export const fetchTransactions = async () => {
    const res1 = await fetch("/api/income").then(r => r.json());
    const res2 = await fetch("/api/expenses").then(r => r.json());
    return [...res1.data, ...res2.data];
};

