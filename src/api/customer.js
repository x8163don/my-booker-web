import Cookies from "js-cookie";

export const me = async ({signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/customer/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        AbortSignal: signal
    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

export const createCustomer = async ({signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/customer/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        AbortSignal: signal
    })

    return response.ok;
}