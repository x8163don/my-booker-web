import {toast} from "react-toastify";

export const TOAST_TYPES = {
    SUCCESS: "success",
    ERROR: "error",
    INFO: "info",
    WARNING: "warning"
}

export const sendToast = (type, message, options ={
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
}) => {
    switch (type) {
        case "success":
            toast.success(message, options);
            break;
        case "error":
            toast.error(message, options);
            break;
        case "info":
            toast.info(message, options);
            break;
        case "warning":
            toast.warning(message, options);
            break;
        default:
            toast(message, options);
            break;
    }
}