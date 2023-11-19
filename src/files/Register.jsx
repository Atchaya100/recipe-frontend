import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const [formData, setFormData] = useState({
    name:"",
    username:"",
    email: "",
    password: ""
  })
  const navigate=useNavigate();
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value})
 }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const data=await fetch('https://recipe-backend-rvag.onrender.com/api/createAccount', {
  method: 'post',
  headers: {'Content-Type':'application/json'},
  body:JSON.stringify({
    
    "name":formData.name,
    "username":formData.username,
    "email":formData.email,
    "password":formData.password
  
  })
 })
 const result=await data.json();
 console.log(result)
  if(result=="Mail id already exists" || result=="Username exists"){
    document.getElementById("email").style.display="block"
  }
  else if(result=="success"){
    navigate("/login");
  }
  }
  
  
  
  return (
    <div id="form">
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" onChange={handleChange} value={formData.name} required/>
           </Form.Group>
           <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" name="username" onChange={handleChange} value={formData.username} required/>
           </Form.Group>
           <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" onChange={handleChange} value={formData.email} required placeholder="name@example.com" />
           </Form.Group>
           <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
           <Form.Control type="password" onChange={handleChange} name="password" value={formData.password} required/>
           </Form.Group>
           <p><Button type="submit" variant="success">Register</Button>&nbsp;&nbsp;
          </p>
          <p id="email">Email id or username already exist</p>
        </Form>
         
    </div>
  )
}