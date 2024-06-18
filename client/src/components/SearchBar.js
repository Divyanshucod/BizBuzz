

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SearchBar = ({ }) => {
    const [fetchBusinesses, setFetchBusinesses] = useState([]);
    const [str, setStr] = useState('');
    const navigate = useNavigate();

    const handleClick = async (id) => {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/business/${id}`);
        navigate('/detailedInfo', { state: { fullDetails: res.data, id: id } });
    };

    const fetchData = async (value) => {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/business/serchBusinesses`, { str: value });
        setFetchBusinesses(res.data);
    };

    const handleChange = (e) => {
        e.stopPropagation();
        fetchData(e.target.value);
        setStr(e.target.value);
    };

    return (
        <div className="relative mb-0 ml-2">
            <div className="relative">
                <input
                    type="text"
                    value={str}
                    onChange={handleChange}
                    placeholder="Search Businesses"
                    name="search"
                    className="border border-gray-300 rounded-full py-1 px-2 pl-10 pr-10 focus:outline-none focus:border-blue-500"
                />
                <div className="flex items-center pl-3 pointer-events-none absolute inset-y-0 left-0">
                    <FontAwesomeIcon icon={faSearch} className="text-green-500 cursor-pointer"/>
                </div>
            </div>
            {str.length > 0 && (
                <div className="absolute top-full w-full max-h-100 overflow-y-auto bg-white rounded-md shadow-md z-10 mt-1">
                    {fetchBusinesses.map((info, index) => (
                        <div
                            key={index}
                            onClick={() => handleClick(info._id)}
                            className="cursor-pointer hover:bg-gray-100 transition-colors duration-200 rounded-md p-2"
                        >
                            {info.businessName}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};



