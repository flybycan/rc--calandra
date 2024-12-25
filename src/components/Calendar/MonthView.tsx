import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { getDaysInMonth } from "./utils";
import { DayCell } from "./DayCell";
import { WeekDaysHeader } from "./WeekDaysHeader";
import { CalendarEvent } from "./types";

interface MonthViewProps {
  currentDate: Date;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  getEvents: (date: Date) => CalendarEvent[];
}

export function MonthView({ 
  currentDate, 
  selectedDate, 
  onSelectDate,
  getEvents 
}: MonthViewProps) {
  const monthDays = getDaysInMonth(currentDate);
  const weeks = Math.ceil(monthDays.length / 7);

  return (
    <flexboxLayout style={styles.container}>
      <WeekDaysHeader />
      <gridLayout 
        rows={`${'*,'.repeat(weeks - 1)}*`} 
        columns="*,*,*,*,*,*,*" 
        style={styles.calendar}
      >
        {monthDays.map((date, index) => {
          const row = Math.floor(index / 7);
          const col = index % 7;
          
          return (
            <DayCell
              key={date.toISOString()}
              row={row}
              col={col}
              date={date}
              events={getEvents(date)}
              isSelected={date.toDateString() === selectedDate.toDateString()}
              isToday={date.toDateString() === new Date().toDateString()}
              isCurrentMonth={date.getMonth() === currentDate.getMonth()}
              onSelect={onSelectDate}
            />
          );
        })}
      </gridLayout>
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "white",
  },
  calendar: {
    height: 350,
    backgroundColor: "white",
    margin: 8,
  },
});