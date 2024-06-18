import { useState} from "react";
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {Loginform} from './Loginform.js'
import {Registerform }from './Registerform.js'
import { useNavigate } from "react-router-dom";
import validator from 'validator'

export const Auth = ({Login,setLogin})=>{
    const [error,setError] = useState({});
    const [cookie,setCookie] = useCookies(['access_token']);
    const navigate = useNavigate();
    const RegisterForm = {
        firstName:'',
        lastName:'',
        password:'',
        email:'',
        confirmPassword:''
    }
    const LoginForm = {
        password:'',
        email:'',
    }
    const [LoginInfo,setLoginInfo] = useState(LoginForm);
    const [RegisterInfo,setRegisterInfo]= useState(RegisterForm);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(Login){
            const validationError = {};
            if(!LoginInfo.email.trim()){
              validationError.Email = 'Email is Required';
             }
             else if(!validator.isEmail(LoginInfo.email))
             {
              validationError.Email = 'invalid Email'
             }
             if(!LoginInfo.password.trim()){
              validationError.Password = 'Password is Required';
             }
             if(Object.keys(validationError).length === 0){
            try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`,LoginInfo)
            console.log(res.data);
              if (!res.data.token) {
                alert(`${res.data.message}`);
              } else {
                localStorage.setItem('userId',res.data.userId);
                localStorage.setItem('Username',res.data.name)
                setCookie('access_token',res.data.token);
                setLoginInfo(LoginForm);
                navigate('/');
              }
            } catch (err) {
              console.error(err);
            }
          }
          else{
            setError(validationError);
          }
          }
        else
            {
              console.log('inside the resgistartion');
                const validationError = {};
                console.log(RegisterInfo.password, RegisterInfo.confirmPassword, RegisterInfo.confirmPassword === RegisterInfo.password);
                // Registration logic
               if(!RegisterInfo.firstName.trim()){
                  validationError.firstName = 'First Name is Required';
               }
               else if(RegisterInfo.firstName.trim().length < 3){
                  validationError.firstName = 'First Name Must be of 3 characters'
               }
               if(!RegisterInfo.email.trim()){
                validationError.Email = 'Email is Required';
               }
               else if(!validator.isEmail(RegisterInfo.email))
               {
                validationError.Email = 'invalid Email'
               }
               if(!RegisterInfo.password.trim()){
                validationError.Password = 'Password is Required';
               }
               else if(RegisterInfo.password.trim().length < 8){
                validationError.Password = 'Password must be at 8 characters';
               }
               else if(RegisterInfo.password.trim() !== RegisterInfo.confirmPassword.trim()){
                validationError.ConfirmPassword = 'Password do not match'
               }
               if(Object.keys(validationError).length === 0){
                try {
                    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/register`,RegisterInfo);
                    alert(res.data.message);
                    setRegisterInfo(RegisterForm);
                    setError({});
                    navigate('/Login&Register')
                  } catch (err) {
                    console.error(err);
                  }
                }
                else{
                    setError(validationError);
                } 
            } 
        
    }
    return( 
        <div className="flex flex-wrap-reverse md:flex-nowrap w-screen h-[100%] justify-between">
        {Login?<Loginform handleSubmit={handleSubmit} setLoginInfo={setLoginInfo} LoginInfo={LoginInfo} error={error} setLogin={setLogin}/>:<Registerform handleSubmit={handleSubmit} setRegisterInfo={setRegisterInfo} RegisterInfo={RegisterInfo} Login={Login} setLogin={setLogin} error={error}/>}
        <section className="leftslide w-[100%] md:w-[45%] lg:w-[55%]">
        </section>
        </div>
    )
}

    
      
     
     