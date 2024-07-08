import ActivityCard from "../../components/activity/ActivityCard";
import {useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {CACHE_KEY, MINUTE} from "../../utils/constants";
import {deleteActivity, listActivities, switchActivity} from "../../api/activity/activity";
import Loading from "../../components/ui/Loading";
import Error from "../../components/ui/Error";
import {PlusIcon} from "@heroicons/react/24/outline";
import {queryClient} from "../../api";
import showAlert, {ALERT_TYPES} from "../../utils/alert";

export default function Activity() {

    const navigate = useNavigate();

    const {
        data: activities,
        isPending: isPendingActivities,
        isError: isErrorActivities
    } = useQuery({
        queryKey: [CACHE_KEY.ACTIVITIES],
        queryFn: (signal) => listActivities({signal}),
        cacheTime: 30 * MINUTE,
        staleTime: 30 * MINUTE
    })

    const {
        mutate: deleteActivityMutate
    } = useMutation({
        mutationFn: deleteActivity,
        onSuccess: (data) => {
            queryClient.invalidateQueries([CACHE_KEY.ACTIVITIES])
            queryClient.invalidateQueries([CACHE_KEY.ACTIVITY, data.activity_id])
        },
        onError: (error) => {
            showAlert(ALERT_TYPES.ERROR, error.message)
        }
    })

    const {
        mutate: toggleActivityMutate
    } = useMutation({
        mutationFn: switchActivity,
        onSuccess: (data) => {
            queryClient.invalidateQueries([CACHE_KEY.ACTIVITIES])
            queryClient.invalidateQueries([CACHE_KEY.ACTIVITY, data.activity_id])
        },
        onError: (error) => {
            showAlert(ALERT_TYPES.ERROR, error.message)
        }
    })

    const handleEdit = (activityID) => {
        navigate('/activity/' + activityID + '/edit')
    }

    const handleDelete = (activityID) => {
        deleteActivityMutate({id: activityID})
    }


    const handleToggle = (activityID, isOpen) => {
        toggleActivityMutate({id: activityID, isOpen: isOpen})
    }


    if (isPendingActivities) {
        return <Loading/>
    }

    if (isErrorActivities) {
        return <Error/>
    }


    return <div>
        <div className="flex justify-end mb-4">
            <button className="btn btn-primary text-white"
                    onClick={() => navigate('/activity/new')}>
                <PlusIcon className="w-5 h-5"/>
                New
            </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
            {activities && activities.map((activity) => <ActivityCard
                key={activity.id}
                activity={activity}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onToggle={handleToggle}
            />)
            }
        </div>
    </div>
}
