import React,{useState,useEffect} from 'react'
import front from '../assets/front.jpg';
import '../styles/Profile.css';
import { Button } from 'react-bootstrap';
import { Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
export const Profile = () => {
const navigate=useNavigate();

    const [formData, setFormData] = useState([])
    useEffect(() => {
        if(localStorage.getItem("token")==null){
            navigate("/login")
           }
    const findAll=async () => {
      const data=await fetch(`https://recipe-backend-rvag.onrender.com/api/findAuthor/${localStorage.getItem("username")}`,{
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
  function logOut(){
         localStorage.clear()
         navigate("/login")
  }
  return (
    <div>
        <div id="details">
        <Button variant="none" onClick={logOut}>Log Out</Button>
            <p>Name:  {localStorage.getItem("name")}</p>
            <p>UserName:  {localStorage.getItem("username")}</p>
            <p>Email:  {localStorage.getItem("email")}</p>
         <h5>My Recipes</h5>
        
        </div>
         <div id="content">
        {
        formData.map(item => (  
        <div id="recipe">
        <img src={front}/>
        <p><b>{item.name}</b>-{item.author}</p>
       
        <Button id="button1" variant="flat"><Link to={`/recipes/${item._id}`}>View Recipe</Link></Button>
        </div>
        
         ))}
        </div>
    </div>
  )
}
