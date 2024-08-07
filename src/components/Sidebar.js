import {useTranslation} from "react-i18next";
import Logo from "../assets/logo/logo.svg";
import {BriefcaseIcon, ClockIcon, UserIcon, CalendarIcon} from "@heroicons/react/24/outline";
import {useLocation} from "react-router-dom";

export default function Sidebar() {
    const {t} = useTranslation();
    const location = useLocation();
    const currentPath = location.pathname;
    console.log(currentPath);

    return (
        <div className="border-2 w-52 flex-shrink-0 min-h-screen">
            <div className="p-4">
                <img src={Logo} alt="Logo" className="w-12 h-12"/>
            </div>
            <ul className="menu rounded-box gap-2">
                <li>
                    <a className={currentPath === '/appointment' ? 'focus' : ''}
                       href="/appointment">
                        <CalendarIcon className="h-5 w-5"></CalendarIcon>
                        {t('sidebar.myAppointment')}
                    </a>
                </li>
                <li>
                    <a className={currentPath === '/activity' ? 'focus' : ''}
                       href="/activity">
                        <BriefcaseIcon className="h-5 w-5"></BriefcaseIcon>
                        {t('sidebar.activity')}
                    </a>
                </li>
                <li>
                    <a className={currentPath === '/schedule' ? 'focus' : ''}
                        href="/schedule">
                        <ClockIcon className="h-5 w-5"></ClockIcon>
                        {t('sidebar.schedule')}
                    </a>
                </li>
                <li>
                    <a className={currentPath === '/account' ? 'focus' : ''}
                        href="/account">
                        <UserIcon className="h-5 w-5"></UserIcon>
                        {t('sidebar.account')}
                    </a>
                </li>
            </ul>
        </div>
    );
}