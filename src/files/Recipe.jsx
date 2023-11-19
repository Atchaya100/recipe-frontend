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
    var a;
  const find=async () => {
    
    const data=await fetch(`https://recipe-backend-rvag.onrender.com/api/find/${id}`,{
      
      headers:
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
  
    const result=await data.json();
    
    if(result.author==localStorage.getItem("username")){
      document.getElementById("same").style.display="block";
    }
    a=result._id
    setData(result)
 
  }
  find();

},[]);
  async function del(){
    var a=confirm(`Are you sure to delete the recipe?${data._id}`)
    if(a){
    try{
      const dat=await fetch(`https://recipe-backend-rvag.onrender.com/api/delete/${data._id}`,{
        method: 'delete',
        headers:
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      nav('/recipe')
    }catch(e){
      console.log("error",e)
    }}

   }
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
    <p id="same">
     <Button variant="none" onClick={del} className="edit">Delete</Button>
     </p>
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
