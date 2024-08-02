import {useTranslation} from "react-i18next";
import Logo from "../assets/logo/logo.svg";

export default function Sidebar() {
    const {t} = useTranslation();
    return (
        <div className="bg-gray-800 text-white w-52 flex-shrink-0 min-h-screen">
            <div className="p-4">
                <img src={Logo} alt="Logo" className="w-12 h-12"/>
            </div>
            <ul className="menu menu-vertical">
                <li>
                    <a className="block p-2 hover:bg-gray-700 text-md" href="/appointment">
                        {t('sidebar.myAppointment')}
                    </a>
                </li>
                <li>
                    <a className="block p-2 hover:bg-gray-700 text-md" href="/activity">
                        {t('sidebar.activity')}
                    </a>
                </li>
                <li>
                    <a className="block p-2 hover:bg-gray-700 text-md" href="/schedule">
                        {t('sidebar.schedule')}
                    </a>
                </li>
                <li>
                    <a className="block p-2 hover:bg-gray-700 text-md" href="/account">
                        {t('sidebar.account')}
                    </a>
                </li>
            </ul>
        </div>
    );
}