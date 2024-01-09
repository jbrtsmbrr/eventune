import { IUser } from "../database/models/user.model";

export interface IEvent {
  _id?: string,
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  imageUrl: string;
  location: string;
  price: number;
  isFree: boolean;
  modifiedAt: Date,
  organizer: IUser
}

export interface IEventCreateParams {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  imageUrl: string;
  location: string;
  price: number;
  isFree: boolean;
  organizer: string
}