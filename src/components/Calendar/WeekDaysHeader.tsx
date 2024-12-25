import * as React from "react";
import { StyleSheet } from "react-nativescript";

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function WeekDaysHeader() {
  return (
    <gridLayout rows="auto" columns="*,*,*,*,*,*,*" style={styles.weekDays}>
      {WEEKDAYS.map((day, index) => (
        <label 
          key={day} 
          col={index} 
          className="text-center text-gray-500 text-sm font-medium"
        >
          {day}
        </label>
      ))}
    </gridLayout>
  );
}

const styles = StyleSheet.create({
  weekDays: {
    height: 40,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
});