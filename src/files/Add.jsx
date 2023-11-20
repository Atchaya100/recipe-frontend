import {React, useState,useEffect} from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate,useParams } from 'react-router-dom';
import '../styles/Add.css';
export const Add = () => {
  const {i}=useParams();
   const navigate=useNavigate();
    const [formData, setFormData] = useState({
        author:"",
        name:"",
        category:"",
        time:"",
        ingredients:"",
        instructions:"",
        benefits:""
      })
      const handleChange=(e)=>{
       const {name,value}=e.target;
       setFormData(
        {...formData,[name]:value}
       ) 
     }
     if(i!=undefined){
     useEffect(() => {
    const find=async () => {
      
      const data=await fetch(`https://recipe-backend-rvag.onrender.com/api/find/${i}`,{
        
        headers:
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
    
      const result=await data.json();
      console.log(result)
      setFormData(result)
   
    }
    find();
  
  },[]);
}
     
      const handleSubmit=async(e)=>{
        e.preventDefault();
        if(i==undefined){
        const data=await fetch('https://recipe-backend-rvag.onrender.com/apiapi/createRecipe', {
      method: 'post',
      headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`},
      body:JSON.stringify({
        "author":localStorage.getItem("username"),
        "name":formData.name,
       "category":formData.category,
        "time":formData.time,
        "ingredients":formData.ingredients,
        "instructions":formData.instructions,
        "benefits":formData.benefits
      
      })
     })
    
     const result=await data.json();
     console.log(result)
     if(result){
      navigate('/recipe')
     }
    }else{
      const data=await fetch(`https://recipe-backend-rvag.onrender.com/api/updateRecipe/${i}`, {
        method: 'put',
        headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}`},
        body:JSON.stringify({
          "author":localStorage.getItem("username"),
          "name":formData.name,
         "category":formData.category,
          "time":formData.time,
          "ingredients":formData.ingredients,
          "instructions":formData.instructions,
          "benefits":formData.benefits
        
        })
       })
      
       const result=await data.json();
       console.log(result)
       if(result){
        navigate('/recipe')
       }

    }
        
      }

  return (
    <div>
        <Form id="post" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control type="text" name="name" onChange={handleChange} value={formData.name} required/>
           </Form.Group>
           <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select type="text" name="category" onChange={handleChange} value={formData.category} required aria-label="Default select example">
            <option>Select a Category</option>
            <option value="Breakfast recipes">Breakfast recipes</option>
            <option value="Lunch recipes">Lunch recipes</option>
            <option value="Dinner recipes">Dinner recipes</option>
            <option value="Appetizer recipes">Appetizer recipes</option>
            <option value="Salad recipes">Salad recipes</option>
            <option value="Main-course recipes">Main-course recipes</option>
            <option value="Baked-goods recipes">Baked-goods recipes</option>
            <option value="Dessert recipes">Dessert recipes</option>
            <option value="Snack recipes">Snack recipes</option>
            <option value="Soup recipes">Soup recipes</option>
            <option value="Diet recipes">Diet recipes</option>
            <option value="Vegetarian Dishes">Vegetarian Dishes</option>
            </Form.Select>
           </Form.Group>
           <Form.Group className="mb-3">
            <Form.Label>Preparation time</Form.Label>
            <Form.Control type="text" name="time" onChange={handleChange} value={formData.time} required/>
           </Form.Group>
           <Form.Group className="mb-3">
            <Form.Label>Ingredients</Form.Label>
            <Form.Control name="ingredients" as="textarea" aria-label="With textarea" onChange={handleChange}  value={formData.ingredients} required />
           </Form.Group>
           <Form.Group className="mb-3">
            <Form.Label>Instructions</Form.Label>
            <Form.Control  name="instructions" as="textarea" rows="10" aria-label="With textarea" onChange={handleChange}  value={formData.instructions} required />
           </Form.Group>
           <Form.Group className="mb-3">
            <Form.Label>Benefits</Form.Label>
            <Form.Control  name="benefits" as="textarea" aria-label="With textarea"onChange={handleChange}  value={formData.benefits} required />
           </Form.Group>

           <p><Button type="submit" variant="success">Post</Button>&nbsp;&nbsp;
          </p>

        </Form>
         
    </div>
  )
}  
