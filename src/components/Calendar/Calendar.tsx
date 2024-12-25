import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { CalendarHeader } from "./CalendarHeader";
import { WeekView } from "./WeekView";
import { MonthView } from "./MonthView";
import { SwipeContainer } from "./SwipeContainer";
import { EventList } from "./EventList";
import { CalendarEvent } from "./types";

const SAMPLE_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly sync with the team',
    date: new Date(),
    color: '#3b82f6'
  },
  {
    id: '2',
    title: 'Lunch with Client',
    description: 'Discuss project requirements',
    date: new Date(),
    color: '#10b981'
  }
];

export function Calendar() {
  const [viewMode, setViewMode] = React.useState<'week' | 'month'>('month');
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [showEvents, setShowEvents] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(currentDate.getDate() - 7);
    } else {
      newDate.setMonth(currentDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(currentDate.getDate() + 7);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setCurrentDate(date);
    setShowEvents(true);
  };

  const handleTodayPress = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentDate(today);
  };

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return SAMPLE_EVENTS.filter(
      event => event.date.toDateString() === date.toDateString()
    );
  };

  return (
    <flexboxLayout style={styles.container}>
      <CalendarHeader
        currentDate={currentDate}
        selectedDate={selectedDate}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onTodayPress={handleTodayPress}
      />
      
      <SwipeContainer
        onSwipeLeft={handleNext}
        onSwipeRight={handlePrevious}
      >
        {viewMode === 'week' ? (
          <WeekView
            currentDate={currentDate}
            selectedDate={selectedDate}
            onSelectDate={handleDateSelect}
            getEvents={getEventsForDate}
          />
        ) : (
          <MonthView
            currentDate={currentDate}
            selectedDate={selectedDate}
            onSelectDate={handleDateSelect}
            getEvents={getEventsForDate}
          />
        )}
      </SwipeContainer>

      {showEvents && (
        <EventList
          events={getEventsForDate(selectedDate)}
          onClose={() => setShowEvents(false)}
        />
      )}
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    backgroundColor: "white",
  },
});