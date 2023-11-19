import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link} from "react-router-dom";
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const navigate=useNavigate();
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value})
 }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    console.log(formData);
    const data=await fetch('https://recipe-backend-rvag.onrender.com/api/login', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify({
       "email": formData.email,
       "password":formData.password
      })
     })
     const result=await data.json();
     localStorage.setItem("token",result.token)
     localStorage.setItem("username",result.authData.username)
     localStorage.setItem("name",result.authData.name)
     localStorage.setItem("email",result.authData.email)
     if(result=="wrong password" ||result=="wrong mailid"){
      document.getElementById("hide").style.display="block";
     }
     else{
      navigate("/recipe")
     }
    
    
  }
  
  return (
    <div id="form">
        <Form onSubmit={handleSubmit}>
           <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" onChange={handleChange} value={formData.email} required placeholder="name@example.com" />
           </Form.Group>
           <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
           <Form.Control type="password" onChange={handleChange} name="password" value={formData.password} required/>
           </Form.Group>
           <p><Button type="submit" variant="success">Login</Button>&nbsp;&nbsp;
          <Link to="/register">Need an Account? Register</Link>
          </p>
          <p id="hide">Wrong mail id or password</p>
        </Form>
         
    </div>
  )
}