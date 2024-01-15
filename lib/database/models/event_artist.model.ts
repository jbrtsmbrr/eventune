import { Schema, model, models } from "mongoose";


const ArtistEventSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref: "Event" },
  name: String,
  artistSpotifyId: String,
  createdAt: { type: Date, default: Date.now }
});


export default models.ArtistEvent || model("ArtistEvent", ArtistEventSchema)