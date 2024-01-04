import { Schema, model, models } from "mongoose";

const EventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  imageUrl: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  isFree: { type: Boolean, required: true, default: false },
  // organizer: Schema.Types.ObjectId
  // bands: []
});

export default models.Event || model("Event", EventSchema);