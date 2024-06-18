export const Loginform = ({ handleSubmit, setLoginInfo, LoginInfo, error ,setLogin}) => {
  function handleChange(e) {
    e.stopPropagation();
    setLoginInfo({ ...LoginInfo, [e.target.name]: e.target.value });
  }
  return (
    <div className="form-box  w-[100%] md:w-[55%] lg:w-[45%] p-5 lg:p-10 ">
      <div className="inner_div w-[100%] ssm:w-[80%]">
        <p className="HeadingStyle text-2xl ssm:text-4xl">Hello,</p>
        <pre className="HeadingStyle text-xl ssm:text-2xl">Welcome Back</pre>
        <p className="paraGraphStyle">
          Enter Your details to create you account
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <label  className="text-sm ssm:text-xl">Email:</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={LoginInfo.email}
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
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
                value={LoginInfo.password}
                className="mt-1 px-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
              />
               {error.Password && <p className="text-red-400">{error.Password}</p>}
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <button type="submit" className="submitBtn  my-3 ssm:my-6">
              Login
            </button>
          </div>
          <p onClick={() => setLogin(false)} style={{ textAlign: "center" }}>
            Create New Account?{" "}
            <span style={{ color: "#007fff" }}>sign up</span>
          </p>
        </form>
      </div>
    </div>
  );
};
