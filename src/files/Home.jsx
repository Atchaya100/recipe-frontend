import React from 'react';
import '../styles/Home.css';
import { Link} from "react-router-dom";
import front from '../assets/front.jpg';
import { Button } from 'react-bootstrap';
import { useEffect } from 'react';
export default function Home() {
  useEffect(() => {
  if(localStorage.getItem("token")!=null){
    document.getElementById("h").style.display="none";
  }else{
    document.getElementById("h").style.display="inline";
  }
},[]);
  return (
    <div id="center">
      <img src={front}/><br></br>
      <h4>Create, Find New Recipes Everyday</h4><br></br>
      <Button id="h" variant="none"><Link to='/login'>Login</Link></Button>
    </div>
  )
}