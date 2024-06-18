import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { UserRouter } from './Routes/Users.js';
import { BusinessRouter } from './Routes/Business.js';
import dotenv from 'dotenv';

dotenv.config();

const server = express();

// Connect to Database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to the database");
}).catch((error) => {
  console.error("Database connection error:", error);
});

// Middleware
server.use(cors());
server.use(express.json());
server.use(express.static('public'));
server.use('/users', UserRouter);
server.use('/business', BusinessRouter);

// Server listen
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is connected on port ${PORT}`);
});
