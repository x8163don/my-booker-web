import Cookies from "js-cookie";

export const getTimeZones = async ({signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/tzs`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        AbortSignal: signal

    })
    return response.json();
}