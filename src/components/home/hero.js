import {CheckIcon} from "@heroicons/react/24/outline";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {AnimatedList} from "../ui/AnimatedList";
import {cn} from "../../utils/cn";
import {useEffect, useState} from "react";


export default function Hero() {
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();

    const [conversations, setConversations] = useState([])

    useEffect(() => {
        setConversations([
            {
                name: t("home.hero.conversations.customer"),
                description: t("home.hero.conversations1"),
                time: t("home.hero.conversations.minuteAgo", {minutes: 10}),
                icon: "👤",
                color: "#FFB800",
            },
            {
                name: t("home.hero.conversations.you"),
                description: t("home.hero.conversations2"),
                time: t("home.hero.conversations.fewSecondsAgo"),
                icon: "👤",
                color: "#00C9A7",
            },
            {
                name: t("home.hero.conversations.customer"),
                description: t("home.hero.conversations3"),
                time: t("home.hero.conversations.fewSecondsAgo"),
                icon: "👤",
                color: "#FFB800",
            },
            {
                name: t("home.hero.conversations.you"),
                description: t("home.hero.conversations4"),
                time: t("home.hero.conversations.fewSecondsAgo"),
                icon: "👤",
                color: "#00C9A7",
            },
            {
                name: t("home.hero.conversations.customer"),
                description: t("home.hero.conversations5"),
                time: t("home.hero.conversations.fewSecondsAgo"),
                icon: "👤",
                color: "#FFB800",
            },
            {
                name: t("home.hero.conversations.you"),
                description: t("home.hero.conversations6"),
                time: t("home.hero.conversations.fewSecondsAgo"),
                icon: "👤",
                color: "#00C9A7",
            },
            {
                name: t("home.hero.conversations.customer"),
                description: t("home.hero.conversations7"),
                time: t("home.hero.conversations.fewSecondsAgo"),
                icon: "👤",
                color: "#FFB800",
            },
            {
                name: t("home.hero.conversations.customer"),
                description: t("home.hero.conversations8"),
                time: t("home.hero.conversations.fewSecondsAgo"),
                icon: "👤",
                color: "#FFB800",
            },
        ])

    }, [i18n.language]);

    return <section id="hero" className="max-w-7xl mx-auto px-8 py-12 px-4 sm:px-6 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex flex-col justify-center gap-10 lg:gap-14 w-full lg:w-1/2 px-5 lg:mb-0">
                <h1 className="font-medium text-2xl lg:text-4xl tracking-tight md:-mb-4 flex flex-col">
                    <span>{t("home.hero.title")}</span>
                    <span className="text-primary">{t("home.hero.description")}</span>
                </h1>

                <div className="flex flex-col gap-1 mt-5 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
                    <div className="flex items-center gap-2"><CheckIcon
                        className="h-5 w-5 text-green-500"/><span>{t("home.hero.props1")}</span>
                    </div>
                    <div className="flex items-center gap-2"><CheckIcon
                        className="h-5 w-5 text-green-500"/><span>{t("home.hero.props2")}</span>
                    </div>
                    <div className="flex items-center gap-2"><CheckIcon
                        className="h-5 w-5 text-green-500"/><span>{t("home.hero.props3")}</span></div>
                </div>

                <div>
                    <button className="btn btn-primary"
                            onClick={() => navigate("/login")}>{t("home.base.getStarted")}</button>
                    <a href="#demo" className="btn btn-outline btn-secondary ml-4">{t("home.base.learnMore")}</a>
                </div>
            </div>

            <div className="w-full lg:w-1/2 mt-8 lg:mt-0 flex justify-center lg:justify-end">
                <div
                    className={cn(
                        "relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg border bg-background md:shadow-xl",
                    )}
                >
                    <AnimatedList delay={1500}>
                        {conversations.map((item, idx) => (
                            <Notification {...item} key={idx}/>
                        ))}
                    </AnimatedList>
                </div>
            </div>
        </div>
    </section>
}

const Notification = ({name, description, icon, color, time}) => {
    return (
        <figure
            className={cn(
                "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
                // animation styles
                "transition-all duration-200 ease-in-out hover:scale-[103%]",
                // light styles
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                // dark styles
                "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <div
                    className="flex min-h-10 min-w-10 h-10 w-10 items-center justify-center rounded-2xl"
                    style={{
                        backgroundColor: color,
                    }}
                >
                    <span className="text-lg">{icon}</span>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption
                        className="flex flex-row items-center whitespace-pre text-lg font-medium text-gray-800 dark:text-white">
                        <span className="text-sm sm:text-lg text-gray-500">{name}</span>
                        <span className="mx-1">·</span>
                        <span className="text-xs text-gray-500">{time}</span>
                    </figcaption>
                    <p className="text-lg text-gray-700 font-normal">
                        {description}
                    </p>
                </div>
            </div>
        </figure>
    );
};