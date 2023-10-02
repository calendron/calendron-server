import { Document } from 'mongoose';

interface IUser extends Document {
  _doc: IUser;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IEvent extends Document {
  _doc: IEvent;
  organizerId: IUser;
  title: string;
  description: string;
  slug: string;
  color: string;
}
