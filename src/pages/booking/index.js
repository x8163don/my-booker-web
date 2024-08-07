import {useParams} from "react-router-dom";
import Error from "../../components/ui/Error";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getBookingDetail} from "../../api/booking";
import Loading from "../../components/ui/Loading";
import {PhoneIcon, ClockIcon} from "@heroicons/react/24/solid";
import {CACHE_KEY, MINUTE} from "../../utils/constants";
import DatePicker from "../../components/booking/datepicker";
import {useEffect, useState} from "react";
import {format} from 'date-fns';
import {useForm} from "react-hook-form";
import {ArrowLeftIcon, EnvelopeIcon} from "@heroicons/react/24/outline";
import {UserIcon} from "@heroicons/react/16/solid";
import {createAppointment} from "../../api/appointment";
import {useTranslation} from "react-i18next";

export default function Booking() {
    const params = useParams()
    const {t} = useTranslation()
    const [page, setPage] = useState(1)
    const [selectBookingTime, setSelectBookingTime] = useState(null)
    const [timezoneStr, setTimezoneStr] = useState(null)
    const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)

    useEffect(() => {
        if (selectBookingTime) {
            const offset = selectBookingTime.getTimezoneOffset() / -60
            setTimezoneStr(offset > 0 ? `GMT+${offset}` : `GMT${offset}`)
        }
    }, [selectBookingTime]);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            phoneNumber: '',
        }
    })

    const {
        data: bookingDetail,
        isPending: isBookingDetailPending,
        isError: isBookingDetailError,
    } = useQuery({
        queryKey: [CACHE_KEY.BOOKING, params.url_name, params.booking_key],
        queryFn: (signal) => getBookingDetail({urlName: params.url_name, key: params.booking_key, signal: signal}),
        staleTime: 1 * MINUTE,
        cacheTime: 1 * MINUTE
    })

    const {
        mutate: confirmAppointmentMutate,
        isPending: isConfirmAppointmentPending,
    } = useMutation({
        mutationFn: createAppointment,
        onSuccess: () => {
            setPage(3)
        }
    })

    if (isBookingDetailPending) {
        return <Loading/>
    }

    if (isBookingDetailError) {
        return <Error/>
    }

    const handleTimeSelected = (availableTime) => {
        setPage(2)
        setSelectBookingTime(availableTime)
    }

    const handleConfirmAppointment = (data) => {
        confirmAppointmentMutate({
            urlName: params.url_name,
            bookingKey: params.booking_key,
            phoneNumber: data.phoneNumber,
            timezone: timezone,
            name: data.name,
            email: data.email,
            startTime: selectBookingTime.getTime()
        })
    }

    return <main className="min-h-screen flex items-center justify-center">
        {
            page === 1 && <div className="card max-w-5xl shadow-lg rounded-lg min-h-96 lg:w-3/4 xl:w-1/2">
                <div className="card-body flex flex-col md:flex-row">
                    <div className="w-1/2">
                        <h2 className="card-title text-2xl my-5">{bookingDetail.name}</h2>
                        <div className="flex items-center my-2">
                            <ClockIcon className="h-5 w-5 mr-2"/>{bookingDetail.duration} {t('base.minute')}
                        </div>
                        {bookingDetail?.location_type === "CellPhone" && (
                            <div className="flex items-center my-2">
                                <PhoneIcon className="h-5 w-5 mr-2"/>{t('booking.index.location.phone')}
                            </div>
                        )}
                        <div
                            className="card-description"
                            dangerouslySetInnerHTML={{__html: bookingDetail.description}}
                        />
                    </div>
                    <div className="divider divider-horizontal m-0"></div>
                    <div className="flex-1 px-2 ">
                        <DatePicker
                            timezone={timezone}
                            allowAppointments={bookingDetail.allow_appointments}
                            onTimeSelected={handleTimeSelected}
                            onTimeZoneChange={setTimezone}
                        />
                    </div>
                </div>
            </div>
        }

        {
            page === 2 && <div className="card max-w-4xl shadow-lg rounded-lg min-h-96 lg:w-3/4 xl:w-1/2">
                <div className="card-body">
                    <span className="link link-primary">
                        <ArrowLeftIcon
                            className="w-5 h-5 cursor-pointer"
                            onClick={() => setPage(1)}/>
                    </span>
                    <div className="flex-1 w-full text-center">
                        <h2 className="items-center">{t('booking.index.bookingTime.title')}</h2>
                        <div className="text-lg">
                            {format(selectBookingTime, "yyyy-MM-dd HH:mm")}({timezoneStr})
                        </div>
                    </div>
                    <div className="divider divider-vertical">{t('booking.index.contactInformation.title')}</div>
                    <form
                        className="flex flex-col gap-2 items-center"
                        onSubmit={handleSubmit(handleConfirmAppointment)}>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">{t('booking.index.contactInformation.name')}</span>
                            </div>
                            <div
                                className={"input input-bordered flex items-center gap-2 " + (errors.name ? "input-error" : "")}>
                                <UserIcon className="w-5 h-5"/>
                                <input type="text" className="grow"
                                       placeholder={t("booking.index.contactInformation.namePlaceholder")} {...register("name", {
                                    required: true
                                })}/>
                            </div>
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">{t("booking.index.contactInformation.email")}</span>
                            </div>
                            <div
                                className={"input input-bordered flex items-center gap-2 " + (errors.email ? "input-error" : "")}>
                                <EnvelopeIcon className="w-5 h-5"/>
                                <input type="email" className="grow"
                                       placeholder={t("booking.index.contactInformation.emailPlaceholder")} {...register("email", {
                                    required: true, pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,}
                                })}/>
                            </div>
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">{t('booking.index.contactInformation.phoneNumber')}</span>
                            </div>
                            <div
                                className={"input input-bordered flex items-center gap-2 " + (errors.phoneNumber ? "input-error" : "")}>
                                <PhoneIcon className="w-5 h-5"/>
                                <input type="tel"
                                       className="grow"
                                       placeholder={t("booking.index.contactInformation.phoneNumberPlaceholder")} {...register("phoneNumber", {
                                    required: true,
                                    pattern: {
                                        value: /^\d{1,3}\d{9,15}$/,
                                        message: "Invalid phone number"
                                    }
                                })}/>
                            </div>
                        </label>

                        <button type="submit" className="btn btn-primary text-lg w-full max-w-xs mt-10"
                                disabled={isConfirmAppointmentPending}>
                            {isConfirmAppointmentPending ?
                                <span className="loading loading-spinner"></span> : t('booking.index.confirmBooking')}
                        </button>
                    </form>
                </div>
            </div>
        }

        {
            page === 3 && <div className="card max-w-4xl shadow-lg rounded-lg lg:w-3/4 xl:w-1/2 mx-auto">
                <div className="card-body items-center text-center p-6">
                    <h2 className="card-title text-2xl font-semibold mb-4">
                        {t("booking.index.confirmation.success")}
                    </h2>
                    <div className="card-description mb-6">
                        <div className="text-lg">
                            {t("booking.index.confirmation.success.message", {activityName: bookingDetail.name})}
                        </div>
                        <div className="text-primary text-2xl font-bold mt-2">
                            {format(selectBookingTime, "yyyy-MM-dd HH:mm")} ({timezoneStr})
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <EnvelopeIcon className="w-10 h-10"/>
                        <div className="text-lg">
                            {t("booking.index.confirmation.success.sendConfirmationEmail")}
                        </div>
                    </div>
                </div>
            </div>

        }
    </main>
}
