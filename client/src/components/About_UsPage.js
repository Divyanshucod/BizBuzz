import React from "react";

import { useNavigate } from "react-router-dom";

const AboutUsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>
        <div className="flex flex-col items-center md:flex-row  md:items-start justify-center mb-8">
          <div className="md:w-1/2 md:mr-8">
            <p className="text-lg leading-relaxed mb-4">
              Welcome to our local business platform! We provide a platform for
              businesses to showcase their services and for users to discover
              and review local businesses. Whether you're a business owner
              looking to connect with your community or a user seeking great
              local services, we've got you covered.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Our platform allows businesses to register easily and manage their
              profiles, while users can leave reviews, find recent reviews, and
              engage with businesses directly.
            </p>
            <div className="flex items-center mb-4">
              <button
                onClick={() => navigate("/addBusiness")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Register Your Business
              </button>
            </div>
            <div className="flex">
              {/* <a href="#"><img src={businessPhoto} alt="Business Photo" className="w-24 h-24 object-cover rounded-full mr-4" /></a> */}
              <div>
                <p className="font-bold">Local Business Platform</p>
                <p className="text-gray-600">Delhi,Gurugram</p>
                <div className="flex justify-start gap-3 mt-2">
                  <img src="/images/linkedin.png" className="w-10 h-10" />
                  <img src="/images/instagram.png" className="w-10 h-10" />
                  <img src="/images/facebook.png" className="w-10 h-10" />
                </div>
              </div>
            </div>
          </div>
          <div className=" mt-4 md:w-1/2 md:ml-8 md:mt-0">
            <img
              src={"images/image3.jpg"}
              alt="About Us Image"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
      <footer className="bg-gray-900 text-white text-center py-4">
        <p>&copy; 2023-2024 Local Business Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUsPage;
