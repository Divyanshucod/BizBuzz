
export const StarRating = ({setStarRating,setImages,initialEmptyStar,initialFullStar,images})=>{
     const handleRatingChange=(event)=>{
         event.stopPropagation();
         const SlicedFullStar = initialFullStar.slice(0,event.target.value);
         const SlicedEmptyStar = initialEmptyStar.slice(event.target.value,5);
         setStarRating(event.target.value);
         setImages([...SlicedFullStar,...SlicedEmptyStar]);
     };
     return (
        <div className="starDiv">
            {images.map((imag,index)=>(
                <div key={index+1}>
                 <input type="radio" id={`{star${index+1}}`} name="starRating" value={index+1}  onChange={handleRatingChange}/>
                
                 <label htmlFor={`{star${index+1}}`} className="label_items"> <img src={imag} width='35px' height='35px'/></label>
                </div>
            ))}

        </div>
     )
}