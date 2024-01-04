export interface IEvent {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  imageUrl: string;
  location: string;
  price: number;
  isFree: boolean;
}