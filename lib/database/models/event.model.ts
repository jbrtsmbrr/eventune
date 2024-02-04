import { Schema, model, models, set } from "mongoose";

const EventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  imageUrl: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  isFree: { type: Boolean, required: true, default: false },
  organizer: { type: Schema.Types.ObjectId, ref: 'User' },
  modifiedAt: { type: Date, default: Date.now },
  artists: { type: [{ type: Schema.Types.ObjectId, ref: "ArtistEvent" }], required: true, default: [] }
  // bands: []
});

export default models.Event || model("Event", EventSchema);