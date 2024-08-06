import {useTranslation} from "react-i18next";

export default function FAQ() {
    const {t} = useTranslation();
    return <section id="faq" className="py-12">
        <div className="max-w-7xl mx-auto px-8 py-12 px-4 sm:px-6 lg:py-32">
            <div className="text-center">
                <h2 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                    {t("home.faq.title")}
                </h2>
            </div>
            <div className="mt-10">
                <div class="space-y-4">
                    {
                        [1, 2, 3, 4, 5, 6].map((i) => (
                            <div class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                                <input type="checkbox" class="peer"/>
                                <div class="collapse-title text-xl font-medium">
                                    {t('home.faq.q' + i)}
                                </div>
                                <div class="collapse-content">
                                    <p>{
                                        t('home.faq.a' + i)
                                    } </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </section>
}