import {Outlet} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import SimpleFooter from "../SimpleFooter";


function SingleWithFooter() {
    return (
        <div className="flex flex-col">
            <Outlet/>
            <ToastContainer/>
            <SimpleFooter id="footer"/>
        </div>
    );
}

export default SingleWithFooter