import {useLocation} from 'react-router-dom';
import {useTranslation} from "react-i18next";

export default function Sidebar() {
    const location = useLocation()
    const {t} = useTranslation();
    return (
        <div className="bg-gray-800 text-white w-52 flex-shrink-0 min-h-screen">
            <div className="p-4">
                {/*TODO*/}
                <h2 className="text-xl font-bold">側邊欄</h2>
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