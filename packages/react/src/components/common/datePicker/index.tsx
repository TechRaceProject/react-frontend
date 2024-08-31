import './style.css';
import { useEffect, useState } from 'react';
import { DatePickerProps } from '~/interfaces/components/common/datePicker.interface';

function DatePicker({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
}: DatePickerProps) {
    const [today, setToday] = useState<string>('');

    useEffect(() => {
        const todayDate = new Date().toISOString().split('T')[0];
        setToday(todayDate);
    }, []);

    return (
        <div className="date-picker">
            <div className="date-picker-container">
                <label htmlFor="start-date">Start Date</label>
                <div>
                    <input
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => onStartDateChange(e.target.value)}
                        className="date-input"
                        max={endDate ? endDate : today}
                        required
                    />
                </div>
            </div>
            <div className="date-picker-container">
                <label htmlFor="end-date">End Date</label>
                <div>
                    <input
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => onEndDateChange(e.target.value)}
                        className="date-input"
                        min={startDate ? startDate : ''}
                        max={today}
                        required
                    />
                </div>
            </div>
        </div>
    );
}

export default DatePicker;
