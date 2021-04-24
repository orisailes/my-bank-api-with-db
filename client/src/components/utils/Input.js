import React from 'react'
import '../css/input.css'
 const Input = ({type,onChange,placeholder,value}) => {
    return(
        <input className="input" type={type} placeholder={placeholder} onChange={onChange} value={value}></input>
    )
}
export default Input