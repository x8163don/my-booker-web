import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";

export default function Empty() {
    return <div className="flex flex-col h-screen">
        <Outlet/>
        <ToastContainer/>
    </div>
}