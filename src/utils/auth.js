import {check} from "../api/auth/auth";
import {redirect} from "react-router-dom";

export const checkAuthTokenLoader = async () => {
    const resp = await check()

    if (resp.ok) {
        return null
    } else {
        return redirect('/login')
    }

    return null
}
