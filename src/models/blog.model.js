import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const BlogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default model('Blog', BlogSchema);
