export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  color?: string;
}

export interface DayEvents {
  date: Date;
  events: CalendarEvent[];
}