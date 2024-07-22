import {useCallback, useEffect, useState} from "react";
import {
    toZonedTime,
    format,
} from 'date-fns-tz';
import {
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    isSameMonth,
    isSameDay,
} from 'date-fns';
import {ArrowLeftIcon, ArrowRightIcon,} from "@heroicons/react/24/outline";


export default function DatePicker({timezone, allowAppointments, onTimeSelected, onTimeZoneChange}) {

    const [availableTimesDic, setAvailableTimesDic] = useState({})
    const [currentSelectDate, setCurrentSelectDate] = useState(null)
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const updateAvailableTimes = useCallback(() => {
        const dic = {}
        allowAppointments.forEach((availableTime) => {
            const date = toZonedTime(new Date(availableTime), timezone)
            const key = format(date, 'yyyy-MM-dd')
            if (!dic[key]) {
                dic[key] = []
            }
            dic[key].push(date)
        })
        return dic
    }, [timezone, allowAppointments]);

    useEffect(() => {
        setAvailableTimesDic(updateAvailableTimes())
    }, [updateAvailableTimes])

    const renderHeader = () => {
        return (
            <div className="header flex justify-between items-center p-4">
                <button
                    className={isSameMonth(currentMonth, new Date()) ? 'invisible' : ''}
                    onClick={() => {
                        if (isSameMonth(currentMonth, new Date())) {
                            return
                        }
                        setCurrentMonth(subMonths(currentMonth, 1))
                    }}>
                    < ArrowLeftIcon className="h-5 w-5"/>
                </button>
                <span>{format(currentMonth, 'yyyy-MM')}
            </span>
                <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                    <ArrowRightIcon className="h-5 w-5"/>
                </button>
            </div>
        )
    };

    const renderDays = () => {
        return <div className="flex gap-2">
            <div className="flex-1 text-center">一</div>
            <div className="flex-1 text-center">二</div>
            <div className="flex-1 text-center">三</div>
            <div className="flex-1 text-center">四</div>
            <div className="flex-1 text-center">五</div>
            <div className="flex-1 text-center">六</div>
            <div className="flex-1 text-center">日</div>
        </div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart, {weekStartsOn: 1});
        const endDate = endOfWeek(monthEnd, {weekStartsOn: 1});

        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = '';

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, 'yyyy-MM-dd');
                const cloneDay = day;
                days.push(
                    <div className="h-12 flex-1 p-1">
                        <div className="indicator">
                            {availableTimesDic[formattedDate] && availableTimesDic[formattedDate].length > 0 && (
                                <span
                                    className="indicator-item indicator-bottom indicator-center badge badge-xs badge-success top-7"/>
                            )}
                            <div
                                className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer 
                            ${isSameDay(day, new Date()) ? 'bg-blue-500 text-white' : ''} ${
                                    isSameDay(day, currentSelectDate) ? 'bg-green-500 text-white' : ''
                                }`}
                                key={formattedDate}
                                onClick={() => setCurrentSelectDate(cloneDay)}
                            >
                                <span className="text-md font-semibold">{format(day, 'd')}</span>
                            </div>
                        </div>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="flex gap-2" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div>{rows}</div>;
    };

    return <div className="flex flex-col">
        <div className="calendar border rounded-lg h-fit p-4">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>

        <h2 className="text-2xl my-4">Select Time</h2>
        <div className="grid grid-cols-3 gap-2">
            {
                currentSelectDate &&
                availableTimesDic[format(currentSelectDate, 'yyyy-MM-dd')] &&
                availableTimesDic[format(currentSelectDate, 'yyyy-MM-dd')].length > 0 &&
                availableTimesDic[format(currentSelectDate, 'yyyy-MM-dd')].map((availableTime) => {
                    return <button className="btn btn-outline btn-md text-lg flex items-center space-x-2 group"
                                   key={format(availableTime, 'yyyy-MM-dd HH:mm')}
                                   onClick={() => {
                                       onTimeSelected(availableTime)
                                   }}
                    >
                        <span className="group-hover:hidden">{format(availableTime, 'hh:mm a')}</span>
                        <ArrowRightIcon className="h-5 w-5 hidden group-hover:block"/>
                    </button>
                })
            }
        </div>
    </div>
}