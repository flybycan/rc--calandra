import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { CalendarEvent } from "./types";

interface EventListProps {
  events: CalendarEvent[];
  onClose: () => void;
}

export function EventList({ events, onClose }: EventListProps) {
  if (events.length === 0) return null;

  return (
    <flexboxLayout style={styles.container}>
      <flexboxLayout style={styles.header}>
        <label className="text-lg font-bold">Events</label>
        <button className="text-blue-500" onTap={onClose}>Close</button>
      </flexboxLayout>
      <scrollView style={styles.list}>
        {events.map((event) => (
          <flexboxLayout key={event.id} style={styles.event}>
            <label 
              style={{
                ...styles.eventDot,
                backgroundColor: event.color || "#3b82f6"
              }}
            />
            <flexboxLayout style={styles.eventContent}>
              <label className="font-semibold">{event.title}</label>
              {event.description && (
                <label className="text-gray-600 text-sm">{event.description}</label>
              )}
            </flexboxLayout>
          </flexboxLayout>
        ))}
      </scrollView>
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    height: 300,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  list: {
    flex: 1,
  },
  event: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  eventContent: {
    flexDirection: "column",
    flex: 1,
  },
});