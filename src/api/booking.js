
export const getBookingDetail = async ({slug, key, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/booking/${slug}/${key}/detail`, {
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