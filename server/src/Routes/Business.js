import express, { response } from "express";
import { BusinessModel } from "../Models/Business.js";
import { UserModel } from "../Models/Users.js";
import axios from 'axios'
import {Upload} from '../multerSettings.js'
import { GetCurrentDate } from "../utility/constant.js";
import mongoose from "mongoose";
const router = express();

router.post("/addbusiness", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    //check same business already exist or not by using name of business
    const exist = user.businesses.find(
      (business) => business.businessName === req.body.businessName
    );
    if (exist) return res.json({ message: "Business already Created" });

    const createBusiness = {
      businessName: req.body.businessName,
      category: req.body.category,
      description: req.body.description,
      operatingHour: req.body.operatingHour,
      contact: { phone: req.body.phone, email: req.body.email },
    };
    const newBusiness = new BusinessModel({
      ...createBusiness,
      createdBy: req.body.userId,
      ownerName: user.username,
      address:{AddressLine:req.body.AddressLine,city:req.body.city,state:req.body.state,country:req.body.country,pin:req.body.pin},
    });
    await newBusiness.save();
    user.businesses.push({
      businessName: newBusiness.businessName,
      category: newBusiness.category,
      description: newBusiness.description,
      operatingHour: newBusiness.operatingHour,
      contact: {
        phone: newBusiness.contact.phone,
        email: newBusiness.contact.email,
      },
      busId: newBusiness._id,
    });
    await user.save();
    res.json({ message: "Business Registered SuccessFully!" });
  } catch (err) {
    console.error(err);
  }
});
router.get("/businessInfo", async (req, res) => {
  const page = req.query.page || 1;
  const pageSize = 4;
  const sskip = (page - 1) * pageSize;
  try {
    const AllBusiness = await BusinessModel.find().skip(sskip).limit(pageSize);
    res.json(AllBusiness);
  } catch (err) {
    console.error(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await BusinessModel.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(err);
  }
});
router.post("/rating", async (req, res) => {
  const { businessId, feedback, userId, starRating } = req.body;
  try {
    const FullTime = GetCurrentDate();
    const business = await BusinessModel.findById(businessId);
      const user = await UserModel.findById(userId);
      if(!business && user){
        return res.json('Business Not Exists');
      }
      await BusinessModel.findOneAndUpdate({_id:businessId},{$push:{'rating':{
        userInfo: user.firstName,
        rate: feedback,
        starRating: starRating,
        fullTime: FullTime,
      }}})
    const owner = await UserModel.findById(business.createdBy);
    owner.businesses
      .find((bus) => bus.busId.toString() === businessId)
      .rating.push({
        userInfo: user.username,
        rate: feedback,
        starRating: starRating,
        fullTime: FullTime,
      });
    await owner.save();
    user.rating.push({
      businessName: business.businessName,
      rate: feedback,
      starRating: starRating,
      fullTime: FullTime,
    });
    await user.save();
    res.json({ message: "feedback is saved" });
  } catch (err) {
    console.error(err);
  }
});
router.get("/review/:id", async (req, res) => {
  const id = req.params.id;
  const ObjectId = mongoose.Types.ObjectId;
  try {
    const value = await BusinessModel.aggregate([
      {
        $match: { _id: new ObjectId(id) },
      },
      {
        $project: {
          rating: 1,
        },
      },
      {
        $unwind: "$rating",
      },
      { $sort: { "rating.time": -1 } },
      {
        $group: {
          _id: 0,
          Ratings: { $push: "$rating" },
        },
      }
    ]);
    const data = [...value];
    if(data.length !== 0){
    res.json(data[0].Ratings);
    }
    else {
    res.json(data);
    }
  } catch (err) {
    console.error(err);
  }
});
router.post("/listofbusiness", async (req, res) => {
  console.log('list of business',req.body);
  const name = req.body.name;
  try {
    const data = await BusinessModel.find({ category: name });
    console.log(data);
    res.json(data);
  } catch (err) {
    console.error(err);
    return [];
  }
});
router.get("/phone/:id", async (req, res) => {
  try {
    const data = await BusinessModel.findById(req.params.id);
    const phone = parseInt(data.contact.phone);
    res.json(phone);
  } catch (err) {
    console.error(err);
  }
});
router.post("/serchBusinesses", async (req, res) => {
  const { str } = req.body;
  if (str) {
    try {
      const dataBybusinessName = await BusinessModel.find({
        businessName: { $regex: new RegExp(str, "i") },
      });
      return res.json(dataBybusinessName);
    } catch (err) {
      console.log(err);
    }
  }
  return;
});
router.post("/upload", Upload.array("images"), async (req, res) => {
   const data = [];
    for (const fil of req.files) {
        data.push(fil.filename);
    }
    await BusinessModel.findOneAndUpdate({_id:req.body.id},{$push:{'images':{'$each':data}}});
    res.json('Images Uploaded');
});
router.get("/download/:id", async (req, res) => {
  console.log('call from frontend');
  try {
    const AllBusiness = await UserModel.findOne(
      { _id: req.params.id },
      { 'businesses': 1 }
    );
    console.log(AllBusiness);
    const businessImages = [];
    for (const Business of AllBusiness.businesses) {
       const data = await BusinessModel.findOne({_id:Business.busId});
       businessImages.push({BusinessName:data.businessName,Posts:data.images});
    }
    res.json(businessImages);
  } catch (err) {
    console.error(err);
  }
});
router.get('/specificInfo/:id',async (req,res)=>{
     try{
       const data = await BusinessModel.findOne({_id:req.params.id});
       res.json(data);
     }
     catch(err){
      console.error(err);
     }
})
export { router as BusinessRouter };
