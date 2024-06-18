

import { useEffect, useState } from "react";
import { images, content } from "./imageSliderAssests";
function ImageSlider(){
  const [currIndex, setCurrIndex] = useState(0);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-[100%] h-[100%] relative">
      {/* Image Container */}
      <div className="relative w-[100%] h-[100%]">
        {images.map((image, index) => (
          <div key={index} className={`absolute top-0 left-0 transition-opacity duration-300 ${index === currIndex ? 'opacity-100' : 'opacity-0'} w-[100%] h-[100%]`}>
            <img src={`/images/${image}`} alt={`image${index + 1}`} className="w-[100%] h-[100%] object-cover" />
            {/* Content on Images */}
            <div className="absolute bottom-1/2 left-0 bg-black bg-opacity-50 text-white p-2">
              <h3 className="text-lg font-semibold mb-1">Our Platform:</h3>
              <p className="text-sm">{content[index]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ImageSlider;
