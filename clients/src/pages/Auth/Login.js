import React, { useState } from "react";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import toast from 'react-hot-toast';
import {useNavigate,useLocation} from 'react-router-dom'
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();
      const location=useLocation();
      const [auth,setAuth] = useAuth()
       //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        { email, password}
      );
      if(res && res.data.success){
        toast.success(res.data.message)
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth',JSON.stringify(res.data));
        navigate(location.state||'/');
      }else{
         toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!");
    }
  };
  return (
    
       <Layout title={"Login-Ecommerce App"}>
            <div className="form-container">
              <h1>LOGIN</h1>
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
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  LOGIN
                </button>
                <div className="mt-3 ">

                <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>
                  Forgot Password
                </button>
                </div>
              </form>
            </div>
          </Layout>
   
  )
}

export default Login
