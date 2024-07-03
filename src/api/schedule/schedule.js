import Cookies from "js-cookie";

export const listSchedules = async ({signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/schedule/all`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        AbortSignal: signal
    })
    return response.json();
}


export const createSchedule = async ({name, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/schedule/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({name}),
        AbortSignal: signal
    })
    return response;
}