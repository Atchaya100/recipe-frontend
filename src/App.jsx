
import './App.css';
import Login from './files/Login.jsx'
import Register from './files/Register.jsx'
import { Route,Link,HashRouter as BrowserRouter, Routes } from "react-router-dom";
import { Recipes } from './files/Recipes.jsx';
import { Recipe } from './files/Recipe.jsx';
import { Add } from './files/Add.jsx';
import { Profile } from './files/Profile.jsx';
import Home from './files/Home.jsx';
function App() {
  return (
    <>
    <BrowserRouter>
    <div id="nav">
        <p>Recipe Book</p>
        
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/recipe'>Recipes</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
     
    </div>
    
     <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route path="/recipe" element={<Recipes/>} />
      <Route path="/recipes/:id" element={<Recipe/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/add" element={<Add/>} />
     </Routes>
    </BrowserRouter>
  
  
    </>
  )
}

export default App
