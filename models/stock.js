import mongoose from "mongoose";

const schema = mongoose.Schema({
  item_code: { type: String, required: true },
  price: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: String, required: true },
 
},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

export default mongoose.model("stock", schema);
