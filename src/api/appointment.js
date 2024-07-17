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
