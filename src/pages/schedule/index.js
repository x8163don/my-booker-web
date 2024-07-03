import {useMutation, useQuery} from "@tanstack/react-query";
import {createSchedule, listSchedules} from "../../api/schedule/schedule";
import Loading from "../../components/ui/Loading";
import Error from "../../components/ui/Error";
import {useRef, useState} from "react";
import {queryClient} from "../../api";

const CACHE_TIME = 30 * 60 * 1000;
export default function Schedule() {

    const nameInputRef = useRef();
    const [isNameInputError, setIsNameInputError] = useState(false);

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['schedules'],
        queryFn: (signal) => listSchedules({signal}),
        staleTime: CACHE_TIME,
        cacheTime: CACHE_TIME
    });

    const {
        mutate: createScheduleMutate,
        isPending: isPendingCreateSchedule

    } = useMutation({
        mutationFn: createSchedule,
        onSuccess: () => {
            nameInputRef.current.value = ''
            setIsNameInputError(false)
            queryClient.invalidateQueries(['schedules'])
        }
    })

    if (isLoading) {
        return <Loading/>
    }

    if (isError) {
        console.log(error)
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


    return <div>

        <input ref={nameInputRef}
               type="text"
               placeholder="Schedule Name"
               className={"input input-bordered w-full max-w-xs mr-2" + (isNameInputError ? " input-error" : "")}/>

        <button className={"btn btn-primary text-white"}
                onClick={newScheduleHandler}
                disabled={isPendingCreateSchedule}
        >
            {isPendingCreateSchedule ? <span className="loading loading-spinner text-primary"/> : "New"}
        </button>


        <div role="tablist" className="tabs tabs-lifted tabs-lg">
            {
                data.schedules.map((schedule) => {
                    return <>
                        <input type="radio"
                               name="schedule-tabs"
                               role="tab"
                               className="tab"
                               aria-label={schedule.name}
                                defaultChecked={schedule.id === data.schedules[0].id}
                        />
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                            {schedule.id}
                        </div>
                    </>
                })
            }
        </div>
    </div>
}

