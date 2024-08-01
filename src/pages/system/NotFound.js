import Logo from "../../assets/logo/logo.svg";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function NotFound() {
    const {t} = useTranslation()

    return <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-1/3 mb-4 h-12 w-12">
            <img src={Logo} alt="404 not found"/>
        </div>

        <h3>{t('system.notFound')}</h3>
        <button className="btn btn-primary mt-6">
            <NavLink to="/">{t('system.action.backToHomePage')}</NavLink>
        </button>
    </div>
}