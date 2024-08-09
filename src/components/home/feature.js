import {useTranslation} from "react-i18next";
import {BellIcon, CalendarIcon, ClockIcon} from "@heroicons/react/24/outline";

export default function Feature() {
    const {t} = useTranslation();
    return <section id="feature" className="py-12">
        <div className="max-w-7xl mx-auto px-8 py-12 px-4 sm:px-6 lg:py-32">
            <div className="text-center">
                <h2 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                    {t("home.feature.title")}
                </h2>
            </div>

            <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
                <div className="card">
                    <ClockIcon className="h-20 w-20 self-center"/>
                    <div className="card-body items-center">
                        <h3 className="card-title">{t("home.feature.feature1.title")}</h3>
                        <p className="card-text">{t("home.feature.feature1.description")}</p>
                    </div>
                </div>
                <div className="card">
                    <BellIcon className="h-20 w-20 self-center"/>

                    <div className="card-body items-center">
                        <h3 className="card-title">{t("home.feature.feature2.title")}</h3>
                        <p className="card-text">{t("home.feature.feature2.description")}</p>
                    </div>
                </div>
                <div className="card">
                    <CalendarIcon className="h-20 w-20 self-center"/>
                    <div className="card-body items-center">
                        <h3 className="card-title">{t("home.feature.feature3.title")}</h3>
                        <p className="card-text">{t("home.feature.feature3.description")}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
}