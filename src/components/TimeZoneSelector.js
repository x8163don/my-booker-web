import TimezoneSelect from "react-timezone-select"
import {useState} from "react";

export default function TimeZoneSelector({currentTimeZone, onTimeZoneChange}) {

    const [timezone, setTimezone] = useState(currentTimeZone);

    const handleTimezoneChange = (timezone) => {
        setTimezone(timezone)
        onTimeZoneChange(timezone)
    };

    return <TimezoneSelect
        value={timezone}
        onChange={handleTimezoneChange}
    />
}