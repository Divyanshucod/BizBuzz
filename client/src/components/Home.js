import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AboutUsPage from "./About_UsPage";
import { categories } from "./categories";
import './imageSlider.css';

const ImageSlider = React.lazy(()=> import ('./imageSlider'))
export const Home = () => {
  const [businessDetails, setBusinessDetails] = useState([]);
  let   [item,setItem] = useState(1);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [displayButton,setDisplayButton] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    setShowMoreCategories(!showMoreCategories);
  };
  const DetailedInfo = async (e)=>{
    console.log(e);
     try{
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/business/${e}`);
      navigate('/detailedInfo',{state:{fullDetails:res.data,id:e}});
     }
     catch(err){
      console.error(err);
     }
  }
  const loadMoreItem = (e)=>{
    e.stopPropagation();
    setItem(item = item+1);
  }
  const fetchData = (e)=>{
     navigate('/ListOfBusiness',{state:{Name:e}});
  }
  useEffect(() => {
    async function fetchBusinessDetails() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/business/businessInfo?page=${item}`);
        if(res.data.length === 0)
        setDisplayButton(!displayButton);
        console.log(res.data);
        setBusinessDetails([...businessDetails,...res.data])
      } catch (err) {
        console.error(err);
      }
    }
    fetchBusinessDetails();
  }, [item]);
  return (
    <>
    <div className="flex flex-col w-100 h-60">
    <Suspense fallback={<div className="w-full h-full spinner"></div>}>
       <ImageSlider/>
    </Suspense>
    </div>
   <section className="mainSection">
    <div className="home grid grid-cols-1 ssm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {businessDetails.map((business,index) => (
         <div className="card xssm:max-w-80 xssm:max-w-auto ssm:m-0 ssm:w-auto border border-gray-300 shadow-md rounded-lg  cursor-pointer" onClick={() => DetailedInfo(business._id)} key={`${index}`}>
         <div className=" flex items-center p-2">
           <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center">{business.businessName[0].toUpperCase()}</div>
           <h3 className="text-2xl font-semibold text-blue-300">{business.ownerName}</h3>
         </div>
         <div className="w-[100%]">
           {business.images.length !== 0 ? (
             <img className="object-cover h-48 w-full rounded-md" src={`http://localhost:8080/images/${business.images[0]}`} alt="Business Image" />
           ) : (
             <img className="object-cover h-48 w-full rounded-md" src={`images/image3.jpg`} alt="Default Business Image" />
           )}
         </div>
         <div className="info p-2 overflow-y-auto h-30">
           <p className="text-lg font-semibold">{business.businessName}</p>
           <p className="text-gray-600 mt-1">{business.description}</p>
         </div>
       </div>
      ))}
    </div>
    {displayButton && <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-md" onClick={loadMoreItem}>Load More</button>}
    </section>
    <section className="category">
      <h2 className="ssm:text-2xl font-semibold mb-4">Categories</h2>
      <div className="grid grid-cols-4 ssm:grid-cols-6 lg:grid-cols-10 gap-6">
        {categories.slice(0, showMoreCategories ? categories.length : 10).map((category, index) => (
          <div key={index} className="flex bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 cursor-pointer items-center col-span-2" onClick={()=>fetchData(`${category.title}`)}>
            <FontAwesomeIcon icon={category.icon} className="text-blue-500 text-xl mr-3" />
            <span className="text-lg">{category.title}</span>
          </div>
        ))}
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 cursor-pointer flex items-center justify-center" onClick={handleClick}>
          {showMoreCategories ? "Less" : "More"}
        </div>
      </div>
    </section>
    <AboutUsPage/>
    </>
  );
};





