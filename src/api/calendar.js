import Cookies from "js-cookie";


export const handleGoogleOAuth = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/google/oauth`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data
}

export const listCalendarSources = async ({signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/calendar/all`, {
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

export const changeTargetCalendar = async ({sourceID, CalendarItemID, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/calendar/change-target`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({source_id: sourceID, calendar_item_id: CalendarItemID}),
        AbortSignal: signal
    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data
}