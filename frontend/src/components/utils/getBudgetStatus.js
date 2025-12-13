export const getBudgetStatus = (usedAmount, amount) => {

    let percent = Math.min((usedAmount / amount) * 100, 100);
    percent = Math.round(percent);

    if (percent < 50) {
        return {
            progressColor: "bg-green-500",
            progress: percent
        }
    }

    if (percent < 85) {
        return {
            progressColor: "bg-yellow-500",
            progress: percent,
        }
    }

    return {
        progressColor: "bg-rose-500",
        progress: percent,
    }
}