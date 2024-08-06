import i18n from "i18next";
export const login = async (email, thirtyPartyToken, loginType) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Language': i18n.language
        },
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