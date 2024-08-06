import {useTranslation} from "react-i18next";
import {CheckIcon} from "@heroicons/react/24/outline";

export default function Price() {
    const {t} = useTranslation()
    return <section id="price" className="py-12">
        <div className="max-w-7xl mx-auto px-8 px-4 sm:px-6 text-center">
            <h1 className="text-3xl font-bold">{t("home.price.title")}</h1>
        </div>
        <div className="max-w-7xl mx-auto px-8 py-12 px-4 sm:px-6 lg:py-32">
            <div className="flex justify-center gap-14">
                <div className="card card-bordered min-w-96">
                    <div className="card-body">
                        <div className="card-title self-start flex flex-col">
                            <h2 className="text-2xl">{t("home.price.free.title")}</h2>
                            <h2 className="text-4xl">{t("home.price.free.price")}</h2>
                        </div>

                        <div className="flex flex-col gap-3 mt-5 text-base sm:text-lg min-h-80">
                            <div className="flex items-center gap-2"><CheckIcon
                                className="h-5 w-5 text-green-500"/><span>{t("home.price.free.props1")}</span>
                            </div>
                            <div className="flex items-center gap-2"><CheckIcon
                                className="h-5 w-5 text-green-500"/><span>{t("home.price.free.props2")}</span>
                            </div>
                            <div className="flex items-center gap-2"><CheckIcon
                                className="h-5 w-5 text-green-500"/><span>{t("home.price.free.props3")}</span>
                            </div>
                            <div className="flex items-center gap-2"><CheckIcon
                                className="h-5 w-5 text-green-500"/><span>{t("home.price.free.props4")}</span>
                            </div>
                        </div>
                        <div className="card-actions justify-center">
                            <button className="btn btn-neutral">{t("home.base.getStarted")}</button>
                        </div>
                    </div>
                </div>

                <div className="card card-bordered min-w-96">
                    <div className="card-body">
                        <div className="card-title self-start flex flex-col">
                            <h2 className="text-2xl">{t("home.price.standard.title")}</h2>
                            <h2 className="text-4xl">{t("home.price.standard.price")}</h2>
                        </div>

                        <div className="flex flex-col gap-3 mt-5 text-base sm:text-lg min-h-80">
                            <div className="flex items-center gap-2"><CheckIcon
                                className="h-5 w-5 text-green-500"/><span>{t("home.price.standard.props1")}</span>
                            </div>
                            <div className="flex items-center gap-2"><CheckIcon
                                className="h-5 w-5 text-green-500"/><span>{t("home.price.standard.props2")}</span>
                            </div>
                            <div className="flex items-center gap-2"><CheckIcon
                                className="h-5 w-5 text-green-500"/><span>{t("home.price.standard.props3")}</span>
                            </div>
                            <div className="flex items-center gap-2"><CheckIcon
                                className="h-5 w-5 text-green-500"/><span>{t("home.price.standard.props4")}</span>
                            </div>
                        </div>
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary">{t("home.base.getStarted")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}
