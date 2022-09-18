import type { Moment } from 'moment';

interface VideoDatePickerProps {
    value: Moment;
    onChange: (value: Moment, dateString: string) => void;
}
