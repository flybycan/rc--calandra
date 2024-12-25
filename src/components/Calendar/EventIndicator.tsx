import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { CalendarEvent } from "./types";

interface EventIndicatorProps {
  events: CalendarEvent[];
}

export function EventIndicator({ events }: EventIndicatorProps) {
  if (events.length === 0) return null;

  return (
    <flexboxLayout style={styles.container}>
      {events.slice(0, 3).map((event) => (
        <label
          key={event.id}
          style={{
            ...styles.dot,
            backgroundColor: event.color || "#3b82f6"
          }}
        />
      ))}
      {events.length > 3 && (
        <label style={styles.more}>+{events.length - 3}</label>
      )}
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    margin: 1,
  },
  more: {
    fontSize: 8,
    color: "#6b7280",
    marginLeft: 2,
  },
});