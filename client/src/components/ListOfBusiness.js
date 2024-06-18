import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

export const ListOfBusiness = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [listOfBusiness, setListOfBusiness] = useState([]);
  const NameOfCategory = JSON.stringify(location.state && location.state.Name);
  const DetailedInfo = async (e) => {
    navigate('/detailedInfo', { state: {id: e } });
  };

  useEffect(() => {
    const fetchData = async () => {
      let str = NameOfCategory.substring(1,(NameOfCategory.length-1))

      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/business/listofbusiness`,{name:str});
      console.log(res.data);
      setListOfBusiness(res.data);
    };
    fetchData();
  }, [NameOfCategory]);

  return (
    <div className="flex flex-col items-center w-screen h-screen">
      <div className={`w-[90%] ssm:w-[70%] h-screen overflow-y-auto bg-zinc-100 shadow-sm 
      flex flex-col items-center p-3`}>
      {listOfBusiness.length === 0 ? <div>No business To specific category</div>:<React.Fragment>{listOfBusiness.map((business) => (
        <div
          className={`w-full rounded overflow-hidden shadow-lg m-2 flex gap-1 p-2 ${business.images ?`bg-[${`${process.env.REACT_APP_SERVER_URL}/images/${business.images[0]}`}] bg-center bg-no-repeat`:''} cursor-pointer`}
          onClick={() => DetailedInfo(business._id)}
          key={business._id}
        > 
          {(business.businessLogo) ? (
          <img src={`${process.env.REACT_APP_SERVER_URL}/images/${business.businessLogo}`} alt={business.businessLogo} className="h-10 w-10 rounded-full" />
          ) : (
        <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center text-purple-600 justify-center">{business.businessName[0].toUpperCase()}</div>
         )}
          <div className="px-3 py-2">
            <p className=" font-bold text-gray-700 mb-2">{business.businessName.toUpperCase()}</p>
            <p className="text-gray-500 font-light">Phone No: {business.contact.phone}</p>
            <p className="text-gray-500 font-light">Email: {business.contact.email}</p>
            <p className="text-gray-500 font-light">Category: {business.category}</p>
            <p className="text-gray-500 font-light">Operating Hour: {business.operatingHour}</p>
            <p className="text-gray-500 font-light">Description: {business.description}</p>
          </div>
        </div>
       
      ))} </React.Fragment>}
      </div>
    </div>
  );
};

