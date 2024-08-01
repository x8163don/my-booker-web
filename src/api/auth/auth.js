import Cookies from "js-cookie";

export const login = async (email, thirtyPartyToken, loginType) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            third_party_token: thirtyPartyToken,
            login_type: loginType,
        })
    })
    return response;
}

export const check = async (token) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/check`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
    })

    return response;
}