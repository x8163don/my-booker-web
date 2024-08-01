import {useForm} from "react-hook-form";
import {EnvelopeIcon} from "@heroicons/react/24/outline";
import {useMutation} from "@tanstack/react-query";
import {login} from "../../api/auth/auth";
import {useNavigate} from "react-router-dom";
import {TOAST_TYPES, sendToast} from "../../utils/toast";
import {ToastContainer} from "react-toastify";
import {useTranslation} from "react-i18next";
import Logo from "../../assets/logo/logo.svg";

export default function Login() {

    const navigate = useNavigate()
    const {t} = useTranslation()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {email: '',}
    })

    const {
        mutate: emailLoginMutate,
        isPending
    } = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            navigate("/login/email")
        },
        onError: (error) => {
            sendToast(TOAST_TYPES.ERROR, error.message)
        }
    });

    const handleLoginWithEmail = (data) => {
        emailLoginMutate(data.email, "", "email")
    }
    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="bg-gray-700 w-full max-w-md p-8 shadow-lg rounded-lg">
                <div className="mb-8 flex justify-center">
                    <div className="w-24 h-24 rounded">
                        <img alt="logo" src={Logo}/>
                    </div>
                </div>
                <form onSubmit={handleSubmit(handleLoginWithEmail)}>
                    <div className="mb-4">
                        <label
                            className={"input input-bordered flex items-center gap-2 " + (errors.email ? "input-error" : "")}>
                            <EnvelopeIcon className="w-5 h-5"/>
                            <input type="email" className="grow" placeholder="Email" {...register("email", {
                                required: true, pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,}
                            })}/>
                        </label></div>
                    <button
                        type="submit"
                        className="w-full btn btn-primary text-white text-lg"
                        disabled={isPending}
                    >
                        {
                            isPending ? <span className="loading loading-spinner text-white"/> : t('login.index.continue')
                        }
                    </button>
                </form>
            </div>
            <ToastContainer/>
        </main>
    );
}