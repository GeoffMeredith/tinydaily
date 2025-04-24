import { Document } from 'mongoose';

export interface ISaying extends Document {
  text: string;
  author?: string;
  date: Date;
}

export interface IUser extends Document {
  email: string;
  subscribed: boolean;
  subscriptionDate: Date;
  preferredEmailHour: number;
  verified: boolean;
  verificationToken?: string;
}

export interface ApiResponse<T = any> {
  message: string;
  data?: T;
}

export interface SubscriptionRequest {
  email: string;
  preferredEmailHour: number;
}

export interface SubscriptionResponse extends ApiResponse {
  data?: {
    email: string;
    subscribed: boolean;
  };
} 