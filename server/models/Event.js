import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  date:        { type: Date,   required: true },
  time:        { type: String, required: true },
  direction:    { type: String, required: true },
  city:    { type: String, required: true },
  province:    { type: String, required: true },
  category:    { type: String },
}, { timestamps: true });

export default mongoose.model('Event', EventSchema);