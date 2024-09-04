import mongoose, { Document, Model, Schema } from 'mongoose';

interface IMatch extends Document {
  id: number;
  fixture_id?: number;
  match_title: string;
  match_time: string;
  time: string;
  is_hot?: number;
  status?: string;
  team_one_name: string;
  team_two_name: string;
  team_one_image?: string;
  team_two_image?: string;
  team_one_id?: number;
  team_two_id?: number;
  position?: number;
  streaming_sources?: mongoose.Types.ObjectId[];
}

const matchSchema: Schema<IMatch> = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  fixture_id: {
    type: Number,
  },
  match_title: {
    type: String,
    required: true,
  },
  match_time: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  is_hot: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: '1',
  },
  team_one_name: {
    type: String,
    required: true,
  },
  team_two_name: {
    type: String,
    required: true,
  },
  team_one_image: {
    type: String,
  },
  team_two_image: {
    type: String,
  },
  team_one_id: {
    type: Number,
  },
  team_two_id: {
    type: Number,
  },
  position: {
    type: Number,
    default: 999999999,
  },
  streaming_sources: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Stream',
    },
  ],
});

const LiveMatch: Model<IMatch> = mongoose.model('LiveMatch', matchSchema);

export default LiveMatch;
