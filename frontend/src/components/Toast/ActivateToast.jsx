import { toast } from "sonner";

export const activateToast = (type, message) => {
    switch (type) {
        case "success":
            toast.success(message, {
                position: "top-center",
            });
            break;
        case "error":
            toast.error(message, {
                position: "top-center",
            });
            break;
        case "info":
            toast(message, {
                position: "top-center",
            }); // default info
            break;
        default:
            toast(message, { position: "top-center" });
    }
};
