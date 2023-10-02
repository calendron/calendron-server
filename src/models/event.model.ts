import mongoose, { Schema } from 'mongoose';
import { IEvent } from '../interfaces/models';

const eventSchema = new Schema<IEvent>({
  organizerId: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  slug: { type: String, required: true },
});

const Event = mongoose.model<IEvent>('Event', eventSchema);
export default Event;
