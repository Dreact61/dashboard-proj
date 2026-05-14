import React, { useEffect } from "react";
import classes from "../styles/style.module.css";
import {useDashboardStore,  Transaction } from "./dashboardStore";
import { useState, useRef } from "react";
import { Link } from "react-router";

export const Balance: React.FC = () => {
    const [isDepositOn, setIsDepositOn] = useState(false)
    const [isWithdrawOn, setIsWithdrawOn] = useState(false)
    const [isHistoryOn, setIsHistoryOn] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)

    const [depositAmount, setDepositAmount] = useState<number>(1)
    const [withdrawAmount, setWithdrawAmount] = useState<number>(1)

    const { values, balanceDeposit, balanceWithdraw, trackTransactionsHistory } = useDashboardStore()
    const { balance, day, time, transactions } = values

//-------------------------------------------------------------------------------

    const handleDeposit = () => {
        balanceDeposit(depositAmount)
        trackTransactionsHistory(prev => [
        ...prev,   
        {
            type: 'deposit',
            amount: depositAmount,
            date: day,
            opTime: time,
            operationId: Date.now()
        } as Transaction])
        setIsDepositOn(false)
        setIsCompleted(true)
    }
    
    const handleWithdraw = () => {
        balanceWithdraw(withdrawAmount)
        trackTransactionsHistory(prev => [
            ...prev,   
            {
                type: 'withdraw',
                amount: withdrawAmount,
                date: day,
                opTime: time,
                operationId: Date.now()
            } as Transaction])
        setIsWithdrawOn(false)
        setIsCompleted(true)
    }
//---------------------------------------------------------------------------
    const transactionsRef = useRef(trackTransactionsHistory)
    useEffect(() => {
        const interval = setInterval(() => {
            transactionsRef.current = trackTransactionsHistory
        }, 1000)
        
        return () => clearInterval(interval)
    },[trackTransactionsHistory])
    
//--------------------------------------------------------------------------- 
    
    return (
        <div>
            <h1>Your balance</h1>
            <hr />
            <main className={classes.mainRoot} style={{display:'flex'}}>
                <form name="financial-operations" className={classes.dashboardEl} style={{display:"flex", width:"100%"}}>
                    <div className={classes.balanceMenu}>
                        <h3>Your current balance:</h3>
                        <h3>${Number(balance).toFixed(2)}</h3> 
                    </div>

                    <div style={{width:"100%", borderBottom:"1px solid black"}}>
                        <h3>Available balance operations</h3>
                        <div style={{display:"flex",marginBottom:"1rem", flexDirection:"row", gap:"1rem", justifyContent:"space-evenly"}}>
                            
                            <button onClick={() => {
                                setIsDepositOn(true)
                                setIsWithdrawOn(false)
                                setIsHistoryOn(false)
                                }} 
                                className={classes.dashboardBtn}
                                disabled={isCompleted}
                                style={{cursor: isCompleted ? "not-allowed" : "pointer"}}
                                type="button"
                                >Deposit</button>
                            
                            <button onClick={() => {
                                setIsWithdrawOn(true)
                                setIsDepositOn(false)
                                setIsHistoryOn(false)
                                }} 
                                className={classes.dashboardBtn}
                                disabled={isCompleted}
                                style={{cursor:isCompleted ? "not-allowed": "pointer"}}
                                type="button"
                                >Withdraw</button>
                            
                            <button onClick={() => {
                                setIsHistoryOn(true)
                                setIsDepositOn(false)
                                setIsWithdrawOn(false)
                                }} 
                                className={classes.dashboardBtn}
                                disabled={isCompleted}
                                style={{cursor:isCompleted ? "not-allowed": "pointer"}}
                                type="button"
                                >History</button>
                        </div>
                    </div>

                    <div className={classes.operationDiv} style={{display: isDepositOn ? 'flex' : 'none'}}>
                        <h3>Enter your deposit amount here</h3>
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                            <label htmlFor="amount-inp1">amount:</label>
                            <input value={depositAmount} onChange={(e) => setDepositAmount(Number(e.target.value))} type="number" id="amount-inp1" required min="1" placeholder="1 or more required"/>  
                        </div>
                        <button onClick={handleDeposit} className={classes.dashboardBtn} type="submit">Submit</button>
                    </div>

                    <div className={classes.operationDiv} style={{display: isWithdrawOn ? 'flex' : 'none'}}>
                        <h3>Enter your withdraw amount here</h3>
                        <div style={{display:"flex", alignItems:"center", flexDirection:"row", justifyContent:"space-evenly"}}>
                            <label htmlFor="amount-inp2">amount:</label>
                            <input value={withdrawAmount} onChange={(e) => setWithdrawAmount(Number(e.target.value))} type="number" id="amount-inp2" required min="1" placeholder="1 or more required"/>  
                        </div>
                        <button style={{marginBottom:"1rem"}} onClick={handleWithdraw} className={classes.dashboardBtn} type="submit">Submit</button>
                    </div>
                    
                    <div className={classes.operationDiv} style={{display: isHistoryOn ? 'flex' : 'none'}}>
                        <h3>Transactions history</h3>
                        <ul>
                            {transactions && transactions.length > 0 ? 
                            transactions.map((tr: Transaction) => (
                                <li key={tr.operationId}>
                                    <div className={classes.operationLog}>
                                        <p style={{fontWeight:"700"}}>Operation No.{tr.operationId}</p>
                                        <p>Type: {tr.type}</p>
                                        <p>Amount: {tr.amount}</p>
                                        <p>Date and time: {tr.date} / {tr.opTime}</p>
                                        <p>Id: {tr.operationId}</p>
                                    </div>
                                </li>
                            )) : <li>No transactions provided.</li>}
                        </ul>
                        <button className={classes.dashboardBtn} style={{marginBottom:"1rem"}} onClick={() => setIsHistoryOn(false)} type="submit">Close</button>
                    </div>

                    <Link to="/" style={{fontStyle:'normal', width:"60%"}}>
                        <button className={classes.dashboardBtn} style={{width:"60%", marginTop:"1rem"}} type="button">Go back</button>
                    </Link>
                </form>
            </main>
        </div>
    )
}