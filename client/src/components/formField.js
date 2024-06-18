export const FormField = ({title,placeHolder,handleChange,typeOffield,Name,businessInfo})=>{ 

    return <><label htmlFor={Name} className=" font-mono">{title}</label>
    <input
      id={Name}
      type={typeOffield}
      placeholder={placeHolder}
      name={Name}
      value={businessInfo}
      onChange={handleChange}
      className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
    />
    </> 
}