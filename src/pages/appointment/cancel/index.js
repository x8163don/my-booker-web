import {useTranslation} from "react-i18next";
import {createPortal} from "react-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import Error from "../../../components/ui/Error";
import Loading from "../../../components/ui/Loading";
import {CACHE_KEY} from "../../../utils/constants";
import {cancelAppointment, getAppointmentDetail} from "../../../api/appointment";
import {format} from "date-fns";
import {sendToast, TOAST_TYPES} from "../../../utils/toast";
import {queryClient} from "../../../api";

export default function Cancel() {
    const {t} = useTranslation()

    const params = new URLSearchParams(window.location.search)
    const appointment = params.get('appointment')
    const cancelCode = params.get('cancel_code')

    const {
        data: appointmentDetail,
        isLoading: isAppointmentLoading,
        isError: isAppointmentError
    } = useQuery({
        queryKey: [CACHE_KEY.APPOINTMENT, 'cancel', appointment],
        queryFn: () => getAppointmentDetail({key: appointment})
    })

    const {
        mutate: cancelAppointmentMutate,
    } = useMutation({
        mutationFn: cancelAppointment,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [CACHE_KEY.APPOINTMENT, 'cancel', appointment]})
        },
        onError: (error) => {
            sendToast(TOAST_TYPES.ERROR, error.message)
        }
    })

    const handleConfirm = () => {
        cancelAppointmentMutate({
            key: appointment,
            cancelCode
        })
    }

    if (!appointment || !cancelCode) {
        return <Error/>
    }

    if (isAppointmentError) {
        return <Error/>
    }

    if (isAppointmentLoading) {
        return <Loading/>
    }

    if (appointmentDetail.appointment_status === "Cancel") {
        return createPortal(<div className="modal modal-open" role="dialog">
                <div className="modal-box">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-2xl font-bold mb-4">{t('appointment.cancel.canceled')}</h3>
                            <div className="mb-4 text-xl">{t('appointment.cancel.canceled.message', {
                                activityName: appointmentDetail.activity_name,
                                dateTime: format(appointmentDetail.start_time, "yyyy-MM-dd hh:mm a")
                            })}</div>
                        </div>
                    </div>
                </div>
            </div>
            , document.getElementById('modal-root'))
    }


    return createPortal(<div className="modal modal-open" role="dialog">
            <div className="modal-box">
                <div className="card">
                    <div className="card-body">
                        <h3 className="text-2xl font-bold mb-4">{t('appointment.cancel.title')}</h3>
                        <div className="mb-4 text-xl">{t('appointment.cancel.message', {
                            activityName: appointmentDetail.activity_name,
                            dateTime: format(appointmentDetail.start_time, "yyyy-MM-dd hh:mm a")
                        })}</div>

                        <div className="card-actions justify-end">
                            <button className="btn btn-primary text-white"
                                    onClick={handleConfirm}>{t('appointment.cancel.confirm')} </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        , document.getElementById('modal-root'))
}