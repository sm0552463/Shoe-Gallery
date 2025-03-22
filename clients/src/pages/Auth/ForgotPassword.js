import React, { useState } from "react";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import toast from 'react-hot-toast';
import {useNavigate,useLocation} from 'react-router-dom'
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
      const [newPassword, setNewPassword] = useState("");
      const [answer, setAnswer] = useState("");
      const navigate = useNavigate();
      
       //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/forgot-password",
        {   email,
            newPassword,
            answer,    
        }
      );
      if(res && res.data.success){
        toast.success(res.data.message)
       
        navigate('/login');
      }else{
         toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!");
    }
  };
  return (
    <Layout title={"forgot password-Ecommerce App"}>
     <div className="form-container">
              <h1>RESET PASSWORD</h1>
              <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter your Answer"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Reset
                </button>
                
              </form>
            </div>
    </Layout>
  )
}

export default ForgotPassword
