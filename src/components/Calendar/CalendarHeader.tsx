import * as React from "react";
import { StyleSheet } from "react-nativescript";

interface CalendarHeaderProps {
  currentDate: Date;
  selectedDate: Date;
  viewMode: 'week' | 'month';
  onViewModeChange: (mode: 'week' | 'month') => void;
  onPrevious: () => void;
  onNext: () => void;
  onTodayPress: () => void;
}

export function CalendarHeader({ 
  currentDate, 
  selectedDate,
  viewMode, 
  onViewModeChange,
  onPrevious,
  onNext,
  onTodayPress
}: CalendarHeaderProps) {
  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const monthYear = currentDate.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <flexboxLayout style={styles.container}>
      <flexboxLayout style={styles.header}>
        <flexboxLayout style={styles.titleContainer}>
          <label className="text-xl font-bold">{monthYear}</label>
          {!isToday && (
            <button 
              className="text-blue-500 ml-4" 
              style={styles.todayButton}
              onTap={onTodayPress}
            >
              Today
            </button>
          )}
        </flexboxLayout>
        <flexboxLayout style={styles.controls}>
          <button 
            className="text-blue-500 text-xl font-bold px-4" 
            onTap={onPrevious}
          >
            ←
          </button>
          <button 
            className="text-blue-500 text-xl font-bold px-4" 
            onTap={onNext}
          >
            →
          </button>
        </flexboxLayout>
      </flexboxLayout>
      
      <flexboxLayout style={styles.viewToggle}>
        <button 
          className={`mx-2 px-4 py-2 rounded-full ${viewMode === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          onTap={() => onViewModeChange('week')}
        >
          Week
        </button>
        <button 
          className={`mx-2 px-4 py-2 rounded-full ${viewMode === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          onTap={() => onViewModeChange('month')}
        >
          Month
        </button>
      </flexboxLayout>
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewToggle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  todayButton: {
    fontSize: 14,
    padding: 8,
  },
});