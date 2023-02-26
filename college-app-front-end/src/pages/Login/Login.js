import React, { useState } from "react";
import "../Register/Register.css";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
const Login = () => {
  const navigate = useNavigate();

  const toast_style={
    position:"bottom-right",
    autoClose:4000,
    pauseOnHover:true,
    draggable:true,
    theme:"light",
    
  }
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [LoginDetail, setLoginDetail] = useState({
    firstname: "",
    lstname: "",
    email: "",
    password: "",
    conf_password: "",
  });
  const handleDetail = async (event) => {
    const { name, value } = event.target;
    await setLoginDetail((prevValue) => {
      event.preventDefault();
      return {
        ...prevValue,
        [name]: value,
      };
    });
    // await console.log(LoginDetail);
  };

  const onSubmit=()=>{
    if(  !LoginDetail.email ||!LoginDetail.password) { 
      toast.error("Please Fill all the detail",toast_style)
    }else{
      setSubmitButtonDisabled(true); 
    signInWithEmailAndPassword(auth, LoginDetail.email, LoginDetail.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        toast.error(err.message,toast_style)
      }); 
    }
  } 

  return (
    <div className="form">
      <div className="form-body">
        <h2>LogIn</h2>
         
        <div className="email">
          <label className="form__label" for="email">
            Email{" "}
          </label>
          <input
            type="email"
            name="email"
            onChange={handleDetail}
            className="form__input"
            placeholder="Email"
          />
        </div>
        <div className="password">
          <label className="form__label" for="password">
            Password{" "}
          </label>
          <input
            className="form__input"
            onChange={handleDetail}
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
         
        <div>
          <button
            onClick={onSubmit}
            type="submit"
            className="btn"
            disabled={submitButtonDisabled}
          >
            LogIn
          </button>
          <p>
            Don't have an account?{" "}
            <span>
              <Link to="/signup">Create Account</Link>
            </span>
          </p>
        </div>
      </div>
      <ToastContainer style={{}}/>
    </div>
  );
};

export default Login;