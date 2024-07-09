import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {check} from "../../../api/auth/auth";
import Cookies from 'js-cookie';
import {TOAST_TYPES, sendToast} from "../../../utils/toast";
import {ToastContainer} from "react-toastify";
import {useMutation} from "@tanstack/react-query";
import {createCustomer} from "../../../api/customer";


export default function Auth() {

    const navigate = useNavigate();
    const location = useLocation()

    const {
        mutate: createCustomerMutate,
    } = useMutation({
        mutationFn: ({signal}) => createCustomer({signal: signal}),
        onSuccess: () => {
            navigate("/activity");
        },
        onError: (error) => {
            sendToast(TOAST_TYPES.ERROR, error.message)
            Cookies.remove('token');
            navigate('/login');
        }
    })

    useEffect(() => {

        const verifyToken = async () => {

            const searchParams = new URLSearchParams(location.search)

            const token = searchParams.get('token')

            if (!token) {
                navigate('/login?error=ErrTokenInvalid');
            }

            const resp = await check(token)

            if (resp.ok) {
                Cookies.set('token', token);
                createCustomerMutate({})
            } else {
                sendToast(TOAST_TYPES.ERROR, "ErrTokenInvalid")
                Cookies.remove('token');
                navigate('/login');
            }
        }
        verifyToken()
    }, [])


    return <main className="min-h-screen flex items-center justify-center">
        <div className="card bg-gray-700 max-w-md p-8 shadow-lg rounded-lg">
            <div className="card-body">

                <div className="avatar mb-8 flex justify-center">
                    <div className="w-24 rounded">
                        {/*TODO*/}
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                    </div>
                </div>
                <div className="mx-auto">
                    <span className="loading loading-spinner text-primary loading-lg"></span>
                </div>
            </div>
        </div>
        <ToastContainer/>

    </main>
}