import {useState} from "react";
import Logo from "../../assets/logo/logo.svg"
import Menu from "../../assets/navbar/menu.svg"
import Close from "../../assets/navbar/close.svg"
import {useTranslation} from "react-i18next";
import Cookies from "js-cookie";
import LanguageSelector from "../base/LanguageSelector";
import {GlobeAsiaAustraliaIcon} from "@heroicons/react/16/solid";

const classes = {
    sectionItem: "relative text-gray-800 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium after:content-[''] after:block after:w-full after:h-0.5 after:bg-gray-800 after:mt-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
}

export default function Navbar() {
    const {t} = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleGetStarted = () => {
        if (!Cookies.get("token")) {
            window.location.href = "/login";
        } else {
            window.location.href = "/activity";
        }
    }

    return (
        <nav className="shadow-sm">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400"
                            aria-controls="mobile-menu"
                            onClick={toggleMenu}
                        >
                            <span className="sr-only"></span>
                            {menuOpen ? <img src={Close} className="block w-6 h-6"/> :
                                <img src={Menu} className="block w-6 h-6"/>}
                        </button>
                    </div>
                    <div className="flex items-center gap-2 min-w-28">
                        <a href="">
                                <span>
                                <img src={Logo} className="block w-10 h-10"/>
                                </span>
                        </a>
                        <div>MyBooker</div>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden mx-auto sm:block">
                            <div className="flex space-x-4">
                                <a href="#demo" className={classes.sectionItem}>{t("home.navbar.demo")}</a>
                                <a href="#price" className={classes.sectionItem}>{t("home.navbar.price")}</a>
                                <a href="#faq" className={classes.sectionItem}>{t("home.navbar.faq")}</a>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-8">
                        <div className="flex gap-2 items-center">
                            <GlobeAsiaAustraliaIcon className="w-5 h-5"/>
                            <LanguageSelector className="select-sm"/>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={handleGetStarted}>
                            {t("home.base.getStarted")}
                        </button>
                    </div>
                </div>
            </div>

            {menuOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="flex flex-col px-2 pt-2 pb-3">
                        <a href="#demo" className={classes.sectionItem}>{t("home.navbar.demo")}</a>
                        <a href="#price" className={classes.sectionItem}>{t("home.navbar.price")}</a>
                        <a href="#faq" className={classes.sectionItem}>{t("home.navbar.faq")}</a>
                    </div>
                </div>
            )}
        </nav>
    );
}
