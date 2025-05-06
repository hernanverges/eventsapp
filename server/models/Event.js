import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  date:        { type: Date,   required: true },
  time:        { type: String, required: true },
  address:    { type: String, required: true },
  city:    { type: String, required: true },
  province:    { type: String, required: true },
  price:    { type: Number, required: true },
  category:    { type: String, required: true },
  lat:      { type: Number, required: true },
  lon:      { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('Event', EventSchema);