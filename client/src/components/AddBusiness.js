import { FormField } from "./formField";
import { categories } from "./categories";
export const AddBusiness = ({
  businessInfo,
  setBusinessInfo,
  handleSubmit,
}) => {
  function handleChange(e) {
    e.stopPropagation();
    setBusinessInfo({ ...businessInfo, [e.target.name]: e.target.value });
  }
  return (
    <div className="flex overflow-y-auto w-screen h-screen flex-wrap sm1:overflow-hidden  sm1:flex-nowrap">
      {/* Left Side */}
      <section
        className=" flex-1 p-4 left h-[100%] basis-1/2 flex flex-col justify-between
      "
      >
        <div>
          <p className="text-2xl ssm:text-3xl font-bold mb-2 font-mono">
            Grow Your Business With Us
          </p>
          <p className="text-sm ssm:text-lg mb-2 font-mono">
            Give a kickstart to your business. Register now. It's quick and
            easy.
          </p>
        </div>
        <img
          src="images/AddBusinessImg.png"
          className="h-full w-full object-cover"
        />
      </section>

      {/* Right Side */}
      <section className=" bg-slate-100 flex-1 p-4 overflow-y-auto basis-1/2">
        <div className="w-full flex-grow">
          <h2 className="text-xl font-bold mb-2 font-mono">
            Create New Business
          </h2>
          <p className="mb-2 font-mono">All details are mandatory.</p>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {/* Form fields */}
            <label className="font-mono">Business Information</label>
            <div className="border border-gray-400 p-4">
              {/* Business Name */}
              <FormField
                title="Business Name:"
                placeHolder="Business Name"
                handleChange={handleChange}
                typeOffield="text"
                Name="businessName"
                businessInfo={businessInfo.businessName}
              />
              {/* Phone No */}
              <FormField
                title="Phone No:"
                placeHolder="Phone No"
                handleChange={handleChange}
                typeOffield="number"
                Name="phone"
                businessInfo={businessInfo.phone}
              />
              {/* Email */}
              <FormField
                title="Email:"
                placeHolder="Business Email/Your Email"
                handleChange={handleChange}
                typeOffield="email"
                Name="email"
                businessInfo={businessInfo.email}
              />
              {/* Category */}
              <label htmlFor="category font-mono">Category:</label>
              <select
                name="category"
                value={businessInfo.category}
                onChange={handleChange}
                className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-green-500 max-h-70 overflow-y-auto"
              >
                <option value="#" className="font-mono h-auto">
                  Select Category
                </option>
                {categories.map((value) => (
                  <option value={value.title} className="font-mono h-auto">
                    {value.title}
                  </option>
                ))}
              </select>

              <div className="mb-4">
                <FormField
                  title="Address Line:"
                  placeHolder="Business Address"
                  handleChange={handleChange}
                  typeOffield="text"
                  Name="AddressLine"
                  businessInfo={businessInfo.AddressLine}
                />
              </div>
              <div className="mb-4">
                <FormField
                  title="City:"
                  placeHolder="City"
                  handleChange={handleChange}
                  typeOffield="text"
                  Name="city"
                  businessInfo={businessInfo.city}
                />
              </div>
              <div className="mb-4">
                <FormField
                  title="State:"
                  placeHolder="State"
                  handleChange={handleChange}
                  typeOffield="text"
                  Name="state"
                  businessInfo={businessInfo.state}
                />
              </div>
              <div className="mb-4">
                <FormField
                  title="Country:"
                  placeHolder="Country"
                  handleChange={handleChange}
                  typeOffield="text"
                  Name="country"
                  businessInfo={businessInfo.country}
                />
              </div>
              <div className="mb-4">
                <FormField
                  title="PIN:"
                  placeHolder="PIN"
                  handleChange={handleChange}
                  typeOffield="number"
                  Name="pin"
                  businessInfo={businessInfo.pin}
                />
              </div>
              {/* Description */}
              <label htmlFor="description font-mono">Description:</label>
              <textarea
                rows="4"
                placeholder="Description"
                name="description"
                value={businessInfo.description}
                onChange={handleChange}
                className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
              ></textarea>
              {/* Working Hours */}
              <FormField
                title="Working Hours:"
                placeHolder="Working Hours"
                handleChange={handleChange}
                typeOffield="text"
                Name="operatingHour"
                businessInfo={businessInfo.operatingHour}
              />
            </div>
            <button type="submit" className="btn font-mono">
              Add Business
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
