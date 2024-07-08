import {render, unmountComponentAtNode} from "react-dom";
import Alert from "../components/ui/Alert";
import {createRoot} from "react-dom/client";

export const ALERT_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
}

function showAlert(type, message, duration = 8000) {
    const alertRoot = document.getElementById('alert-root');

    const handleClose = () => {
        root.unmount();
    };

    const root = createRoot(alertRoot);

    root.render(<Alert type={type} message={message} onClose={handleClose} duration={duration}/>);
}

export default showAlert;