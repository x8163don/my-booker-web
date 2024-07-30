import {
    format,
} from 'date-fns-tz';
import {PhoneIcon, UserIcon} from "@heroicons/react/16/solid";
import {Cog6ToothIcon, EnvelopeIcon, PencilIcon} from "@heroicons/react/24/outline";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {createPortal} from "react-dom";

export default function AppointmentCard({appointment, onCancelAppointment}) {

    const {t} = useTranslation()
    const [showCancelConfirm, setShowCancelConfirm] = useState(false)

    const CancelConfirmModal = ({onConfirm}) => (
        <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="text-xl mb-4">{t('appointment.appointmentCard.cancel.title')}</h2>
                <p>{t('appointment.appointmentCard.cancel.message')}</p>
                <div className="mt-4 flex justify-end">
                    <button
                        className="btn btn-outline mr-2"
                        onClick={() => setShowCancelConfirm(false)}
                    >
                        {t('base.cancel')}
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={onConfirm}
                    >{t('base.confirm')}
                    </button>
                </div>
            </div>
        </div>
    );

    return <>
        <div className="card card-bordered">
            <div className="card-body">
                <details className="dropdown dropdown-end self-end">
                    <summary className="btn btn-ghost"><Cog6ToothIcon className="h-5 w-5"/></summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li onClick={() => setShowCancelConfirm(true)}>
                            <label className="label cursor-pointer">
                                    <span className="label-text"><PencilIcon
                                        className="inline h-4 w-4 mr-2"
                                    />{t('appointment.appointmentCard.cancel')}</span>
                            </label>
                        </li>
                    </ul>
                </details>
                <div className="flex flex-row">
                    <div className="flex flex-col gap-3 flex-1">
                        <p className="card-title text-blue-500 text-2xl py-4">{appointment.activity_name}</p>
                        <p className="text-gray-100">{t('appointment.appointmentCard.date')}: {format(appointment.start_time, "yyyy-MM-dd ('GMT'X)")}</p>
                        <p className="text-gray-100">{t('appointment.appointmentCard.time')}: {format(appointment.start_time, "HH:mm a")} ~ {format(appointment.end_time, "HH:mm a")}</p>
                        <div
                            className={"badge badge-lg " + (appointment.appointment_status === "Confirm" ? "badge-success" : "badge-error")}>{
                            t('appointment.appointmentCard.status.' + appointment.appointment_status)}</div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="flex flex-col gap-3 flex-0">
                        <p className="text-2xl py-4">{t('appointment.appointmentCard.contactInformation.title')}</p>
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-6 h-6"/>
                            <p className="text-gray-500">{appointment?.contact.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <PhoneIcon className="w-6 h-6"/>
                            <p className="text-gray-500">{appointment?.contact.phone_number}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <EnvelopeIcon className="w-6 h-6"/>
                            <p className="text-gray-500">{appointment?.contact.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {
            showCancelConfirm && createPortal(
                <CancelConfirmModal onConfirm={() => {
                    onCancelAppointment(appointment.id)
                    setShowCancelConfirm(false)
                }}/>,
                document.getElementById('modal-root'))
        }
    </>
}
