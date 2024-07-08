import {useEffect} from "react";
import {createPortal} from "react-dom";
import {ALERT_TYPES} from "../../utils/alert";
import {ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon} from "@heroicons/react/24/outline";
import {CheckCircleIcon} from "@heroicons/react/24/outline";

export default function Alert({type, message, onClose, duration}) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return createPortal(
        <div className={"alert w-fit shadow-lg fixed top-4 right-4 " + 'alert-' + type + ''}
             style={{"zIndex": 1000}}
        >
            {type === ALERT_TYPES.INFO && <InformationCircleIcon className="w-6 h-6"/>}
            {type === ALERT_TYPES.SUCCESS && <CheckCircleIcon className="w-6 h-6"/>}
            {type === ALERT_TYPES.WARNING && <ExclamationTriangleIcon className="w-6 h-6"/>}
            {type === ALERT_TYPES.ERROR && <XCircleIcon className="w-6 h-6"/>}
            <span>{message}</span>
        </div>,
        document.getElementById('alert-root')
    );
}