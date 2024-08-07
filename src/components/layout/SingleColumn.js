import {Outlet} from "react-router-dom";
import Footer from "../Footer";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";


function SingleColumn() {
    return (
        <div className="flex flex-col h-screen">
            <Outlet/>
            <ToastContainer/>
            <Footer id="footer"></Footer>
        </div>
    );
}

export default SingleColumn