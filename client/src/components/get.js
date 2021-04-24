import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Button from './utils/Button'
import './css/display-area.css'
import './css/bg.css'
import './css/get.css'
import './css/client-card.css'
import ClipLoader from "react-spinners/ClipLoader";

const Get = () => {
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(false)
    const [userDidClick,setUserDidClick] = useState(false)

    const fetchUsers = async () => {
        setLoading(true)
        
        const data = await axios.get('/api/clients')
        let clientAndAccounts = data.data
        for (let client of clientAndAccounts) {
            const account = await axios.get(`/api/accounts/${client._id}`)
            client.cash = account.data.cash;
            client.credit = account.data.credit;
        }
        if (data.data.length === 0) setClients([])
        if (data.data.length > 0) setClients(data.data)
        setUserDidClick(true)
        setLoading(false)
    }
    return (
        <>
            <div className="read-wrapper">
                <div className="buttons-container">
                    <Button text={"Display Users"} onClick={fetchUsers} />
                    <Link to="/"><Button text="Home" /></Link>
                </div>
                <div className="display-area">
                    <ClipLoader loading={loading} size={150} />
                    {clients.length ? clients.map((cli) => {
                        return (
                            <div key={cli.email} className="client-card">
                                <h4>Name: {cli.name}</h4>
                                <p>Email: {cli.email}</p>
                                <p>Passport: {cli.passport}</p>
                                <p>ID: {cli._id}</p>
                                <p>Cash: {cli.cash}</p>
                                <p>Credit: {cli.credit}</p>
                            </div>
                        )
                    })
                    :
                    userDidClick && <h1>No users found</h1>
                    }

                </div>

                <div className="bg">
                    <div className="bg-img"></div>
                </div>
            </div>
        </>
    )
}

export default Get