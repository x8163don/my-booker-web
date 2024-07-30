import {useTranslation} from "react-i18next";

export default function Email() {

    const {t} = useTranslation()

    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="bg-gray-700 w-full max-w-md p-8 shadow-lg rounded-lg">
                <div className="flex flex-col items-center">
                    {/*<Image src={Logo} alt="Website Logo" width={100} height={100}/>*/}
                    <h1 className="text-3xl font-semibold mt-4 text-center">{t('login.email.title')}</h1>
                    <p className="text-lg mt-2 text-center">{t('login.email.message')}</p>
                </div>
            </div>
        </main>
    );
}
