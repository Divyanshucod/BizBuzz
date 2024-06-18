import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName:{ type: String, required: true },
  lastName:{ type: String},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  businesses: [
    {
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
          time: { type: "Number", default: Date.now },
          fullTime: {
            month: { type: String },
            year: { type: Number },
            day: { type: String },
            hour: { type: Number },
            minutes: { type: Number },
          },
        },
      ],
      busId:{type:mongoose.Types.ObjectId,ref:'Business'}
    },
  ],
  rating: [
    {
      businessName: { type: String },
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
  images:[{name:String}],
  Avatar:{type:String}
});

export const UserModel = mongoose.model("Users", UserSchema);
