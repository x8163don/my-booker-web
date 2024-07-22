import Cookies from "js-cookie";
import {sendToast, TOAST_TYPES} from "../../utils/toast";
import {useMutation, useQuery} from "@tanstack/react-query";
import {changeTargetCalendar, listCalendarSources} from "../../api/calendar";
import Loading from "../../components/ui/Loading";
import Error from "../../components/ui/Error";
import {useEffect, useState} from "react";
import {CACHE_KEY, DAY} from "../../utils/constants";
import {queryClient} from "../../api";
import {useNavigate} from "react-router-dom";
import {QuestionMarkCircleIcon} from "@heroicons/react/16/solid";
import {PlusIcon} from "@heroicons/react/24/outline";
import {useTranslation} from "react-i18next";

export default function Account() {

    const navigate = useNavigate();
    const {t} = useTranslation()

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


    const handleSave = () => {
        changeTargetCalendarMutate({
            sourceID: targetCalendarItem.calendar_source_id,
            CalendarItemID: targetCalendarItem.id
        })
    };

    return <div>
        {/*<h1>帳戶</h1>*/}

        {/*<h2>個人資料</h2>*/}

        <div className="card">
            <div className="card-body">
                <h2 className="card-title">{t('account.index.thirdParty.title')}</h2>
                <div className="form-control">
                    <label className="label items-center">
                        <div className="label-text flex items-center gap-2">
                            <span>{t('account.index.thirdParty.syncTo')}</span>
                            <span className="label-text-alt tooltip tooltip-top"
                                  data-tip={t('account.index.thirdParty.syncTo.tooltips')}>
                        <QuestionMarkCircleIcon className="w-4 h-4"/>
                    </span>
                        </div>
                    </label>
                    <div className="flex items-center gap-2">
                        <select className="select select-bordered w-full max-w-md"
                                value={targetCalendarItem ? targetCalendarItem.id : ""}
                                onChange={(e) => setTargetCalendarItem(calendarItems.find(item => item.id === e.target.value))}>
                            <option disabled value="">{t('account.index.selectCalendarDefault')}</option>
                            {calendarItems.map((item) => {
                                return <option key={item.id} value={item.id}>
                                    {item.calendar_source_email} - {item.title}
                                </option>
                            })}
                        </select>

                        <button
                            className="btn btn-primary"
                            onClick={handleSave}
                            disabled={!!targetCalendarItem && targetCalendarItem?.is_target}
                        > {t('base.save')}
                        </button>
                    </div>
                </div>
                <div className="card-actions">
                    <button
                        className="btn btn-primary text-md text-white"
                        onClick={() => navigate("/account/connect")}>
                        <PlusIcon className="h-5 w-5"></PlusIcon>
                        {t('account.index.thirdParty.connectTo')}
                    </button>
                </div>
            </div>
        </div>


    </div>
}