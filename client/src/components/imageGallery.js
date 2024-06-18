import axios from "axios";
import { useEffect, useState } from "react"
import { ShowBusinessInfo } from "./showBusinessInfo";

export const ImagesGallery = ({ businessId }) => {
  const BusinessInfo = {
    businessName: "",
    businessLogo: "",
    description: "",
    operatingHour: "",
    rating: 1,
    images: [],
  };
  const [businessInfo, setBusinessInfo] = useState(BusinessInfo);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/business/specificInfo/${businessId}`);
      console.log(res.data);
      setBusinessInfo({
        businessName: res.data.businessName,
        description: res.data.description,
        businessLogo: res.data.businessLogo ? res.data.businessLogo : "",
        images: res.data.images,
        operatingHour: res.data.operatingHour,
      });
    };
    fetch();
  }, [businessId]);

  return (
    <div className="relative w-screen  h-[40%]">
      <div className=" overflow-x-auto h-[100%]" id="imageGallery">
        {businessInfo.images.length === 0?<div className="flex gap-1 h-[100%]"><img
            src={`/images/image2.jpg`}
            className=" w-[100%] h-70 object-cover"
           /> </div>:<div className="flex gap-1 h-[100%]">
           {businessInfo.images.map((val, ind) => (
             <img
             src={`http://localhost:8080/images/${val}`}
             alt={`Image ${ind + 1}`}
             className=" w-[100%] h-70 object-cover"
             key={ind}
            /> 
           ))}
         </div>}
        <div className={`absolute bottom-0 ${businessInfo.images.length === 0?'left-0':'left-6'} bg-black bg-opacity-50  h-1/2 text-white xssm:w-full ssm:w-1/2 md:w-1/3 rounded-sm cursor-pointer`}>
                <ShowBusinessInfo
                 businessName={businessInfo.businessName} businessLogo={businessInfo.businessName[0]} businessDescripe={businessInfo.description} businessOperatehour={businessInfo.operatingHour} ratings={businessInfo.rating}
                />
              </div>
      </div>
      {businessInfo.images.length > 4 && (
        <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-50 text-white p-2 cursor-pointer" onClick={() => {
          const gallery = document.getElementById("imageGallery");
          gallery.scrollLeft -= 100;
        }}>
          &lt;
        </div>
      )}
      {businessInfo.images.length > 4 && (
        <div className="absolute top-0 bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-50 text-white p-2 cursor-pointer" onClick={() => {
          const gallery = document.getElementById("imageGallery");
          gallery.scrollLeft += 100;
        }}>
          &gt;
        </div>
      )}
    </div>
  );
};



