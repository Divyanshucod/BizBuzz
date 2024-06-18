import { Link} from "react-router-dom" 

import {useCookies} from 'react-cookie';

import { SearchBar } from "./SearchBar";

import { Avatar } from "./Avatar";

export const Navbar = ()=>{
    const userId = localStorage.getItem('userId')
    const [cookie,setCookie] = useCookies(['access_token']);
   
    function handleClick(e){
      e.stopPropagation();
        localStorage.removeItem('userId');
        localStorage.removeItem('Username')
        setCookie('access_token','');
     }
  
    return (
        <nav className="bg-zinc-100 p-4 flex items-center mb-1 gap-5">
            <div className="flex items-center">
            <Link to='/' >
            <div className="logo">
               <img src="/images/LBP_MytransparentLogo2.png"/>
            </div>
            </Link> 
            <div className="relative ">
            <SearchBar/>
            </div>
            </div>
            <div className="flex gap-3 items-center ">
            <Link to={!userId ? '/Login&Register':'/addBusiness'} className="linkStyle hidden ssm:block">Add Business</Link>
            {userId? <Avatar  handleClick={handleClick}/>  :<Link to='/Login&Register' className="bg-green-500 text-white px-3 py-1 rounded-md">LogSign</Link>}
            </div>
        </nav>
    )
} 
