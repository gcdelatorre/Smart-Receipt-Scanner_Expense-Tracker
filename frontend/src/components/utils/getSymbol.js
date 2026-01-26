export const getSymbol = (currency) => {
    switch (currency) {
        case "USD":
            return "$";

        case "EUR":
            return "€";

        case "GBP":
            return "£";

        case "JPY":
            return "¥";

        case "CAD":
            return "CA$";

        case "AUD":
            return "AU$";

        case "PHP":
            return "₱";

        case "INR":
            return "₹";

        case "CNY":
            return "¥";

        case "BRL":
            return "R$";

        case "SGD":
            return "S$";

        default:
            return "$";
    }
};
