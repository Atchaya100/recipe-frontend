import{ React,useState,useEffect} from 'react'
import front from '../assets/front.jpg';
import { Link} from "react-router-dom";
import '../styles/Recipe.css';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Recipe = () => {
  const {id}=useParams();
  const [data, setData] = useState([])
  const [comments, setComments] = useState([])
  const nav=useNavigate()
  useEffect(() => {
    var a;
   
  const find=async () => {
    
    const data=await fetch(`https://recipe-backend-rvag.onrender.com/api/find/${id}`)
    const result=await data.json();
    const Allcomments=await fetch(`https://recipe-backend-rvag.onrender.com/api/findComments/${id}`)
    const res=await Allcomments.json();
    setComments(res)
    
    if(result.author==localStorage.getItem("username")){
      document.getElementById("same").style.display="block";
    }
    if(localStorage.getItem("username")===null){
      document.getElementById("h").style.display="none";
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
       comment:"",
       rid:id,
       name:localStorage.getItem("username")
      })
      const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
     }
      const handleSubmit=async (e)=>{
        e.preventDefault();
          const data=await fetch('https://recipe-backend-rvag.onrender.com/api/comment', {
          method: 'post',
          headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`},
          body:JSON.stringify(formData)
         })
         console.log(data)
         
      }
      
  return (
    <>
    <p id="same">
    <Button variant="none" className="edit"><Link to={`/add/${data._id}`}>Edit</Link></Button>
     <Button variant="none" onClick={del} className="edit">Delete</Button>
     </p>
    <div id="top">
        <img src={front}/>
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
    <div id="comments">
    <p>Comments</p>
    {comments.map(item=>
     <p key={item.id}> {item.name}  :   {item.comment} </p>
)}
     <Form id="h" onSubmit={handleSubmit}>
           <Form.Group className="mb-3">
            <Form.Label>Enter your Comments:</Form.Label>
            <Form.Control type="text" name="comment" onChange={handleChange} value={formData.comment} required />
           </Form.Group>
          
           <Button type="submit" variant="success">Post</Button>
        </Form>
    </div>
    </>
  )
}
