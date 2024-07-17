
export const getBookingDetail = async ({urlName, key, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/booking/${urlName}/${key}/detail`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',},
        AbortSignal: signal
    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}
