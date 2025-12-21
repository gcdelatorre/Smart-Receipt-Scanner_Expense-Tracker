// utils/categories.js

export const incomeCategories = [
    "Salary",
    "Business",
    "Freelance",
    "Allowance",
    "Investments",
    "Gifts",
    "Bonus",
    "Other",
];

export const expenseCategories = [
    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Health",
    "Education",
    "Shopping",
    "Travel",
    "Miscellaneous",
    "Other",
];

// budgets usually track expenses, so reuse expense categories
export const budgetCategories = expenseCategories;
