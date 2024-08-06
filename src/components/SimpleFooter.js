import LanguageSelector from "./base/LanguageSelector";
import {GlobeAsiaAustraliaIcon} from "@heroicons/react/16/solid";
import Logo from "../assets/logo/logo.svg";
import {Link} from "react-router-dom";

export default function SimpleFooter() {
    return <footer
        className="absolute bottom-0 h-16 footer items-center p-4 text-center">
        <div className="container mx-auto max-w-7xl flex justify-between items-center">
            <aside className="flex items-center">
                <Link to="/">
                    <img src={Logo} alt="Logo" className="w-8 h-8"/>
                </Link>
                <p className="ml-2">Copyright © {new Date().getFullYear()} - All rights reserved</p>
            </aside>
            <aside className="flex justify-end w-auto items-center gap-2">
                <GlobeAsiaAustraliaIcon className="w-5 h-5"/>
                <LanguageSelector className="select-sm"/>
            </aside>
        </div>
    </footer>
}
