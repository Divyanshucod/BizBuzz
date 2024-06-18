import mongoose from "mongoose";
const BusinessSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  category: { type: String, required: true },
  description: { type: String, required: true },
  operatingHour: { type: String, required: true },
  rating: [
    {
      userInfo: { type: String },
      rate: { type: String },
      starRating:{type:Number},
      time: { type: Number, default: Date.now },
      fullTime: {
        month: { type: String },
        year: { type: Number },
        day: { type: String },
        hour: { type: Number },
        minutes: { type: Number },
      },
    },
  ],
  createdBy:{type:mongoose.Types.ObjectId,ref:'Users'},
  ownerName:{type:String},
  images:[{type:String}],
  address:{AddressLine:{type:String},city:{type:String},state:{type:String},country:{type:String},pin:{type:Number}},
});
export const BusinessModel = mongoose.model("businesses", BusinessSchema);
