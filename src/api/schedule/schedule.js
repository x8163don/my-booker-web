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

export const setTimeZone = async ({id, timezone, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/schedule/set-time-zone`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({
            "schedule_id": id,
            "time_zone": timezone
        }),
        AbortSignal: signal
    })
    return response;
}

export const setAvailableTime = async ({id, availableTimes, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/schedule/set-available-time`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({
            "schedule_id": id,
            "available_times": availableTimes
        }),
        AbortSignal: signal
    })
    return response;
}

export const deleteSchedule = async ({id, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/schedule/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({
            "schedule_id": id
        }),
        AbortSignal: signal
    })
    return response;
}