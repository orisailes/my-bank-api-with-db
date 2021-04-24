import React from 'react'
import '../css/button.css'
const Button = ({ text,onClick,id }) => {


    return (
        <button id={id} onClick={onClick} className="btn">{text}</button>
    )
}

export default Button