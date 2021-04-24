import React, { useState } from 'react'
import Button from './utils/Button'
import Input from './utils/Input'
import { Link } from 'react-router-dom'
import './css/bg.css'
import './css/post.css'
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";

const Post = () => {

    const [nameInput, setNameInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [passportInput, setPassportInput] = useState('')
    const [message, setMessage] = useState('')
    const [client, setNewClient] = useState([])
    const [loading,setLoading] = useState(false)


    const createUser = async () => {
        if (nameInput && emailInput && passportInput) {
            setLoading(true)
            const newUser = {
                "name": nameInput,
                "email": emailInput,
                "passport": passportInput
            }
            const newClient = await axios.post('/api/clients', newUser)
            console.log(newClient);
            if(newClient.status===206) {
                setMessage(`Fail to make new client... error message:\n${newClient.data}`.split('\n'))
                Object.keys(client).length > 0 && setNewClient([])
            }else{
                setMessage('')
                setNewClient(newClient.data)
            }
            setLoading(false)
        }
    }
    return (
        <>
            <div className="post-wrapper">
                <form>
                    <div className="form-field">
                        <label>Name:</label>
                        <Input onChange={(e) => setNameInput(e.target.value)} placeholder={"Insert Name Here"} value={nameInput} />
                    </div>
                    <div className="form-field">
                        <label>Email:</label>
                        <Input onChange={(e) => setEmailInput(e.target.value)} placeholder={"Insert Email Here"} value={emailInput} />
                    </div>
                    <div className="form-field">
                        <label>Passport:</label>
                        <Input onChange={(e) => setPassportInput(e.target.value)} placeholder={"Insert Passport Here"} value={passportInput} />
                    </div>
                </form>
                {
                    message.length>0 && message.map(str=><h3 key={str[0]}>{str}</h3>)
                }
                <ClipLoader loading={loading} size={50} />
                <div className={Object.keys(client).length > 0 ? "new-client-card" : ""}>
                    {Object.keys(client).length > 0 &&
                        <>
                            <h4>Name: {client.name}</h4>
                            <p>Email: {client.email}</p>
                            <p>Passport: {client.passport}</p>
                            <p>ID: {client._id}</p>
                            <p>Cash: 0</p>
                            <p>Credit: 0</p>
                        </>
                    }
                </div>
                <div className="buttons-container">
                    <Link to="/"><Button text={"Home"} /></Link>
                    <Button text={"Create User"} onClick={createUser} />
                </div>
            </div>
            <div className="bg">
                <div className="bg-img"></div>
            </div>
        </>
    )
}

export default Post