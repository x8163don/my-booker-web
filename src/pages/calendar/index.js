import Cookies from "js-cookie";
import {sendToast, TOAST_TYPES} from "../../utils/toast";
import {useMutation, useQuery} from "@tanstack/react-query";
import {changeTargetCalendar, listCalendarSources} from "../../api/calendar";
import Loading from "../../components/ui/Loading";
import Error from "../../components/ui/Error";
import {useEffect, useState} from "react";
import {CACHE_KEY, DAY} from "../../utils/constants";
import {queryClient} from "../../api";
import {FaGoogle} from "react-icons/fa";

export default function Calendar() {
    const redirectUri = `${process.env.REACT_APP_BASE_URL}/google/oauth/callback`;
    const scope = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events email profile openid'

    const [calendarItems, setCalendarItems] = useState([]);
    const [targetCalendarItem, setTargetCalendarItem] = useState(null);

    const {
        data: calendarSources,
        isLoading,
        isError,
    } = useQuery({
        queryKey: [CACHE_KEY.CALENDARS, Cookies.get('token')],
        cacheTime: 1 * DAY,
        staleTime: 1 * DAY,
        queryFn: (signal) => listCalendarSources({signal}),
        onError: (error) => {
            sendToast(TOAST_TYPES.ERROR, error.message)
        },
    })

    const {
        mutate: changeTargetCalendarMutate,
    } = useMutation({
        mutationFn: changeTargetCalendar,
        onSuccess: (data) => {
            sendToast(TOAST_TYPES.SUCCESS, "saved")
            queryClient.invalidateQueries({queryKey: [CACHE_KEY.CALENDARS]})
        },
        onError: (error) => {
            sendToast(TOAST_TYPES.ERROR, error.message)
        },
    })


    useEffect(() => {
        if (!calendarSources) {
            return
        }

        const result = []
        calendarSources.forEach((calendarSource) => {
            const items = calendarSource.items.map((calendarItem) => {
                return {
                    ...calendarItem,
                    calendar_source_id: calendarSource.id,
                    calendar_source_email: calendarSource.email,
                    calendar_source_identity: calendarSource.identity
                }
            })
            result.push(...items)
        })

        result.forEach((item) => {
            if (item.is_target) {
                setTargetCalendarItem(item)
            }
        })

        setCalendarItems(result)
    }, [calendarSources]);

    if (isLoading) {
        return <Loading/>
    }
    if (isError) {
        return <Error/>
    }

    const handleLogin = () => {
        try {
            const state = {
                id: getIDFromToken(Cookies.get('token')),
            }
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${JSON.stringify(state)}`;
            window.location.href = authUrl;
        } catch (e) {
            sendToast(TOAST_TYPES.ERROR, e.message)
        }
    };

    const handleSave = () => {
        changeTargetCalendarMutate({
            sourceID: targetCalendarItem.calendar_source_id,
            CalendarItemID: targetCalendarItem.id
        })
    };

    return <div>
        <h1>Connect my Google calendar</h1>

        <button
            className="btn btn-primary mt-4 text-white"
            onClick={handleLogin}>
            <FaGoogle className="mr-2"></FaGoogle>
            <span>Continue with Google</span>
        </button>

        <label className="label mt-4">
            <div className="label-text">Sync to:</div>
            <select className="select select-bordered w-full max-w-md"
                    value={targetCalendarItem ? targetCalendarItem.id : ""}
                    onChange={(e) => setTargetCalendarItem(calendarItems.find(item => item.id === e.target.value))}>
                <option disabled value="">Select Calendar</option>
                {calendarItems.map((item) => {
                    return <option key={item.id} value={item.id}>
                        {item.calendar_source_email} - {item.title}
                    </option>
                })}
            </select>
            <button
                className="btn btn-primary mt-4"
                onClick={handleSave}
                disabled={!!targetCalendarItem && targetCalendarItem?.is_target}>
                Save
            </button>
        </label>

    </div>
}

function getIDFromToken(token) {
    const parts = Cookies.get('token').split('.');

    if (parts.length !== 3) {
        throw new Error('Invalid JWT token');
    }
    const base64Payload = parts[1];
    const jsonPayload = atob(base64Payload);
    const payload = JSON.parse(jsonPayload);
    const id = payload.id;

    return id;
}
