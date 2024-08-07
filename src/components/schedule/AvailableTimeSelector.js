import {Calendar, momentLocalizer} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import {useEffect, useState} from "react";
import moment from "moment/moment";
import "./AvailableTimeSelector.css"
import {useTranslation} from "react-i18next";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar)

export default function AvailableTimeSelector({availableTimes, onEventsChange}) {
    const {t} = useTranslation()
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (!availableTimes || Object.keys(availableTimes).length === 0) {
            return;
        }

        const initEvents = availableTimes.map((availableTime) => {
            const today = new Date();
            return {
                title: '',
                start: new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + availableTime.weekday, availableTime.start_hour, availableTime.start_minute),
                end: new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + availableTime.weekday, availableTime.end_hour, availableTime.end_minute),
                allDay: false,
            }
        })
        setEvents(initEvents)
    }, [availableTimes]);

    useEffect(() => {
        const availableTimes = events.map((event) => {
            return {
                weekday: event.start.getDay(),
                start_hour: event.start.getHours(),
                start_minute: event.start.getMinutes(),
                end_hour: event.end.getHours(),
                end_minute: event.end.getMinutes(),
            }
        })

        onEventsChange(availableTimes)
    }, [events, onEventsChange]);


    const handleSelectSlot = ({start, end}) => {
        const today = new Date();
        const day = start.getDay(); // 0 (Sunday) to 6 (Saturday)
        const startHour = start.getHours();
        const endHour = end.getHours();

        const currentWeekDay = today.getDay();
        const startDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - currentWeekDay + day,
            startHour
        );
        const endDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - currentWeekDay + day,
            endHour
        );

        // Check for overlapping events
        const isOverlapping = events.some(event =>
            (startDate < event.end && endDate > event.start)
        );

        if (isOverlapping) {
            return;
        }

        const newEvent = {
            title: '',
            start: startDate,
            end: endDate,
            allDay: false,
        };

        setEvents([...events, newEvent]);
    };

    const handleEventResize = ({event, start, end}) => {
        const updatedEvents = events.map((evt, index) =>
            evt === event ? {...evt, start, end} : evt
        );
        setEvents(updatedEvents);
    };

    const handleEventDrop = ({event, start, end}) => {
        const updatedEvents = events.map((evt, index) =>
            evt === event ? {...evt, start, end} : evt
        );
        setEvents(updatedEvents);
    };

    const handleDeleteEvent = (event) => {
        const updatedEvents = events.filter((evt) => evt !== event);
        setEvents(updatedEvents);
    };

    const EventComponent = ({event}) => {
        return (
            <div className="w-full relative">
                <button
                    className="absolute right-0 btn btn-circle btn-xs"
                    style={{"top": "-20px"}}
                    onClick={() => handleDeleteEvent(event)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        );
    };

    const handleEventPropGetter = (event) => {
        return {
            className: ["bg-success"]
        };
    };

    const TimeSlotWrapper = ({children, value}) => {
        return (
            <div className={`time-slot-wrapper`}>
                {children}
            </div>
        );
    };

    return <DnDCalendar
        localizer={localizer}
        events={events}
        resizable={true}
        selectable={true}
        draggableAccessor={(event) => true}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={['week']}
        showMultiDayTimes={false}
        toolbar={false}
        onSelectSlot={handleSelectSlot}
        onEventResize={handleEventResize}
        onEventDrop={handleEventDrop}
        eventPropGetter={handleEventPropGetter}
        components={{
            event: EventComponent,
            timeSlotWrapper: TimeSlotWrapper
        }}
        formats={{
            timeGutterFormat: 'HH:mm',
            dayFormat: (date, culture, localizer) => t(`base.week.${moment(date).format('dddd').toLowerCase()}`),
        }}
        style={{height: 700}}
    />
}


