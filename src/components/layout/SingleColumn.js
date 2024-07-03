import {Outlet} from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

function SingleColumn() {
    return (
        <div className="flex flex-col h-screen">
            <Header></Header>
            <Outlet/>
            <Footer id="footer"></Footer>
        </div>
    );
}

export default SingleColumn