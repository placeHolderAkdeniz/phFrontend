import React, { useRef, useState } from 'react';
import moment, { Moment } from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

interface DatePickerProps {
  onDatesChange: (startDate: Moment, endDate: Moment) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDatesChange }) => {
  const keyRef = useRef<any>();
  const [dates, setDates] = useState({
    startDate: moment(),
    endDate: moment().add(1, 'day')
  });

  const handleApply = (event: any, picker: any) => {
    setDates({
      startDate: picker.startDate,
      endDate: picker.endDate
    });
    onDatesChange(picker.startDate, picker.endDate);
  };

  const handleCancel = (event: any, picker: any) => {
    picker.element.val('');
  };

  return (
    <DateRangePicker
      ref={keyRef}
      onApply={handleApply}
      onCancel={handleCancel}
      initialSettings={{
        minDate: moment(),
        startDate: dates.startDate,
        endDate: dates.endDate
      }}
    >
      <input type="text" className="form-control col-4" />
    </DateRangePicker>
  );
};

export default DatePicker;
