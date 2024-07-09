import {createPortal} from "react-dom";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "../../../api";
import {createActivity} from "../../../api/activity/activity";
import {TOAST_TYPES, sendToast} from "../../../utils/toast";
import {CACHE_KEY} from "../../../utils/constants";

const CUSTOM = 'custom'

export default function ActivityNew() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch
    } = useForm({
        defaultValues: {
            title: '',
            duration: 15,
            customDuration: 0
        }
    })

    const duration = watch("duration");

    const {
        mutate: createActivityMutate,
        isPending: isPendingCreateActivity
    } = useMutation({
        mutationFn: createActivity,
        onSuccess: (data) => {
            queryClient.invalidateQueries([CACHE_KEY.ACTIVITY])
            navigate('/activity/' + data.id + '/edit')
        },
        onError: (error) => {
            sendToast(TOAST_TYPES.ERROR, error.message)
        }
    })


    const onSubmit = async (data) => {
        const activityDuration = data.duration === CUSTOM ? +data.customDuration : +data.duration

        createActivityMutate({
            title: data.title,
            duration: activityDuration
        })
    }

    const handleClose = () => {
        navigate('/activity')
    }

    return createPortal(<div className="modal modal-open" role="dialog">
            <div className="modal-box">
                <div className="modal-top">
                    <h3 className="text-2xl font-bold mb-4">Let we know your activity...</h3>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="label">
                            <span className="label-text">Activity Name</span>
                        </label>
                        <input type="text"
                               className={"input input-bordered w-full" + (errors.title ? ' input-error' : '')}
                               placeholder="Title"
                               {...register("title", {required: true})}
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Duration</span>
                        </label>
                        <select {...register("duration")}
                                className="select select-bordered w-full max-w-xs">
                            <option value={15}>15 min</option>
                            <option value={30}>30 min</option>
                            <option value={45}>45 min</option>
                            <option value={60}>1 hour</option>
                            <option value={90}>1.5 hour</option>
                            <option value={120}>2 hour</option>
                            <option value={CUSTOM}>Others</option>
                        </select>
                    </div>
                    <div className={"flex gap-2" + (duration === CUSTOM ? '' : ' hidden')}>
                        <input type="number" className="input input-bordered" {...register("customDuration", {
                            min: 0,
                            max: 720
                        })}/>
                        <label className="label"> <span className="label-text">Minutes</span> </label>
                    </div>

                    <div className="modal-action">
                        <button className="btn btn-outline" onClick={handleClose}>Cancel</button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isPendingCreateActivity}
                        >{isPendingCreateActivity ? <span className="loading loading-spinner"></span> : 'New'}</button>
                    </div>
                </form>
            </div>
            <div className="modal-backdrop" onClick={handleClose}></div>
        </div>
        , document.getElementById('modal-root'))
}