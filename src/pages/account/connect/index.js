import {createPortal} from "react-dom";
import {FcGoogle} from "react-icons/fc";
import {handleGoogleOAuth} from "../../../api/calendar";
import {sendToast, TOAST_TYPES} from "../../../utils/toast";
import {useNavigate} from "react-router-dom";

export default function Connect() {
    const navigate = useNavigate();

    const handelGoogleConnect = async () => {
        try {
            const data = await handleGoogleOAuth();
            window.location.href = data.url
        } catch (error) {
            sendToast(TOAST_TYPES.ERROR, error.message);
        }
    };

    return createPortal(<div className="modal modal-open" role="dialog">
            <div className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => navigate(-1)}
                >✕
                </button>

                <div className="flex justify-center">
                    <button className="btn btn-lg bg-white text-gray-800 hover:text-white"
                            onClick={handelGoogleConnect}
                    >
                        <FcGoogle className="w-5 h-5"></FcGoogle>
                        <span>連結到 Google 行事曆</span>
                    </button>
                </div>
            </div>
        </div>
        , document.getElementById('modal-root'))
}