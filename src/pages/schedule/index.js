import {useMutation, useQuery} from "@tanstack/react-query";
import {
    createSchedule,
    deleteSchedule,
    listSchedules,
    setAvailableTime,
    setTimeZone
} from "../../api/schedule/schedule";
import Loading from "../../components/ui/Loading";
import Error from "../../components/ui/Error";
import {useRef, useState} from "react";
import {queryClient} from "../../api";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import AvailableTimeSelector from "../../components/schedule/AvailableTimeSelector";
import {TrashIcon} from "@heroicons/react/24/solid";
import TimeZoneSelector from "../../components/TimeZoneSelector";
import {CACHE_KEY, MINUTE} from "../../utils/constants";
import {useTranslation} from "react-i18next";

export default function Schedule() {

    const {t} = useTranslation();
    const nameInputRef = useRef();
    const [isNameInputError, setIsNameInputError] = useState(false);
    const [updatedSchedules, setUpdatedSchedules] = useState({})
    const [updatedTimeZone, setUpdatedTimeZone] = useState({})

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: [CACHE_KEY.SCHEDULES],
        queryFn: (signal) => listSchedules({signal}),
        staleTime: 30 * MINUTE,
        cacheTime: 30 * MINUTE
    });

    const {
        mutate: createScheduleMutate,
        isPending: isPendingCreateSchedule
    } = useMutation({
        mutationFn: createSchedule,
        onSuccess: () => {
            nameInputRef.current.value = ''
            setIsNameInputError(false)
            queryClient.invalidateQueries([CACHE_KEY.SCHEDULES])
        }
    })

    const {
        mutate: deleteScheduleMutate,
        isPending: isPendingDeleteSchedule,
    } = useMutation({
        mutationFn: deleteSchedule,
        onSuccess: () => {
            queryClient.invalidateQueries([CACHE_KEY.SCHEDULES])
        }
    })

    const {
        mutate: setAvailableTimeMutate,
        isPending: isPendingSetAvailableTime
    } = useMutation({
        mutationFn: setAvailableTime,
        onSuccess: () => {
            queryClient.invalidateQueries([CACHE_KEY.SCHEDULES])
        }
    })

    const {
        mutate: setTimeZoneMutate,
        isPending: isPendingSetTimeZone
    } = useMutation({
        mutationFn: setTimeZone,
        onSuccess: () => {
            queryClient.invalidateQueries([CACHE_KEY.SCHEDULES])
        }
    })

    if (isLoading) {
        return <Loading/>
    }

    if (isError) {
        return <Error/>
    }

    const newScheduleHandler = async () => {
        const name = nameInputRef.current.value
        if (name.trim().length === 0) {
            setIsNameInputError(true)
            return
        }
        createScheduleMutate({name})
    }

    const eventsChangeHandler = (scheduleId, availableTimes) => {
        setUpdatedSchedules({
            ...updatedSchedules, [scheduleId]: availableTimes
        })
    }

    const timeZoneChangeHandler = (scheduleId, timezone) => {
        setUpdatedTimeZone({
            ...updatedTimeZone, [scheduleId]: timezone.value
        })
    }

    const saveHandler = (scheduleId) => {

        if (updatedTimeZone[scheduleId]) {
            setTimeZoneMutate({
                id: scheduleId,
                timezone: updatedTimeZone[scheduleId]
            })
        }

        if (!updatedSchedules[scheduleId]) {
            return
        }

        setAvailableTimeMutate({
            id: scheduleId,
            availableTimes: updatedSchedules[scheduleId]
        })
    }

    return <div>
        <input ref={nameInputRef}
               type="text"
               placeholder="Schedule Name"
               className={"input input-bordered w-full max-w-xs mr-2" + (isNameInputError ? " input-error" : "")}/>

        <button className={"btn btn-primary text-white"}
                onClick={newScheduleHandler}
                disabled={isPendingCreateSchedule}
        >
            {isPendingCreateSchedule ? <span className="loading loading-spinner text-primary"/> : t("base.new")}
        </button>

        <div role="tablist" className="tabs tabs-bordered tabs-lg mt-8">
            {
                data.map((schedule) => {
                    return <>
                        <input type="radio"
                               name="schedule-tabs"
                               role="tab"
                               className="tab"
                               aria-label={schedule.name}
                               defaultChecked={schedule.id === data[0].id}
                        />
                        <div
                            role="tabpanel"
                            className="tab-content bg-base-100 border-base-300 rounded-box p-4"
                        >
                            <div className="flex justify-between my-4">
                                <div className="flex justify-center items-center gap-2">
                                    <label className="label label-text">{t("base.timezone")}</label>
                                    <TimeZoneSelector
                                        currentTimeZone={schedule.time_zone}
                                        onTimeZoneChange={(tz) => timeZoneChangeHandler(schedule.id, tz)}/>
                                </div>

                                <button className="btn btn-error"
                                        onClick={() => deleteScheduleMutate({id: schedule.id})}
                                        disabled={isPendingDeleteSchedule}>
                                    {isPendingDeleteSchedule ?
                                        <span key={schedule.id} className="loading loading-spinner text-white"/> :
                                        <TrashIcon key={schedule.id} className="text-white h-5 w-5"/>}
                                </button>
                            </div>

                            <AvailableTimeSelector
                                availableTimes={schedule?.available_times}
                                onEventsChange={(availableTimes) => eventsChangeHandler(schedule.id, availableTimes)}
                            />


                            <div className="flex justify-end py-4">
                                <button className="btn btn-primary text-white"
                                        onClick={() => saveHandler(schedule.id)}
                                        disabled={isPendingSetAvailableTime || isPendingSetTimeZone}>
                                    {isPendingSetAvailableTime || isPendingSetTimeZone ?
                                        <span className="loading loading-spinner text-primary"/> : t("base.save")}
                                </button>
                            </div>
                        </div>
                    </>
                })
            }
        </div>
    </div>
}

