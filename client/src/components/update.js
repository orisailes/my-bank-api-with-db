import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './utils/Button'
import Input from './utils/Input'
import './css/update.css'
import './css/display-area.css'
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";

const Update = () => {
    const [idInput, setIdInput] = useState('')
    const [idToDeliverMoneyInput, setIdToDeliverMoney] = useState('')
    const [amount, setAmount] = useState('')
    const [buildSubmit, setBuildSubmit] = useState('')
    const [currentPath, setCurrentPath] = useState('')
    const [errMessage, setErrMessage] = useState('')
    const [userDidPress, setUserDidPress] = useState(false)
    const [isTransferMoney, setIsTransferMoney] = useState(false)
    const [loading, setLoading] = useState(false)
    const [clientToDisplay, setClientToDisplay] = useState([])

    const paths = {
        transfer: '/api/accounts/transfer',
        withdraw: '/api/accounts/withdraw',
        despositCash: '/api/accounts/desposit/cash',
        changeCredit: '/api/accounts/desposit/credit'
    }


    const handleTransfer = async (e) => {
        (!userDidPress && setUserDidPress(true))
        setIsTransferMoney(true)
        buildSubmitBtn(e.target.innerText, e.target.id)
    }

    const handleWithdraw = async (e) => {
        (!userDidPress && setUserDidPress(true))
        setIsTransferMoney(false)
        buildSubmitBtn(e.target.innerText, e.target.id)
    }

    const handleAddCash = async (e) => {
        (!userDidPress && setUserDidPress(true))
        setIsTransferMoney(false)
        buildSubmitBtn(e.target.innerText, e.target.id)
    }

    const handleChangeCredit = async (e) => {
        (!userDidPress && setUserDidPress(true))
        setIsTransferMoney(false)
        buildSubmitBtn(e.target.innerText, e.target.id)
    }

    const buildSubmitBtn = (action, id) => {
        setBuildSubmit(action)
        setCurrentPath(id) // save path in state
    }

    const handleSubmit = async () => {
        if (amount.length > 0 && idInput.length > 0) {
            setLoading(true)
            let url;
            let result;
            switch (currentPath) {
                case 'transfer':
                    if (idToDeliverMoneyInput.length > 0) {
                        url = `${paths[currentPath]}?from=${idInput}&to=${idToDeliverMoneyInput}&amount=${amount}`
                        result = await axios.put(url)
                        if (result.status === 200) {
                            fetchUser(idInput, idToDeliverMoneyInput)
                        }
                        if (result.status !== 200) {
                            setErrMessage(result.data)
                            setClientToDisplay([])
                            setLoading(false)
                        }
                        console.log(result);
                    }
                    break;
                case 'withdraw':
                    url = `${paths[currentPath]}/${idInput}?amount=${amount}`
                    result = await axios.put(url)
                    if (result.status === 200) {
                        fetchUser(idInput)
                        setLoading(false)
                    }
                    if (result.status !== 200) {
                        setErrMessage(result.data)
                        setClientToDisplay([])
                    }
                    break;
                case 'despositCash':
                    url = `${paths[currentPath]}/${idInput}?amount=${amount}`
                    result = await axios.put(url)
                    debugger
                    if (result.status === 200) {
                        fetchUser(idInput)
                        setLoading(false)
                    }
                    if (result.status !== 200) {
                        console.log('in');
                        setErrMessage(result.data)
                        setClientToDisplay([])
                    }
                    break;
                case 'changeCredit':
                    url = `${paths[currentPath]}/${idInput}?amount=${amount}`
                    result = await axios.put(url)
                    if (result.status === 200) {
                        fetchUser(idInput)
                        setLoading(false)
                    }
                    if (result.status !== 200) {
                        setErrMessage(result.data)
                        setClientToDisplay([])
                    }
                    break;

                default:
                    break;
            }
        }
    }

    const fetchUser = async (id1, id2) => {
        if (id2) {
            const user1 = await axios.get(`api/clients/${id1}`)
            const account1 = await axios.get(`/api/accounts/${user1.data._id}`)
            const user2 = await axios.get(`api/clients/${id2}`)
            const account2 = await axios.get(`/api/accounts/${user2.data._id}`)
            setClientToDisplay([{ ...user1.data, credit: account1.data.credit, cash: account1.data.cash }, { ...user2.data, credit: account2.data.credit, cash: account2.data.cash }])
        } else {
            const user = await axios.get(`api/clients/${id1}`)
            const account = await axios.get(`/api/accounts/${user.data._id}`)
            setClientToDisplay([{ ...user.data, credit: account.data.credit, cash: account.data.cash }])
        }
        errMessage.length && setErrMessage('')
        setLoading(false)
    }

    return (
        <>
            <div className="update-wrapper">
                <div className="buttons-container">
                    <Button id="transfer" onClick={(e) => handleTransfer(e)} text="Transfer Money" />
                    <Button id="withdraw" onClick={(e) => handleWithdraw(e)} text="Withdraw Money" />
                    <Button id="despositCash" onClick={(e) => handleAddCash(e)} text="Add Cash" />
                    <Button id="changeCredit" onClick={(e) => handleChangeCredit(e)} text="Change Credit" />
                </div>
                <div className="inputs-container">

                    {userDidPress ?
                        isTransferMoney ?
                            <>
                                <label>From: </label>
                                <Input value={idInput} placeholder="Insert from id here" onChange={(e) => setIdInput(e.target.value)} />
                                <label>To: </label>
                                <Input value={idToDeliverMoneyInput} placeholder="Insert to id id here" onChange={(e) => setIdToDeliverMoney(e.target.value)} />
                                <label>Amount: </label>
                                <Input value={amount} placeholder="Insert amount" onChange={(e) => setAmount(e.target.value)} />
                            </>
                            :
                            <>
                                <label>ID: </label>
                                <Input value={idInput} placeholder="Insert id here" onChange={(e) => setIdInput(e.target.value)} />
                                <label>Amount: </label>
                                <Input value={amount} placeholder="Insert amount" onChange={(e) => setAmount(e.target.value)} />
                            </>
                        : null
                    }
                </div>
                {buildSubmit.length > 0 ?
                    <div className="buttons-container">
                        <Button onClick={handleSubmit} text={buildSubmit} />
                        <Link to="/"><Button text="Home" /></Link>
                    </div>
                    : null}
                <ClipLoader loading={loading} size={100} />
                <div className="display-area">
                    {Object.keys(clientToDisplay).length > 0 ?
                        clientToDisplay.map((cli) => {
                            return (
                                <div key={cli.email} className="client-card">
                                    <h4>Name: {cli.name}</h4>
                                    <p>Email: {cli.email}</p>
                                    <p>Passport: {cli.passport}</p>
                                    <p>ID: {cli.passport}</p>
                                    <p>Cash: {cli.cash}</p>
                                    <p>Credit: {cli.credit}</p>
                                </div>
                            )
                        })
                        :
                        <h2>{errMessage}</h2>
                    }
                </div>
                <div className="bg">
                    <div className="bg-img"></div>
                </div>
            </div>
        </>
    )
}

export default Update