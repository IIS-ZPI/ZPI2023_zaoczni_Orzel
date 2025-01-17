import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  CalendarEventFill,
  ChevronLeft,
  ChevronRight,
} from "@styled-icons/bootstrap";
import { useBlur } from "../hooks/useBlur";
import {
  Wrapper,
  InputWrapper,
  InputInner,
  InputSpace,
  InputInnerLabel,
  InputInnerValue,
} from "./Input";

const InputCalendarIcon = styled(CalendarEventFill)`
  height: 16px;
  font-size: 16px;
`;

const Calendar = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
`;

const CalendarHeaderPicker = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const CalendatHeaderPickerSelect = styled.select`
  border: none;
  color: rgba(0, 0, 0, 0.75);
  font-size: 12px;
  font-weight: 600;
`;

const CalendarHeaderPickerPrevIcon = styled(ChevronLeft)`
  color: rgba(0, 0, 0, 0.75);
  height: 14px;
`;

const CalendarHeaderPickerNextIcon = styled(ChevronRight)`
  color: rgba(0, 0, 0, 0.75);
  height: 14px;
`;

const CalendarPickerButton = styled.button`
  background: none;
  line-height: 1;
  padding: 2px;
  border: none;
  font-size: 16px;
  height: 20px;
  width: 20px;
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #f2f7ff;
  }
`;

const CalendarPickerPrev = styled(CalendarPickerButton).attrs({
  children: <CalendarHeaderPickerPrevIcon />,
})``;

const CalendarPickerNext = styled(CalendarPickerButton).attrs({
  children: <CalendarHeaderPickerNextIcon />,
})``;

const CalendarBody = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 10px;
`;

const Day = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 100px;
  margin: 4px;

  &:hover {
    background: #f2f7ff;
  }

  &.selected {
    background: #f2f7ff;
  }

  &.disabled {
    color: #ccc;
    pointer-events: none;
  }
`;

const WeekDays = styled.span`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  padding: 5px 10px;
`;

const CalendarActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  padding-top: 0;
`;

const CalendarActionButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 20px;
  font-weight: 500;
  padding: 5px 10px;
  display: flex;

  &:hover {
    background: #f2f7ff;
  }
`;

const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
const monthsStr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const daysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

const firstDayOfMonth = (year: number, month: number) =>
  new Date(year, month, 1).getDay();

const generateDaysOfMonth = (
  currentMonth: Date,
  minDate?: Date,
  maxDate?: Date
) => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = firstDayOfMonth(year, month);
  const daysCount = daysInMonth(year, month);
  const daysPrevCount = daysInMonth(year, month - 1);

  const days = Array<{
    day: number;
    disabled: boolean;
  }>();

  for (let i = daysPrevCount - firstDay; i <= daysPrevCount; i++) {
    days.push({ day: i, disabled: true });
  }

  for (let i = 1; i <= daysCount; i++) {
    if (minDate && new Date(year, month, i) < minDate) {
      days.push({ day: i, disabled: true });
      continue;
    }
    if (maxDate && new Date(year, month, i) > maxDate) {
      days.push({ day: i, disabled: true });
      continue;
    }
    days.push({ day: i, disabled: false });
  }

  for (let i = 1; days.length < 42; i++) {
    days.push({ day: i, disabled: true });
  }

  return days;
};

type DatePickerProps = {
  label: string;
  value: Date;
  onChange: (value: Date) => void;
  minDate?: Date;
  maxDate?: Date;
};

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value: date,
  onChange: onDateSelect,
  minDate,
  maxDate,
}) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const toggleCalendar = () => {
    setShowCalendar((val) => !val);
    setCurrentDate(date);
  };

  const setDate = (date: Date) => {
    if (minDate && date < minDate) {
      setCurrentDate(minDate);
      return;
    }
    if (maxDate && date > maxDate) {
      setCurrentDate(maxDate);
      return;
    }
    setCurrentDate(date);
  };

  const setDay = (day: number) => {
    setDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  const setMonth = (month: number) => {
    setDate(new Date(currentDate.getFullYear(), month, currentDate.getDate()));
  };

  const prevMonth = () => {
    setMonth(currentDate.getMonth() - 1);
  };

  const nextMonth = () => {
    setMonth(currentDate.getMonth() + 1);
  };

  const setYear = (year: number) => {
    setDate(new Date(year, currentDate.getMonth(), currentDate.getDate()));
  };

  const prevYear = () => {
    setYear(currentDate.getFullYear() - 1);
  };

  const nextYear = () => {
    setYear(currentDate.getFullYear() + 1);
  };

  const onCancel = () => {
    setShowCalendar(false);
    setCurrentDate(date);
  };

  const onAccept = () => {
    setShowCalendar(false);
    onDateSelect(currentDate);
  };

  useEffect(() => {
    setCurrentDate(date);
  }, [date]);

  const { blurRef } = useBlur({
    onBlur: () => onCancel(),
  });

  const minYear = minDate?.getFullYear() || 1900;
  const maxYear = maxDate?.getFullYear() || 2100;
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => maxYear - i
  );

  const minMonth =
    currentDate.getFullYear() == minYear && minDate ? minDate.getMonth() : 0;
  const maxMonth =
    currentDate.getFullYear() == maxYear && maxDate ? maxDate.getMonth() : 11;

  const months = Array.from(
    { length: maxMonth - minMonth + 1 },
    (_, i) => monthsStr[minMonth + i]
  );

  const days = generateDaysOfMonth(currentDate, minDate, maxDate);

  return (
    <Wrapper ref={blurRef}>
      <InputWrapper onClick={toggleCalendar}>
        <InputInner>
          <InputInnerLabel>{label}</InputInnerLabel>
          <InputInnerValue>{currentDate.toTimeString()}</InputInnerValue>
        </InputInner>
        <InputSpace />
        <InputCalendarIcon />
      </InputWrapper>

      {showCalendar && (
        <Calendar>
          <CalendarHeader>
            <CalendarHeaderPicker>
              <CalendarPickerPrev onClick={prevMonth} />
              <CalendatHeaderPickerSelect
                value={currentDate.getMonth()}
                onChange={(e) => setMonth(parseInt(e.target.value))}
              >
                {months.map((month, index) => (
                  <option key={month + index} value={index}>
                    {month}
                  </option>
                ))}
              </CalendatHeaderPickerSelect>
              <CalendarPickerNext onClick={nextMonth} />
            </CalendarHeaderPicker>

            <CalendarHeaderPicker>
              <CalendarPickerPrev onClick={prevYear} />
              <CalendatHeaderPickerSelect
                value={currentDate.getFullYear()}
                onChange={(e) => setYear(parseInt(e.target.value))}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </CalendatHeaderPickerSelect>
              <CalendarPickerNext onClick={nextYear} />
            </CalendarHeaderPicker>
          </CalendarHeader>

          <WeekDays>
            {weekdays.map((day, index) => (
              <div key={day + index}>{day}</div>
            ))}
          </WeekDays>

          <CalendarBody>
            {days.map((day, index) => (
              <Day
                key={index}
                className={
                  day.disabled
                    ? "disabled"
                    : currentDate.getDate() === day.day
                    ? "selected"
                    : ""
                }
                onClick={() => setDay(day.day)}
              >
                {day.day}
              </Day>
            ))}
          </CalendarBody>

          <CalendarActions>
            <CalendarActionButton onClick={onCancel}>
              Cancel
            </CalendarActionButton>
            <CalendarActionButton onClick={onAccept}>Ok</CalendarActionButton>
          </CalendarActions>
        </Calendar>
      )}
    </Wrapper>
  );
};

export default DatePicker;
