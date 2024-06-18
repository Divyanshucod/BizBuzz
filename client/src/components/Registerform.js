export const Registerform = ({
  handleSubmit,
  setRegisterInfo,
  RegisterInfo,
  setLogin,
  Login,
  error,
}) => {
  function handleChange(e) {
    e.stopPropagation();
    setRegisterInfo({ ...RegisterInfo, [e.target.name]: e.target.value });
  }
  return (
    <div className="form-box  w-[100%] md:w-[55%] lg:w-[45%] p-5 lg:p-10 ">
      <div className="inner_div w-[100%] ssm:w-[80%]">
        <p className="HeadingStyle text-2xl ssm:text-4xl">Hello,</p>
        <pre className="HeadingStyle text-xl ssm:text-2xl">Register</pre>
        <p className="paraGraphStyle">
          Enter Your details to create you account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="container flex-wrap ssm:flex-nowrap ssm:gap-4">
            <div className="containerLeft w-[100%] ssm:w-[80%]">
              <label className="text-sm ssm:text-xl">First Name*:</label>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                value={RegisterInfo.firstName}
                className=" px-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
               {error.firstName && <p className="text-red-400">{error.firstName}</p>}
            </div>
            <div className="containerRight w-[100%]  ssm:w-[80%]">
              <label className="text-sm ssm:text-xl">Last Name:</label>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
                value={RegisterInfo.lastName}
                className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="text-sm ssm:text-xl">Email*:</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={RegisterInfo.email}
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {error.Email && <p className="text-red-400">{error.Email}</p>}
          </div>
          <div className="container flex-wrap ssm:flex-nowrap ssm:gap-4">
            <div className="containerLeft w-[100%]  ssm:w-[80%]">
              <label className="text-sm ssm:text-xl">Password:</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={RegisterInfo.password}
                className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
               {error.Password && <p className="text-red-400">{error.Password}</p>}
            </div>
            <div className="containerRight w-[100%]  ssm:w-[80%]">
              <label className="text-sm ssm:text-xl">Confirm Password:</label>
              <input
                type="password"
                placeholder="confirm password"
                name="confirmPassword"
                onChange={handleChange}
                value={RegisterInfo.confirmPassword}
                className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
               {error.ConfirmPassword && <p className="text-red-400">{error.ConfirmPassword}</p>}
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <button type="submit" className="submitBtn my-3 ssm:my-6">
              Register
            </button>
          </div>
          <p onClick={() => setLogin(!Login)} style={{ textAlign: "center" }}>
            Already have an Account?{" "}
            <span style={{ color: "#007fff" }}>Log In</span>
          </p>
        </form>
      </div>
    </div>
  );
};
