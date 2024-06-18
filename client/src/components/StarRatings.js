export const StartRating = ({Rating})=>{
    return (
        <div>
         {[...Array(Rating)].map((star)=>(
            <span style={{color:'orange',fontSize:'30px'}}>&#9733;</span>
         ))}
         {[...Array(5-Rating)].map((star)=>(
            <span style={{color:'orange',fontSize:'30px'}}>&#9734;</span>
         ))}
        </div>
    )
}