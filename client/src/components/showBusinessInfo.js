

import { StartRating } from "./StarRatings"

export const ShowBusinessInfo = ({businessName,businessLogo,businessOperatehour,businessDescripe,ratings})=>{
      return (
        <div className="flex gap-4 w-[100%] h-[100%] overflow-y-auto p-2">
      {(businessLogo && businessLogo.length !== 1) ? (
        <img src={`${process.env.REACT_APP_SERVER_URL}/images/${businessLogo}`} alt={businessName} className="h-16 w-16 rounded-full" />
      ) : (
        <div className="bg-gray-200 rounded-full h-10 w-14 0 flex items-center text-purple-600 justify-center">{businessLogo}</div>
      )}
      <div>
        <h2 className="text-lg font-bold">{businessName}</h2>
        <StartRating Rating={ratings ? ratings : 4 }/>
        <p className="text-sm">{businessOperatehour}</p>
        <p className="text-sm">{businessDescripe}</p>
      </div>
    </div>
    )
}


