import Cookies from "js-cookie";

export const listActivities = async ({signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/activity/all`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        AbortSignal: signal
    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data
}


export const getActivity = async ({id, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/activity/${id}/detail`, {
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


export const createActivity = async ({title, duration, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/activity/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({
            activity_type: 'OneOnOne',
            name: title,
            duration,
        }),
        AbortSignal: signal
    })

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

export const switchActivity = async ({id, isOpen, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/activity/switch`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({
            activity_id: id,
            is_open: isOpen,
        }),
        AbortSignal: signal
    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data
}

export const setDescription = async ({id, description, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/activity/set-description`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({
            activity_id: id,
            description
        }),
        AbortSignal: signal
    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data
}

export const setLocation = async ({id, locationType,locationDetail, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/activity/set-location`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({
            activity_id: id,
            location_type: locationType,
            location_detail: locationDetail
        }),
        AbortSignal: signal
    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data
}

export const setAvailability = async ({id, scheduleID, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/activity/set-availability`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({
            activity_id: id,
            schedule_id: scheduleID
        }),
        AbortSignal: signal
    })
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data
}

export const setDateRange = async ({id, dateRangeType, dateRangeDetail, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/activity/set-date-range`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({
            activity_id: id,
            date_range_type: dateRangeType,
            date_range_detail: dateRangeDetail
        }),
        AbortSignal: signal
    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data
}

export const setBuffer = async ({id, before, after, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/activity/set-buffer`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({
            activity_id: id,
            before: before,
            after: after
        }),
        AbortSignal: signal
    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
    return data
}

export const setMinimumScheduleBefore = async ({id, minimumScheduleBefore, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/activity/set-minimum-schedule-before`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({
            activity_id: id,
            minimum_schedule_before: minimumScheduleBefore
        }),
        AbortSignal: signal
    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data
}


export const setStartTimeIncrement = async ({id, startTimeIncrement, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/activity/set-start-time-increment`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({
            activity_id: id,
            start_time_increment: startTimeIncrement
        }),
        AbortSignal: signal
    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data
}

export const deleteActivity = async ({id, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/activity/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({ "activity_id": id
        }),
        AbortSignal: signal
    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data
}