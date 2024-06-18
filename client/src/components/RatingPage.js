import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { StarRating } from "./starRating";

export const RatingPage = ()=>{
    const location = useLocation();
    const userId = location.state && location.state.userId;
    const businessId = location.state && location.state.id;
    const initial = {userId:userId,businessId:businessId,feedback:''};
    const [starrating,setStarRating] = useState(0);
    const initialEmptyStar = ["/images/emptyStar.png","/images/emptyStar.png","/images/emptyStar.png","/images/emptyStar.png","/images/emptyStar.png"];
     const initialFullStar = ["/images/fullStar.png","/images/fullStar.png","/images/fullStar.png","/images/fullStar.png","/images/fullStar.png"];
     const [images,setImages] = useState(initialEmptyStar);
    const [rating,setRating] = useState(initial);
    async function handleClick(e){
        e.stopPropagation();
        try{
          const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/business/rating`,{...rating,starRating:starrating});
          alert(res.data.message);
          setRating(initial);
          setImages(initialEmptyStar);
        }
        catch(err){
            console.error(err);
        }
    }
    function handleChange(e){
        e.stopPropagation();
        setRating({...rating,[e.target.name]:e.target.value});
    }
    return (
        <div className="flex justify-center items-center h-screen w-screen ">
        <div className="w-[90%] ssm:w-[70%] h-[45%] md:w-[50%] border border-gray-400 p-3">
         <div className="star-rating">
          <StarRating  setStarRating = {setStarRating} images={images} setImages={setImages} initialEmptyStar={initialEmptyStar} initialFullStar={initialFullStar}></StarRating>
          <p className="text-sm">Select Your Rating</p>
         </div>
         <div>
         <div >
            <textarea placeholder="what you like,what you dislike,services....etc" rows='4' cols='40' name="feedback" onChange={handleChange} value={rating.feedback} className="flex-grow border border-gray-300 py-1 px-4 focus:inline-none focus:border-green-500 mr-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white"/>
         </div>
         <button className="px-2 py-2 bg-emerald-600 text-white rounded-md focus:outline-none cursor-pointer mt-2" onClick={handleClick}>Submit Feedback</button>
         </div>
        </div>
        </div>
    )
}