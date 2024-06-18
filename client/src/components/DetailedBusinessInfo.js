import axios from "axios";
import { useEffect,useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ImagesGallery } from "./imageGallery";

import {StartRating} from './StarRatings.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocation,faComment } from "@fortawesome/free-solid-svg-icons";

function DetailedBusinessInfo() {
  const location = useLocation();
  const id = location.state && location.state.id;

  const userId = localStorage.getItem("userId");
  const [reviews,setReviews] = useState([]);
  const [phoneNo,setPhoneNo] = useState('');
  const navigate = useNavigate();
  function handleClick(e) {
    e.stopPropagation();
    if (!userId) {
      navigate("/Login&Register");
    } else {
      navigate("/ratingPage", { state: { userId, id } });
    }
  }
 
  const FetchNumber = async (e)=>{
     e.stopPropagation();
     try{
       const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/business/phone/${id}`);
       setPhoneNo(res.data);

       window.location.href=`tel:${phoneNo}`;
     }
     catch(err){
      console.error(err);
     }
  }
 
  useEffect(()=>{
    const fetchReviews = async () => {
      if (!id) {
        console.error('Invalid business ID.');
        return;
      }

      // Validate the ID format
      const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
      if (!isValidObjectId) {
        console.error('Invalid ObjectID format for business ID.');
        return;
      }

      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/business/review/${id}`);
        console.log(res.data);
        setReviews(res.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  },[id])
  return (
    <div className="h-screen w-screen shadow-sm overflow-y-auto">
        <ImagesGallery businessId={id}/>
      <section className=" bg-gray-100 flex items-center gap-4 py-4 mt-2 justify-around border-y-2 border-gray-500 w-screen">
        <FontAwesomeIcon icon={faPhone} className="btn btn-call bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-md" onClick={FetchNumber}/>
        <FontAwesomeIcon icon={faLocation} className="btn btn-location bg-teal-500 hover:bg-teal-700 text-white font-bold py-4 px-4 rounded-md"/>
        <FontAwesomeIcon icon={faComment} className="btn btn-review bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-4 rounded-md" onClick={handleClick}/>
      </section>
      <section className="  bg-gray-100 mx-auto p-2 ssm:px-4 h-[100%] w-[100%] flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>
        { reviews.length === 0 ? <p className="text-center font-bold text-sm ssm:text-2xl">No Reviews Yet</p>:<div className="flex flex-col items-center ssm:w-[70%] gap-3 overflow-y-auto">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white p-3 ssm:p-4 rounded-md shadow-md w-[100%]">
              <div className="flex items-center mb-2">
                <div className="w-11 ssm:w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full mr-2">
                  {review.userInfo[0]}
                </div>
                <p>{review.userInfo}</p>
              </div>
              <StartRating Rating={review.starRating ? review.starRating : 4} />
              <p>{review.rate}</p>
            </div>
          ))}
        </div>}
      </section>
    </div>
  );
}
export default DetailedBusinessInfo;
