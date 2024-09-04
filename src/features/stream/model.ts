import mongoose, { Document, Model, Schema } from 'mongoose';

interface IStream extends Document {
  matchId: mongoose.Types.ObjectId;
  id: number;
  match_id?: number;
  stream_title: string;
  is_premium?: number;
  resolution: string;
  stream_status?: string;
  platform?: 'both' | 'android' | 'ios';
  stream_type?: 'root_stream' | 'restricted' | 'm3u8' | 'web';
  portrait_watermark?: string;
  landscape_watermark?: string;
  root_streams?: Record<string, any>[];
  stream_url?: string;
  headers?: string;
  stream_key?: string;
  position?: number;
}

const streamSchema: Schema<IStream> = new Schema({
  matchId: {
    type: Schema.Types.ObjectId,
    ref: 'LiveMatch',
    required: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  match_id: {
    type: Number,
  },
  stream_title: {
    type: String,
    required: true,
  },
  is_premium: {
    type: Number,
    default: 0,
  },
  resolution: {
    type: String,
    required: true,
  },
  stream_status: {
    type: String,
    default: '1',
  },
  platform: {
    type: String,
    enum: ['both', 'android', 'ios'],
    default: 'both',
  },
  stream_type: {
    type: String,
    enum: ['root_stream', 'restricted', 'm3u8', 'web'],
    default: 'root_stream',
  },
  portrait_watermark: {
    type: String,
    default: '{}',
  },
  landscape_watermark: {
    type: String,
    default: '{}',
  },
  root_streams: [
    {
      type: Schema.Types.Mixed,
    },
  ],
  stream_url: {
    type: String,
  },
  headers: {
    type: String,
  },
  stream_key: {
    type: String,
  },
  position: {
    type: Number,
    default: 99999999,
  },
});

// Create and export the Stream model
const Stream: Model<IStream> = mongoose.model('Stream', streamSchema);

export default Stream;
