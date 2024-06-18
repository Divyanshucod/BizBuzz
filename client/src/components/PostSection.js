import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faXmark, faUpload } from "@fortawesome/free-solid-svg-icons";

export const PostSection = () => {
  const [Allposts, setAllposts] = useState([]);
  const [menu, setMenu] = useState([]);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [imagesTosend, setImagesTosend] = useState([]);
  const [handlePostButtons, setPostButtons] = useState({});

  const handleButtons = (data) => {
    data.forEach((element) => {
      setPostButtons((prevStatus) => ({
        ...prevStatus,
        [element.busId]: false,
      }));
    });
  };

  const userId = localStorage.getItem("userId");

  const fetchMenu = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/users/businessname/${userId}`
    );
    // console.log(res.data);
    setDisplayMenu(!displayMenu);
    handleButtons(res.data);
    setMenu(res.data);
  };

  const handleChange = async (e) => {
    console.log(e.target.name);
    const file = e.target.files;
    const data = [];
    for (let i = 0; i < file.length; i++) {
      data.push(file[i]);
    }
    setImagesTosend(data);
    setPostButtons((prevStatus) => ({ ...prevStatus, [e.target.name]: true }));
  };

  const handleUpload = async (Id) => {
    const formData = new FormData();
    imagesTosend.forEach((element) => {
      formData.append("images", element);
    });
    formData.append("id", Id);
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/business/upload`,
      formData
    );
    alert(res.data);
    setImagesTosend([]);
    setPostButtons((prevStatus) => ({ ...prevStatus, [Id]: false }));
    window.location.reload();
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/business/download/${userId}`
      );
      console.log(res.data);
      setAllposts(res.data);
    };
    fetch();
  }, []);
  console.log(handlePostButtons);
  return (
    <div className="h-screen overflow-y-auto w-screen">
      {Allposts.length === 0 ? (
        <div className="EmptyPage bg-gray-100 p-4 rounded-md shadow-md">
          Haven't Created Business Yet
        </div>
      ) : (
        <div className="h-[100%] overflow-y-auto">
          {Allposts.map((values, index) => (
            <>
              {values.Posts.length !== 0 && (
                <div className="max-h-[80%]">
                  <div
                    key={index}
                    className=" bg-white p-4 mb-4 rounded-md shadow-md h-[100%] w-[100%] overflow-y-auto"
                  >
                    <h1 className="text-xl font-semibold">
                      {values.BusinessName.toUpperCase()}
                    </h1>
                    <div className="post-images grid grid-cols-1 ssm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 mt-4 h-[100%] overflow-y-auto">
                      {values.Posts.map((imgs, newIndex) => (
                        <img
                          className="w-full h-80 object-cover rounded-md"
                          src={`http://localhost:8080/images/${imgs}`}
                          key={newIndex}
                          alt={`Post ${newIndex}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      )}
      <FontAwesomeIcon
        icon={faAdd}
        className="postButton bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
        onClick={fetchMenu}
      />
      <div
        className="w-full ssm:w-1/2 md:w-1/3 h-1/3 businessMenu fixed left-0 bottom-0 bg-white p-4 transition-transform duration-300 transform"
        style={{
          transform: displayMenu ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <FontAwesomeIcon
          icon={faXmark}
          className="closeMenu absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={() => {setDisplayMenu(false);setPostButtons({})}}
        />
        {menu.length === 0 && <p>No Business Created Yet!</p>}
         {menu.map((val, index) => (
          <label
            className="businessNameMenu block my-2"
            htmlFor={`upload-file-${val.busId}`}
            key={`${val._id}+${index}`}
          >
            <input
              type="file"
              id={`upload-file-${val.busId}`} 
              onChange={handleChange}
              name={val.busId}
              multiple
              accept="image/*"
              className="hidden"
            />
            <div className="flex justify-between py-2 px-1 shadow-md rounded-md ">
              <span className="cursor-pointer">
                {val.businessName.toUpperCase()}
              </span>
              {handlePostButtons[val.busId] ? (
                <FontAwesomeIcon
                  icon={faUpload}
                  onClick={() => handleUpload(val.busId)}
                  className="bg-white border border-gray-400 text-green-400 p-0.5 rounded-md shadow-md hover:bg-green-600 ml-2 focus:outline-none"
                />
              ) : (
                ""
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
