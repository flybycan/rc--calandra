import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { getDaysInWeek } from "./utils";

interface WeekViewProps {
  currentDate: Date;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function WeekView({ currentDate, selectedDate, onSelectDate }: WeekViewProps) {
  const weekDays = getDaysInWeek(currentDate);

  return (
    <flexboxLayout style={styles.container}>
      <gridLayout rows="auto" columns="*,*,*,*,*,*,*" style={styles.weekDays}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <label 
            key={day} 
            col={index} 
            className="text-center text-gray-500 text-sm"
          >
            {day}
          </label>
        ))}
      </gridLayout>
      
      <gridLayout rows="*" columns="*,*,*,*,*,*,*" style={styles.dates}>
        {weekDays.map((date, index) => {
          const isSelected = date.toDateString() === selectedDate.toDateString();
          const isToday = date.toDateString() === new Date().toDateString();
          
          return (
            <button 
              key={date.toISOString()} 
              col={index}
              className={`
                p-2 m-1 rounded-full
                ${isSelected ? 'bg-blue-500 text-white' : ''}
                ${isToday && !isSelected ? 'bg-blue-100' : ''}
              `}
              onTap={() => onSelectDate(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </gridLayout>
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  weekDays: {
    height: 30,
    backgroundColor: "#f5f5f5",
  },
  dates: {
    height: 60,
  },
});