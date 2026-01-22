import { toast } from "sonner";

export const activateToast = (type, message) => {
    switch (type) {
        case "success":
            toast.success(message, {
                position: "bottom-center",
            });
            break;
        case "error":
            toast.error(message, {
                position: "bottom-center",
            });
            break;
        case "info":
            toast(message, {
                position: "bottom-center",
            }); // default info
            break;
        default:
            toast(message, { position: "bottom-center" });
    }
};
