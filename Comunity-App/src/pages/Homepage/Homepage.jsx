import React, { useEffect, useState } from "react";
import Navbar from "../HomepageCompo/navbar/navbar";
import "./Homepage.css";
import Services from "../HomepageCompo/services/services";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../state/index";

const Homepage = () => {
  const dispatch = useDispatch();
  const [userDetail, setUserDetail] = useState("null");
  const navigate = useNavigate();
  const user = useSelector((state) => state);



  useEffect(() => {
     
    const userHistory = JSON.parse(localStorage.getItem("ComUnity"));
    if (userHistory == null) {
      navigate("/login");
    } else {
      const checkingLogin = async () => {
        try {
          const response = await axios.post(
            "http://localhost:5000/checkLogin",
            {
              email: userHistory.email,
              password: userHistory.password,
            }
          );
          if (!response.data.status) {
            navigate("/login");
          } else {
            setUserDetail();
            await dispatch(actionCreators.setUserDetails(response.data.data))
          }
        } catch (error) {
          console.log(error);
        }
      };
      checkingLogin(); 
    
    }
  },[]);
  return (
    <>
      {userDetail === "null" ? (
        <img
          style={{ margin: "35vh 0 0 35vw" }}
          src="https://i.gifer.com/YCZH.gif"
          alt=""
        />
      ) : (
        <div className="home">
          <Navbar />
          <Services />
        </div>
      )}
    </>
  );
};

export default Homepage;
