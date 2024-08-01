import {useTranslation} from "react-i18next";

export default function LanguageSelector({onLanguageChange, className}) {

    const {i18n} = useTranslation()

    const handleChangeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
        localStorage.setItem('language', e.target.value);
        if (onLanguageChange) {
            onLanguageChange(e.target.value)
        }
    };


    return <select
        className={"select select-bordered " + className}
        defaultValue={i18n.language}
        onChange={handleChangeLanguage}
    >
        <option value="en">English</option>
        <option value="zh-tw">繁體中文</option>
    </select>
}