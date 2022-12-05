import mongoose from "mongoose";

const schema = mongoose.Schema({
  total: { type: String, required: true },
  date: { type: String, required: true },
  items:{type:String, required:true},
  creation_time: { type: Number, required: true },
 
},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

export default mongoose.model("sale", schema);
