import {Outlet} from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";


function SingleColumn() {
    return (
        <div className="flex flex-col h-screen">
            <Header></Header>
            <Outlet/>
            <ToastContainer/>
            <Footer id="footer"></Footer>
        </div>
    );
}

export default SingleColumn