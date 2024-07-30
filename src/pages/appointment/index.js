import {useMutation, useQuery} from "@tanstack/react-query";
import {cancelAppointmentByHost, getNext7DaysAppointments} from "../../api/appointment";
import {CACHE_KEY} from "../../utils/constants";
import Loading from "../../components/ui/Loading";
import Error from "../../components/ui/Error";
import AppointmentCard from "../../components/appointment/AppointmentCard";
import {queryClient} from "../../api";
import {sendToast, TOAST_TYPES} from "../../utils/toast";
import {useTranslation} from "react-i18next";

export default function Appointment() {

    const t = useTranslation()

    const {
        data: appointments,
        isLoading: isAppointmentLoading,
        isError: isAppointmentError
    } = useQuery({
        queryKey: [CACHE_KEY.APPOINTMENT, 'all'],
        queryFn: ({signal}) => getNext7DaysAppointments({signal})
    })

    const {
        mutate: cancelAppointmentMutate
    } = useMutation({
        mutationFn: cancelAppointmentByHost,
        onSuccess: () => {
            sendToast(TOAST_TYPES.SUCCESS, t("appointment.cancel.success"))
            queryClient.invalidateQueries([CACHE_KEY.APPOINTMENT, 'all'])
        }
    })

    const handleCancelAppointment = (id) => {
        cancelAppointmentMutate({id: id})
    }

    if (isAppointmentLoading) {
        return <Loading/>
    }

    if (isAppointmentError) {
        return <Error/>
    }

    return <div className="card">
        <div className="card-body">
            {
                appointments && appointments.map(appointment => <AppointmentCard key={appointment.id}
                                                                                 appointment={appointment}
                                                                                 onCancelAppointment={handleCancelAppointment}
                />)
            }
        </div>
    </div>
}