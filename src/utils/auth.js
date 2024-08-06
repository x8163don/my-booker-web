import {check} from "../api/auth/auth";
import Cookies from "js-cookie";
import {redirect} from "react-router-dom";

export const checkAuthTokenLoader = async () => {
    const resp = await check(Cookies.get('token'))

    if (resp.ok) {
        return true
    } else {
        Cookies.remove('token')
        return redirect('/login')
    }
}
