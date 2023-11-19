import React,{useState} from 'react';
import { Button } from 'react-bootstrap';
import '../styles/Recipes.css';
import { Link, useParams} from "react-router-dom";
import foof from '../assets/foof.webp';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const Recipes = () => {
  const [formData, setFormData] = useState([])
  const nav=useNavigate()
  useEffect(() => {
    if(localStorage.getItem("token")==null){
      nav("/login")
     }

  const findAll=async () => {
    const data=await fetch("https://recipe-backend-rvag.onrender.com/api/findAll",{
      headers:
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    const result=await data.json();
    setFormData(result)
  }
  findAll();
},[]);
  return (
    <div>
      
        <Button id="button" variant="none"><Link to="/add">Post a Recipe</Link></Button>
        
        <div id="content">
        {
        formData.map(item => (  
        <div id="recipe">
        <img src={foof}/>
        <p><b>{item.name}</b>- By {item.author}</p>
       
        <Button id="button1" onClick={nav} variant="flat"><Link to={`/recipes/${item._id}`}>View Recipe</Link></Button>
        </div>
        
         ))}
        </div>
    </div>
  )
}
