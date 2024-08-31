import { HistoryRaceFieldProps } from '~/interfaces/other/race.interface';

const HistoryRaceField = ({ value, unit }: HistoryRaceFieldProps) => {
    return (
        <div className="race-item-field">
            <p>
                {value != null
                    ? `${value}${unit ? ` ${unit}` : ''}`
                    : 'Not available'}
            </p>
        </div>
    );
};

export default HistoryRaceField;
