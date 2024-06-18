
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUpload,faXmark,faSignOut } from '@fortawesome/free-solid-svg-icons';

export const Avatar = ({ handleClick }) => {
  const userId = localStorage.getItem("userId");
  const storeChanges = {
    NewUsername: "",
    NewPassword: "",
    OldPassword:"",
  };
  const displayUpdateableDivs = {
    displayUsername: false,
    displayPassword: false,
  };
  const [displays, setDisplays] = useState(displayUpdateableDivs);
  const [ChangedVal, setChangeVal] = useState(storeChanges);
  const [getUserinfo, setUserinfo] = useState({});
  const [toggleUpdates, setToggleUpdates] = useState(false);
  const [storeUpdate, setUpdates] = useState(null);
  const [displayInfo, setDisplayInfo] = useState(false);
  const [error,setError] = useState({});
  const fileInputRef = useRef(null);

  const handleChange = async (e) => {
    e.stopPropagation();
    setChangeVal({ ...ChangedVal, [e.target.name]: e.target.value });
  };

  function handleFileUpload() {
    fileInputRef.current.click();
  }

  const handleUpdate = async (e) => {
    e.stopPropagation();
    const validationErr = {};
    console.log(ChangedVal);
    console.log(ChangedVal.NewPassword,ChangedVal.OldPassword,ChangedVal.NewUsername);
    if(!ChangedVal.NewPassword.trim() && !ChangedVal.NewUsername.trim() && !ChangedVal.OldPassword.trim() && !storeUpdate)
    {
        validationErr.all = 'Any one field is required'
    }
    else if(ChangedVal.NewPassword.trim() && !ChangedVal.OldPassword.trim())
    {
        validationErr.OldPassword = 'Old password is required'
    }
    else if(!ChangedVal.NewPassword.trim() && ChangedVal.OldPassword.trim())
    {
        validationErr.NewPassword = 'New password is required'
    }
    if(Object.keys(validationErr).length === 0){
    if (!toggleUpdates) {
      try {
        const res = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/users/updateInfo`, {
          UpdateInfo: ChangedVal,
          Id: userId,
        });
        console.log(res.data);
        alert(res.data.message ? res.data.message : res.data.error ? res.data.error :'');
        setChangeVal(storeChanges);
        setDisplays(displayUpdateableDivs);
        setError({});
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("image", storeUpdate);
        formData.append("id", userId);
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/users/updateAvatar`,
          formData
        );
        console.log(res.data);
        setChangeVal(storeChanges);
        setDisplays(displayUpdateableDivs);
        setError({});
      } catch (err) {
        console.error(err);
      }
    }
  }
  else{
    setError(validationErr);
  }
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUpdates(file);
      setToggleUpdates(!toggleUpdates);
    }
  };

  useEffect(() => {
    const listenBackend = async () => {
      console.log('call happen');
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/users/userInfo/${userId}`
      );
      console.log(res.data);
      setUserinfo(res.data);
    };
    listenBackend();
  }, []);

  return (
    <div  className="flex flex-col">
      <div>
        <div
          className="w-11 h-11 rounded-full overflow-hidden cursor-pointer"
          onClick={() => setDisplayInfo(!displayInfo)}
        >
          {!getUserinfo.Avatar ? (
            <img src="/images/user.png" alt="Avatar" />
          ) : (
            <img
              src={`http://localhost:8080/images/${getUserinfo.Avatar}`}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Information section */}
      {displayInfo && (
        <div className="absolute top-2 right-0 mt-12 p-4 bg-white shadow-lg rounded-md z-10 overflow-y-auto h-[100%] md:h-[80%] w-full ssm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col">
          {error.all && <p className="text-red-500 text-sm md-2 dark:text-red-800">{error.all}</p>}
          <FontAwesomeIcon 
          icon={faXmark}
            className="text-gray-400 h-6 w-6 absolute top-3 right-3 cursor-pointer"
            onClick={() => setDisplayInfo(!displayInfo)}
          />
          <div className="flex items-center mb-4 flex-col">
            <div
              className="w-12 h-12 rounded-full overflow-hidden cursor-pointer"
              onClick={handleFileUpload}
            >
              {!getUserinfo.Avatar ? (
                <img src="/images/user.png" alt="Avatar" />
              ) : (
                <img
                  src={`http://localhost:8080/images/${getUserinfo.Avatar}`}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <input
              type="file"
              className="hidden"
              accept="image"
              ref={fileInputRef}
              onChange={handleUpload}
            />
            <div className="flex flex-col items-center">
              <p className="font-semibold text-sm">{`${getUserinfo.firstName} ${getUserinfo?.lastName}`}</p>
            </div>
          </div>
          <div className="flex flex-col text-2xl gap-4">
          <Link to={!userId ? '/Login&Register':'/addBusiness'} className="linkStyle xssm:block ssm:hidden">Add Business</Link>
            <Link to="postSection" className="linkStyle">Post</Link>
            <Link to='/RecentReviews' className="linkStyle ">Recent Reviews</Link>
          </div>
          {/* Updateable fields */}
          <div className="space-y-4 text-2xl mt-5">
            <div className="flex flex-col gap-4">
              <label
                className="cursor-pointer"
                onClick={() =>
                  setDisplays({ ...displayUpdateableDivs, displayUsername: true })
                }
              >
                Change Username
              </label>
              <input
                type="text"
                placeholder="Change Username"
                name="NewUsername"
                value={ChangedVal.NewUsername}
                onChange={handleChange}
                className={`ml-2 border-b border-gray-300 focus:outline-none ${
                  displays.displayUsername ? "block" : "hidden"
                }`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="cursor-pointer"
                onClick={() =>
                  setDisplays({ ...displayUpdateableDivs, displayPassword: true })
                }
              >
                Change Password
              </label>
              {displays.displayPassword &&
              <div className="ml-3">
                <div className="mt-2">
              <label
                className="cursor-pointer dark:text-gray-300"
              >
                New Password
              </label>
              <input
                type="password"
                placeholder="New Password"
                name="NewPassword"
                value={ChangedVal.NewPassword}
                onChange={handleChange}
                className={`ml-2 border-b border-gray-300 focus:outline-none  dark:bg-gray-800 dark:border-gray-600 dark:text-white p-1`}
              /> 
              {error.NewPassword && <p className="text-red-500 text-sm md-2 dark:text-red-800">{error.NewPassword}</p>}
              </div>
              <div className="mt-2 mb-2">
              <label
                className="cursor-pointer dark:text-gray-300"
              >
                Old Password
              </label>
              <input
                type="password"
                placeholder="Old Password"
                name="OldPassword"
                value={ChangedVal.OldPassword}
                onChange={handleChange}
                className={`ml-2 border-b border-gray-300 focus:outline-none  dark:bg-gray-800 dark:border-gray-600 dark:text-white p-1`}
              />
              {error.OldPassword && <p className="text-red-500 text-sm md-2 dark:text-red-800">{error.OldPassword}</p>}
              </div>
              </div>}
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <FontAwesomeIcon 
            icon={faUpload}
              onClick={handleUpdate}
              className="px-2 py-2 bg-blue-500 text-white rounded-md focus:outline-none cursor-pointer"
            />
            <FontAwesomeIcon icon={faSignOut} className="px-2 py-2 bg-emerald-600 text-white rounded-md focus:outline-none cursor-pointer" onClick={handleClick}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;

