import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Button from './utils/Button'
import Input from './utils/Input'
import './css/delete.css'
import ClipLoader from "react-spinners/ClipLoader";

const Delete = () => {

const [showInput,setShowInput] = useState(false)
const [inputId, setInputId] = useState('')
const [message,setMessage] = useState('')
const [loading,setLoading] = useState(false)

const deleteAll = async () => {
    setLoading(true)
    await axios.delete('/api/clients')
    setLoading(false)
    setMessage('All users Deleted.')
}
const deleteById = () => {
    setShowInput((prev)=>!prev)
}
const handleSubmit = async() => {
    if(inputId.length){
        setLoading(true)
        await axios.delete(`/api/clients/${inputId}`)
        setLoading(false)
        setMessage('User Has Deleted.')
    }
}

return(
<>
    <div className="buttons-container">
        <Button text="Delete All" onClick={deleteAll}/>
        <Button text="Delete By ID" onClick={deleteById}/>
        <Link to="/"><Button text="Home"/></Link>
        {showInput && 
        <>
        <Input value={inputId} onChange={(e)=>setInputId(e.target.value)} placeholder="Insert id here"/> 
        <Button text="Submit" onClick={handleSubmit}/>
        </>}
    </div>
    <div className="message-container">
    <ClipLoader loading={loading} size={100} />
    {message.length>0 && <h2>{message}</h2>}
    </div>
    <div className="bg">
        <div className="bg-img"></div>
    </div>
    </>
)
} 

export default Delete