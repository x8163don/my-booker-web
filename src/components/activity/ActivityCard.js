import {Cog6ToothIcon, DocumentDuplicateIcon, PencilIcon, TrashIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import {createPortal} from "react-dom";

export default function ActivityCard({activity, onEdit, onDelete, onToggle}) {

    const [showDeleteConfirmModel, setShowDeleteConfirmModel] = useState(false)

    const DeleteConfirmModal = ({onConfirm}) => (
        <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="text-xl mb-4">Confirm Deletion</h2>
                <p>Are you sure you want to delete this activity?</p>
                <div className="mt-4 flex justify-end">
                    <button
                        className="btn btn-outline mr-2"
                        onClick={() => setShowDeleteConfirmModel(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={onConfirm}
                    > Confirm
                    </button>
                </div>
            </div>
        </div>
    );

    return <>
        <div className="card bg-neutral">
            <div className="card-body">
                <div className="flex justify-between items-center">
                    <div className="card-title">
                        {activity.name}
                    </div>

                    <details className="dropdown dropdown-end">
                        <summary className="btn btn-ghost"><Cog6ToothIcon className="h-5 w-5"/></summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li onClick={() => onEdit(activity.id)}>
                                <label className="label cursor-pointer">
                                    <span className="label-text"> <PencilIcon
                                        className="inline h-4 w-4 mr-2"/>Edit</span>
                                </label>
                            </li>
                            <li onClick={() => setShowDeleteConfirmModel(true)}>
                                <label className="label cursor-pointer">
                                    <span className="label-text"> <TrashIcon
                                        className="inline h-4 w-4 mr-2"/>Delete</span>
                                </label>
                            </li>
                            <div className="divider my-0"></div>
                            <li><label className="label cursor-pointer">
                                <span className="label-text">On/Off</span>
                                <input type="checkbox" className="toggle toggle-primary"
                                       defaultChecked={activity.is_open}
                                       onChange={(e) => onToggle(activity.id, e.target.checked)}
                                />
                            </label></li>
                        </ul>
                    </details>
                </div>
                <div className="divider my-0"></div>
                <div className="py-4 flex flex-col gap-4 ">
                    <div>
                        {activity.duration},{activity.activity_type}
                    </div>
                    <a className="link link-primary">View Booking Page</a>
                </div>
                <div className="divider my-0"></div>
                <div className="card-actions justify-between">
                    <button className="btn btn-primary text-white">
                        <DocumentDuplicateIcon className="h-5 w-5"/>
                        Copy link
                    </button>
                </div>
            </div>
        </div>

        {showDeleteConfirmModel && createPortal(
            <DeleteConfirmModal onConfirm={() => {
                onDelete(activity.id)
                setShowDeleteConfirmModel(false)
            }

            }/>,
            document.getElementById('modal-root')
        )}
    </>
}