

import { useEffect, useState } from "react";
import axios from "axios";
import { StartRating } from "./StarRatings";

export const Recent_Reviews = () => {
  const [recentReviews, setRecentReviews] = useState([]);
  const [noOfReview, setNoOfReview] = useState(1);
  const userId = localStorage.getItem("userId");
  const [displayButton, setDisplayButton] = useState(true);

  const loadMoreReview = (e) => {
    e.stopPropagation();
    setNoOfReview(noOfReview + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users/recent_rating?page=${noOfReview}&id=${userId}`
        );

        if (res.data.length === 0) {
          setDisplayButton(false);
        }
        
        setRecentReviews([...recentReviews, ...res.data]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [noOfReview]); // Dependency array ensures useEffect runs when noOfReview changes

  return (
    <div className="Recent_Review">
      <h1 className="text-2xl font-bold mb-4">Recent Reviews</h1>
      {recentReviews.length === 0 ? (
        <div className="text-gray-600">You don't have recent reviews.</div>
      ) : (
        <div className="flex flex-col items-center gap-4 w-[100%] ssm:w-[70%] overflow-y-auto">
          {recentReviews.map((review, index) => (
            <div
              className="bg-white p-4 rounded-md shadow-md w-[70%]"
              key={`${review._id}+${index}`}
            >
              <div className="flex items-center mb-2">
                <div className="h-10 w-10 bg-gray-200 flex items-center justify-center rounded-full mr-2">
                  {review.businessName[0]}
                </div>
                <p className="font-bold">{review.businessName}</p>
              </div>
              <div className="flex flex-col mb-2">
                <StartRating Rating={review.starRating} />
                <p className="ml-2">{review.rate}</p>
              </div>
              {/* Additional information about the review */}
            </div>
          ))}
        </div>
      )}
      {displayButton && recentReviews.length !== 0 && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-md"
          onClick={loadMoreReview}
        >
          View More
        </button>
      )}
    </div>
  );
};
