import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {
    getActivity, setAvailability, setBuffer,
    setDateRange,
    setDescription, setMinimumScheduleBefore,
    setStartTimeIncrement,
    switchActivity
} from "../../../api/activity/activity";
import Loading from "../../../components/ui/Loading";
import Error from "../../../components/ui/Error";
import {ArrowLeftIcon} from "@heroicons/react/24/outline";
import {sendToast, TOAST_TYPES} from "../../../utils/toast";
import {queryClient} from "../../../api";
import sanitizeHtml from "sanitize-html";
import {CACHE_KEY, MINUTE} from "../../../utils/constants";
import {useState} from "react";
import {listSchedules} from "../../../api/schedule/schedule";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useTranslation} from "react-i18next";


export default function ActivityEdit() {
    const params = useParams()
    const navigate = useNavigate()
    const {t} = useTranslation()

    const {
        data: activity,
        isPending: isActivityPending,
        isError: isActivityError,
    }
        = useQuery({
        queryKey: [CACHE_KEY.ACTIVITY, +params.id],
        queryFn: (signal) => getActivity({id: params.id, signal: signal}),
        staleTime: 30 * MINUTE,
        cacheTime: 30 * MINUTE,
    })

    const {
        data: schedules,
        isPending: isSchedulesPending,
        isError: isSchedulesError
    } = useQuery({
        queryKey: [CACHE_KEY.SCHEDULE],
        queryFn: (signal) => listSchedules({signal}),
        staleTime: 30 * MINUTE,
        cacheTime: 30 * MINUTE,
    });

    const {
        mutate: switchActivityMutate,
    } = useMutation({
        mutationFn: switchActivity,
        onMutate: async ({id, isOpen}) => {
            await queryClient.cancelQueries([CACHE_KEY.ACTIVITY, id]);
            const previousActivity = queryClient.getQueryData(['activity', id]);
            queryClient.setQueryData([CACHE_KEY.ACTIVITY, id], old => ({...old, is_open: isOpen,}));
            return {previousActivity};
        },
        onSuccess: (data, {id, isOpen}) => {
            queryClient.setQueryData([CACHE_KEY.ACTIVITY, id], old => ({...old, is_open: isOpen}));
        },
        onError: (error, {id, isOpen}, context) => {
            queryClient.setQueryData([CACHE_KEY.ACTIVITY, id], context.previousActivity);
            sendToast(TOAST_TYPES.ERROR, error.message)
        },
    })


    const [descriptionMutateTimeoutId, setDescriptionMutateTimeoutId] = useState(null);
    const {
        mutate: setDescriptionMutate,
    } = useMutation({
        mutationFn: setDescription,
        onMutate: async ({id, description}) => {
            await queryClient.cancelQueries([CACHE_KEY.ACTIVITY, id]);
            const previousActivity = queryClient.getQueryData(['activity', id]);
            queryClient.setQueryData([CACHE_KEY.ACTIVITY, id], old => ({...old, description: description}));
            return {previousActivity};
        },
        onSuccess: (data, {id, description}) => {
            queryClient.setQueryData([CACHE_KEY.ACTIVITY, id], old => ({...old, description: description,}));
        },
        onError: (error, {id, description}, context) => {
            queryClient.setQueryData([CACHE_KEY.ACTIVITY, id], context.previousActivity);
            sendToast(TOAST_TYPES.ERROR, error.message)
        },
    })
    const {
        mutate: setDateRangeMutate,
    } = useMutation({
        mutationFn: setDateRange,
        onMutate: async ({id, dateRangeType, dateRangeDetail}) => {
            await queryClient.cancelQueries([CACHE_KEY.ACTIVITY, id]);
            const previousActivity = queryClient.getQueryData(['activity', id]);
            queryClient.setQueryData([CACHE_KEY.ACTIVITY, id], old => ({
                ...old,
                date_range_type: dateRangeType,
                date_range_detail: dateRangeDetail
            }));
            return {previousActivity};
        },
        onSuccess: (data, {id, dateRangeType, dateRangeDetail}) => {
            queryClient.setQueryData([CACHE_KEY.ACTIVITY, id], old => ({
                ...old,
                date_range_type: dateRangeType,
                date_range_detail: dateRangeDetail,
            }));
        },
        onError: (error, {id, dateRangeType, dateRangeDetail}, context) => {
            queryClient.setQueryData([CACHE_KEY.ACTIVITY, id], context.previousActivity);
            sendToast(TOAST_TYPES.ERROR, error.message)
        },
    })

    const {
        mutate: setAvailabilityMutate,
    } = useMutation(
        {
            mutationFn: setAvailability,
            onMutate: async ({id, scheduleID}) => {
                await queryClient.cancelQueries([CACHE_KEY.ACTIVITY, id]);
                const previousActivity = queryClient.getQueryData([CACHE_KEY.ACTIVITY, id]);
                queryClient.setQueryData([CACHE_KEY.ACTIVITY, id], old => ({
                    ...old,
                    availability_id: scheduleID
                }));
                return {previousActivity};
            },
            onSuccess: (data, {id, scheduleID}) => {
                queryClient.setQueryData([CACHE_KEY.ACTIVITY, id], old => ({
                    ...old,
                    availability_id: scheduleID
                }));
            },
            onError: (error, {id, scheduleID}, context) => {
                queryClient.setQueryData([CACHE_KEY.ACTIVITY, id], context.previousActivity);
                sendToast(TOAST_TYPES.ERROR, error.message)
            },
        }
    )

    const {
        mutate: setBufferMutate,
    } = useMutation({
        mutationFn: setBuffer,
        onMutate: async ({id, before, after}) => {
            await queryClient.cancelQueries([CACHE_KEY.ACTIVITY, id]);
            const previousActivity = queryClient.getQueryData(['activity', id]);
            queryClient.setQueryData([CACHE_KEY.ACTIVITY, id], old => ({
                ...old,
                before: before,
                after: after
            }));
            return {previousActivity};
        },
        onSuccess: (data, {id, before, after}) => {
            queryClient.setQueryData([CACHE_KEY.ACTIVITY, id], old => ({
                ...old,
                before: before,
                after: after
            }));
        },
        onError: (error, {id, before, after}, context) => {
            queryClient.setQueryData([CACHE_KEY.ACTIVITY, id], context.previousActivity);
            sendToast(TOAST_TYPES.ERROR, error.message)
        },
    })

    const {
        mutate: setMinimumScheduleBeforeMutate,
    } = useMutation({
        mutationFn: setMinimumScheduleBefore,
        onMutate: async ({id, minimumScheduleBefore}) => {
            await queryClient.cancelQueries([CACHE_KEY.ACTIVITY, id]);
            const previousActivity = queryClient.getQueryData([CACHE_KEY.ACTIVITY, id]);
            queryClient.setQueryData([CACHE_KEY.ACTIVITY, id], old => ({
                ...old,
                minimum_schedule_before: minimumScheduleBefore
            }));
            return {previousActivity};
        },
        onSuccess: (data, {id, minimumScheduleBefore}) => {
            queryClient.setQueryData([CACHE_KEY.ACTIVITY, id], old => ({
                ...old,
                minimum_schedule_before: minimumScheduleBefore
            }));
        },
        onError: (error, {id, minimumScheduleBefore}, context) => {
            queryClient.setQueryData([CACHE_KEY.ACTIVITY, id], context.previousActivity);
            sendToast(TOAST_TYPES.ERROR, error.message)
        },
    })

    const {
        mutate: setStartTimeIncrementMutate,
    } = useMutation({
        mutationFn: setStartTimeIncrement,
        onMutate: async ({id, startTimeIncrement}) => {
            await queryClient.cancelQueries([CACHE_KEY.ACTIVITY, id]);
            const previousActivity = queryClient.getQueryData(['activity', id]);
            queryClient.setQueryData([CACHE_KEY.ACTIVITY, id], old => ({
                ...old,
                startTimeIncrement: startTimeIncrement
            }));
            return {previousActivity};
        },
        onSuccess: (data, {id, startTimeIncrement}) => {
            queryClient.setQueryData([CACHE_KEY.ACTIVITY, id], old => ({
                ...old,
                startTimeIncrement: startTimeIncrement,
            }));
        },
        onError: (error, {id, startTimeIncrement}, context) => {
            queryClient.setQueryData([CACHE_KEY.ACTIVITY, id], context.previousActivity);
            sendToast(TOAST_TYPES.ERROR, error.message)
        },
    })


    if (isActivityPending || isSchedulesPending) {
        return <Loading/>
    }

    if (isActivityError || isSchedulesError) {
        return <Error/>
    }

    const handleBack = () => {
        navigate('/activity')
    }

    const handleSwitch = (e) => {
        switchActivityMutate({id: activity.id, isOpen: e.target.checked})
    }

    const handleOnChangeDescription = (text) => {
        if (descriptionMutateTimeoutId) {
            clearTimeout(descriptionMutateTimeoutId);
        }

        const cleanDesc = sanitizeHtml(text)
        const newTimeoutId = setTimeout(() => {
            setDescriptionMutate({id: activity.id, description: cleanDesc})
        }, 1000);

        setDescriptionMutateTimeoutId(newTimeoutId);
    }

    const handleLocationChange = (type) => {
        // TODO
        if (activity.location_type === type) {
            return
        }

        queryClient.setQueryData([CACHE_KEY.ACTIVITY, activity.id], old => ({...old, location_type: type,}));
    }

    const handleDateRangeChange = (type, detail) => {
        setDateRangeMutate({id: activity.id, dateRangeType: type, dateRangeDetail: detail})
    }

    const handleAvailabilityChange = (e) => {
        const scheduleID = +e.target.value
        setAvailabilityMutate({id: activity.id, scheduleID: scheduleID})
    }

    const handleBufferChange = (before, after) => {
        before = +before
        after = +after
        setBufferMutate({id: activity.id, before, after})
    }

    const handleMinimumScheduleBeforeChange = (minimumScheduleBefore) => {
        minimumScheduleBefore = +minimumScheduleBefore
        setMinimumScheduleBeforeMutate({id: activity.id, minimumScheduleBefore: minimumScheduleBefore})
    }

    const handleStartTimeIncrementChange = (e) => {
        const increment = +e.target.value
        if (increment <= 0) {
            return
        }

        setStartTimeIncrementMutate({id: activity.id, startTimeIncrement: increment})
    }


    return <main className="min-h-screen  p-16">
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="card-body">
                <div className="card-title">
                    <button className="btn btn-link text-lg" onClick={handleBack}><ArrowLeftIcon className="w-5 h-5"/>{t('base.back')}
                    </button>
                </div>

                <form className="card-body">
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">{t('activity.edit.isOpen')}</span>
                        </label>
                        <input type="checkbox" className="toggle toggle-primary" defaultChecked={activity.is_open}
                               onChange={handleSwitch}/>
                    </div>

                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">{t('activity.edit.activityName')}</span>
                        </label>
                        <input className="input input-bordered" defaultValue={activity.name} disabled/>
                    </div>

                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">{t('activity.edit.activityType')}</span>
                        </label>
                        <input className="input input-bordered" defaultValue={activity.activity_type} disabled/>
                    </div>

                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">{t('activity.edit.duration')}</span>
                        </label>
                        <input className="input input-bordered" defaultValue={activity.duration} disabled/>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">{t('activity.edit.description')}</span>
                        </label>
                        <ReactQuill theme="snow"
                                    defaultValue={activity.description}
                                    onChange={handleOnChangeDescription}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">{t('activity.edit.location')}</span>
                        </label>

                        <div className="join">
                            <input
                                className="join-item btn"
                                type="radio"
                                name="location"
                                value={t('activity.edit.location.phoneNumber')}
                                aria-label={t('activity.edit.location.phoneNumber')}
                                checked={activity.location_type === 'CellPhone'}
                                onChange={() => handleLocationChange('CellPhone')}
                            />
                            <input
                                className="join-item btn"
                                type="radio"
                                name="location"
                                value={t('activity.edit.location.address')}
                                aria-label={t('activity.edit.location.address')}
                                checked={activity.location_type === 'InPersonMeeting'}
                                onChange={() => handleLocationChange('InPersonMeeting')}
                            />
                            <input
                                className="join-item btn"
                                type="radio"
                                name="location"
                                value={t('activity.edit.location.googleMeet')}
                                aria-label={t('activity.edit.location.googleMeet')}
                                checked={activity.location_type === 'GoogleMeet'}
                                onChange={() => handleLocationChange('GoogleMeet')}
                            />
                        </div>
                        {/*TODO*/}
                        {activity.location_type === "InPersonMeeting" &&
                            <div className="mt-4">
                                <input type="text" placeholder={t('activity.edit.location.address')} defaultValue={activity.location_detail}/>
                            </div>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">{t('activity.edit.allowBookingInDays')} </span>
                        </label>
                        {
                            activity.date_range_type === 'InDays' &&
                            <div>
                                <input
                                    className="input"
                                    value={+activity.date_range_detail}
                                    type="number"
                                    onChange={(e) => handleDateRangeChange('InDays', e.target.value)}
                                />
                            </div>
                        }
                    </div>

                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">{t('activity.edit.availableTimes')}</span>
                        </label>
                        <select className="select select-bordered"
                                defaultValue={activity.availability_id}
                                onChange={handleAvailabilityChange}
                        >
                            {
                                schedules.map((schedule) => {
                                    return <option key={schedule.id} value={schedule.id}>{schedule.name}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">{t('activity.edit.bookingInterval')}</span>
                        </label>

                        <label className="label cursor-pointer">
                            <span className="label-text">{t('activity.edit.bookingInterval.before')}</span>
                        </label>
                        <input className="input" type="number" defaultValue={activity.buffer_before}
                               min={0}
                               onChange={(e) => handleBufferChange(e.target.value, activity.after)}
                        />
                        <label className="label cursor-pointer">
                            <span className="label-text">{t('activity.edit.bookingInterval.after')}</span>
                        </label>
                        <input className="input" type="number" defaultValue={activity.buffer_after}
                               min={0}
                               onChange={(e) => handleBufferChange(activity.before, e.target.value)}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">{t('activity.edit.bookingLeadTime')}</span>
                        </label>
                        <input className="input" type="number" defaultValue={activity.minimum_schedule_before}
                               min={0}
                               onChange={(e) => handleMinimumScheduleBeforeChange(e.target.value)}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">{t('activity.edit.startTimeIncrement')}</span>
                        </label>
                        <select className="select select-bordered" defaultValue={activity.start_time_increment}
                                onChange={handleStartTimeIncrementChange}>
                            <option value={15}>15 {t('base.short.minute')}</option>
                            <option value={30}>30 {t('base.short.minute')}</option>
                            <option value={45}>45 {t('base.short.minute')}</option>
                            <option value={60}>60 {t('base.short.minute')}</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>
    </main>
}