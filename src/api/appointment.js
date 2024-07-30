import Cookies from "js-cookie";

export const createAppointment = async ({
                                            urlName,
                                            bookingKey,
                                            name,
                                            email,
                                            timezone,
                                            phoneNumber,
                                            startTime,
                                            signal
                                        }) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/appointment/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({
            url_name: urlName,
            booking_key: bookingKey,
            time_zone: timezone,
            name,
            email,
            phone_number: phoneNumber,
            start_time: startTime
        }),
        AbortSignal: signal
    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

export const cancelAppointment = async ({key, cancelCode, reason}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/appointment/cancel/${key}/${cancelCode}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({
            reason
        }),
    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data
}

export const cancelAppointmentByHost = async ({id, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/appointment/cancel-by-host`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({
            "appointment_id": id
        }),
        AbortSignal: signal
    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data
}

export const getAppointmentDetail = async ({key, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/appointment/${key}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',},
        AbortSignal: signal
    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data
}

export const getNext7DaysAppointments = async ({signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/appointment/all`, {
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

    return data
}