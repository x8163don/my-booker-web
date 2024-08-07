import ActivityCard from "../../components/activity/ActivityCard";
import {useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {CACHE_KEY, DAY, MINUTE} from "../../utils/constants";
import {deleteActivity, listActivities, switchActivity} from "../../api/activity/activity";
import Loading from "../../components/ui/Loading";
import Error from "../../components/ui/Error";
import {InboxIcon, PlusIcon} from "@heroicons/react/24/outline";
import {queryClient} from "../../api";
import {sendToast, TOAST_TYPES} from "../../utils/toast";
import {me} from "../../api/customer";
import {useTranslation} from "react-i18next";

export default function Activity() {

    const navigate = useNavigate();
    const {t} = useTranslation()

    const {
        data: customer,
        isPending: isPendingAccounts,
        isError: isErrorAccounts
    } = useQuery({
        queryKey: [CACHE_KEY.ACCOUNT],
        queryFn: (signal) => me({signal: signal}),
        cacheTime: 1 * DAY,
        staleTime: 1 * DAY,
    })

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
            sendToast(TOAST_TYPES.ERROR, error.message)
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
            sendToast(TOAST_TYPES.ERROR, error.message)
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


    if (isPendingAccounts || isPendingActivities) {
        return <Loading/>
    }

    if (isErrorAccounts || isErrorActivities) {
        return <Error/>
    }


    return <div>
        <div className="flex justify-end mb-4">
            <button className="btn btn-primary text-white"
                    onClick={() => navigate('/activity/new')}>
                <PlusIcon className="w-5 h-5"/>
                {t('activity.index.new')}
            </button>
        </div>

        {
            activities && activities.length === 0 &&
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <InboxIcon className="h-16 w-16 text-gray-400 mb-4"/>
                <p className="text-lg text-gray-500">{t('activity.emptyState')}</p>
            </div>
        }

        <div className="grid grid-cols-3 gap-4">
            {
                activities && activities.map((activity) => <ActivityCard
                    key={activity.id}
                    customer={customer}
                    activity={activity}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onToggle={handleToggle}
                />)
            }
        </div>
    </div>
}
