import type { Moment } from 'moment';

interface VideoTimePickerProps {
    value: [Moment, Moment];
    onChange: (value: [Moment, Moment], dateString: [string, string]) => void;
}
