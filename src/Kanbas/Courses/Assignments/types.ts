export interface Assignment {
  _id: string;
  title: string;
  course: string;
  description?: string;
  dueDate?: string;
  availableFromDate?: string;
  availableUntilDate?: string;
  points: number;
}