import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { CalendarEvent } from "./types";
import { EventIndicator } from "./EventIndicator";

interface DayCellProps {
  date: Date;
  isSelected: boolean;
  isToday: boolean;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
  onSelect: (date: Date) => void;
  row?: number;
  col?: number;
}

export function DayCell({ 
  date, 
  isSelected, 
  isToday, 
  isCurrentMonth,
  events,
  onSelect,
  row,
  col 
}: DayCellProps) {
  return (
    <gridLayout 
      row={row}
      col={col}
      style={styles.cellContainer}
    >
      <stackLayout>
        <button 
          style={{
            ...styles.cell,
            ...(isSelected && styles.selected),
            ...(isToday && !isSelected && styles.today),
            ...(!isCurrentMonth && styles.otherMonth),
          }}
          onTap={() => onSelect(date)}
          className={`
            ${isSelected ? 'font-bold' : ''}
            ${isToday ? 'font-semibold' : ''}
          `}
        >
          {date.getDate()}
        </button>
        <EventIndicator events={events} />
      </stackLayout>
    </gridLayout>
  );
}

const styles = StyleSheet.create({
  cellContainer: {
    padding: 2,
    margin: 1,
  },
  cell: {
    width: "100%",
    height: 40,
    borderRadius: 20,
    textAlignment: "center",
    color: "#1f2937",
    fontSize: 16,
    padding: 10,
  },
  selected: {
    backgroundColor: "#3b82f6",
    color: "white",
  },
  today: {
    backgroundColor: "#dbeafe",
    borderWidth: 1,
    borderColor: "#3b82f6",
  },
  otherMonth: {
    color: "#9ca3af",
    opacity: 0.5,
  },
});