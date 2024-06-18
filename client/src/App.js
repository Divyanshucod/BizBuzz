import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { Auth } from './components/Auth.js';
import { Navbar } from './components/Navbar.js';
import {Home} from './components/Home.js'
import {AddBusiness} from './components/AddBusiness.js'
import {Recent_Reviews} from './components/RecentReviews.js'
import DetailedBusinessInfo from './components/DetailedBusinessInfo.js'
import './App.css'
import { useState } from 'react';
import axios from 'axios';
import { RatingPage } from './components/RatingPage.js';
import {ListOfBusiness} from './components/ListOfBusiness.js'
import { PostSection } from './components/PostSection.js';
import './index.css'
export const App = ()=>{
    const userId = localStorage.getItem('userId');
    const initialBusiness = {businessName:'',phone:"",email:'',category:'',description:'',operatingHour:'',AddressLine:'',city:'',state:'',country:'',pin:''};
    const [businessInfo,setBusinessInfo] = useState(initialBusiness);
    const [Login,setLogin] = useState(false);
    const handleSubmit = async (e)=>{
       e.preventDefault();
       const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/business/addbusiness`,{...businessInfo,userId:userId});
       alert(res.data.message);
       setBusinessInfo(initialBusiness);
    }
    return(
        <div className="relative app">
          <Router>
            <Navbar/>
             <Routes>
               <Route path='/Login&Register' element={<Auth Login={Login} setLogin={setLogin}/>}/>
               <Route path='/' element={<Home />}/>
               <Route path='/addBusiness' element={<AddBusiness businessInfo={businessInfo} setBusinessInfo={setBusinessInfo} handleSubmit={handleSubmit}/>}/>
               <Route path='/recentReviews' element={<Recent_Reviews/>}/>
               <Route path='/detailedInfo' element={<DetailedBusinessInfo/>}/>
               <Route path='/ratingPage' element={<RatingPage/>}/>
               <Route path='/ListOfBusiness' element={<ListOfBusiness/>}/>
               <Route path='/postSection' element={<PostSection/>}/>
             </Routes>
          </Router>
        </div>
    )
}