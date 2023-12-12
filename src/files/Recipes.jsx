import React,{useState} from 'react';
import { Button } from 'react-bootstrap';
import '../styles/Recipes.css';
import { Link, useParams} from "react-router-dom";
import front from '../assets/front.jpg';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const Recipes = () => {
  const [formData, setFormData] = useState([])
  const nav=useNavigate()
  useEffect(() => {
    if(localStorage.getItem("token")==null){
      document.getElementById("button").style.display="none"
     }

  const findAll=async () => {
    const data=await fetch("https://recipe-backend-rvag.onrender.com/api/findAll")
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
        <img src={front}/>
        <p><b>{item.name}</b>- By {item.author}</p>
       
        <Button id="button1" onClick={nav} variant="flat"><Link to={`/recipes/${item._id}`}>View Recipe</Link></Button>
        </div>
        
         ))}
        </div>
    </div>
  )
}
