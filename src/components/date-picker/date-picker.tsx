import ru from 'date-fns/locale/ru';
import { FC, memo } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './date-picker.scss';

export const DatePicker: FC<{
  disabled?: boolean;
  startDate?: Date;
  endDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  onChange: (range: [Date, Date]) => void;
}> = memo(({ startDate, endDate, onChange, minDate, maxDate = new Date(), disabled }) => {
  return (
    <div className="date-picker">
      <ReactDatePicker
        className="date-picker__control"
        selectsRange
        selected={endDate}
        startDate={startDate}
        endDate={endDate}
        maxDate={maxDate}
        minDate={minDate}
        onChange={onChange}
        locale={ru}
        disabled={disabled}
        disabledKeyboardNavigation
      />
    </div>
  );
});
