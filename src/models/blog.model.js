import mongoose from 'mongoose';
import toJson from '@meanie/mongoose-to-json';

const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

const BlogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  coverImage: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [commentSchema],
});

BlogSchema.index({ title: 'text', content: 'text' });

BlogSchema.plugin(toJson);
export default model('Blog', BlogSchema);
