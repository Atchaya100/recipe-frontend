import{ React,useState,useEffect} from 'react'
import foof from '../assets/foof.webp';
import '../styles/Recipe.css';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Recipe = () => {
  const {id}=useParams();
  const [data, setData] = useState([])
  const nav=useNavigate()
  useEffect(() => {
  
  const find=async () => {
  
    const data=await fetch(`https://recipe-backend-rvag.onrender.com/api/find/${id}`,{
      headers:
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
  
    const result=await data.json();
    setData(result)
  
 
  }
  find();

},[]);
    const [formData, setFormData] = useState({
       comment:""
      })
      const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
     }
      const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
      }
  return (
    <>
    <div id="top">
   
        <img src={foof}/>
        <span id="side">
            <h4>{data.name}</h4>
            <p>Posted by: {data.author}</p>
            <p>Ingredients: {data.ingredients}</p>
            <p>Time Required: {data.time}</p>
            <p>Category: {data.category}</p>
            <p>Benefits: {data.benefits}</p>
            <span>Instructions: {data.instructions}</span>
        </span>
    
    </div>
    </>
  )
}
