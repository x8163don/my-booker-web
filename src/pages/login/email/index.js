import {useTranslation} from "react-i18next";
import Logo from "../../../assets/logo/logo.svg";

export default function Email() {

    const {t} = useTranslation()

    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="card card-bordered w-full max-w-md p-8 shadow-lg rounded-lg">
                <div className="flex flex-col items-center">
                    <img src={Logo} alt="Logo" className="w-16 h-16"/>
                    <h1 className="text-3xl font-semibold mt-4 text-center">{t('login.email.title')}</h1>
                    <p className="text-lg mt-2 text-center">{t('login.email.message')}</p>
                </div>
            </div>
        </main>
    );
}
