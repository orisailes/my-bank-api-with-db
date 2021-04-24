import React from 'react'
import '../css/card.css'
const Card = ({title,type}) => {
return(
    <div className={`card ${type}`}>
        <h1>{title}</h1>
    </div>
)
} 

export default Card