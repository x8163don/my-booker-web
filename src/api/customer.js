import Cookies from "js-cookie";
import i18next from 'i18next';

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
            'Authorization': `Bearer ${Cookies.get('token')}`,
            'Language': i18next.language,
            'TimeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        AbortSignal: signal
    })

    return response.ok;
}

export const setLanguage = async ({language, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/customer/set-language`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({language}),
        AbortSignal: signal
    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

export const setTimeZone = async ({timezone, signal}) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/customer/set-timezone`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({time_zone: timezone}),
        AbortSignal: signal
    })

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}