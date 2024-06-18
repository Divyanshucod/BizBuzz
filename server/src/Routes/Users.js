import express from "express";
import { UserModel } from "../Models/Users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Upload } from '../multerSettings.js';
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    // Check if user already exists
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.json({ message: "User already exists" });
    }

    // Password hashing
    const HashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const createUser = new UserModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: HashedPassword,
    });
    await createUser.save();
    res.json({ message: "User Created Successfully!" }).status(202);
  } catch (err) {
    console.error(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const MatchedPassword = await bcrypt.compare(password, user.password);
      if (!MatchedPassword) {
        return res.json({ message: "Email or password incorrect" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({
        userId: user._id,
        name: user.firstName,
        token,
        message: "Login successful",
      });
    }

    // User not registered yet
    res.json({ message: "User Not Registered Yet" }).status(202);
  } catch (err) {
    console.error(err);
  }
});
router.get("/recent_rating", async (req, res) => {
  const page = req.query.page || 1;
  const pageSize = 2;
  const sskip = (page - 1) * pageSize;
  const ObjectId = mongoose.Types.ObjectId;
  try {
    const value = await UserModel.aggregate([
      {
        $match: { _id: new ObjectId(req.query.id) },
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
      },
      { $skip: sskip },
      { $limit: pageSize },
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

router.get("/mybusinesses/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.json(user.businesses);
  } catch (err) {
    console.error(err);
  }
});
router.get("/businessname/:id", async (req, res) => {
  try {
    const data = await UserModel.findOne({_id:req.params.id});
    res.json(data.businesses);
  } catch (err) {
    console.error(err);
  }
});
router.get('/getImages/:id',async (req,res)=>{
    try{
       const imagesData = await UserModel.find({_id:req.params.id},{'images':1,'_id':0});
       res.json(imagesData);
    }
    catch(err){
      console.error(err);
    }
})
router.get('/userInfo/:id',async (req,res)=>{
   if(req.params.id){
    try{
      const UserInfo = await UserModel.findById(req.params.id);
      console.log(UserInfo);
      res.json(UserInfo);
    }
    catch(err){
      console.error(err);
    }
   }
})
router.patch("/updateInfo", async (req, res) => {
  const { Id, UpdateInfo } = req.body;
  try {
    const user = await UserModel.findOne({ _id: Id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (UpdateInfo.NewUsername) {
      user.firstName = UpdateInfo.NewUsername;
    }
    if (UpdateInfo.NewPassword) {
      const isPasswordCorrect = await bcrypt.compare(
        UpdateInfo.OldPassword,
        user.password
      );
      if (isPasswordCorrect) {
        const hashedPassword = await bcrypt.hash(UpdateInfo.NewPassword, 10);
        user.password = hashedPassword;
      } else {
        return res.json({ error: "Incorrect existing password" });
      }
    }
    await user.save();
    res.json({ message: "User information updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// update avatar
router.post("/updateAvatar", Upload.single("image"), async (req, res) => {
  try {
    const userId = req.body.id;
    const avatarFilename = req.file.filename;
    await UserModel.findOneAndUpdate(
      { _id: userId },
      { Avatar: avatarFilename }
    );
    res.json({message:"Avatar updated successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export const UserRouter = router;
