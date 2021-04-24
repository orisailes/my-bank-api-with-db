import React from 'react'
import { Link } from "react-router-dom";
import Card from './utils/Card'
import './css/landing.css'
import './css/bg.css'
const Landing = () => {
return(
    <>
    <div className="cards-container">
    <Link to="/create"><Card title="Create clients" type="create"/></Link>
    <Link to="/read"><Card title="Read clients" type="read"/></Link>
    <Link to="/update"><Card title="Update clients" type="update"/></Link>
    <Link to="/delete"><Card title="Delete clients" type="delete"/></Link>
    </div>
    <div className="bg">
    <div className="bg-img"></div>
    </div>
    </>
)
} 

export default Landing