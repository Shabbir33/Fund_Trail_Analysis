import "./Dashboard.css"
import {data, fraudTranData} from "../utils/Data"
import { Bar, Line } from "react-chartjs-2";
import { useState } from "react";

const Dashboard = () => {

    const [open, setOpen] = useState(false)
    const [currentID, setCurrentID] = useState(null)

    const deposits = data.deposit
    let totalDeposit = 0
    let withdrawals = data.withdrawal
    let totalWithdrawal = 0
    for (let id in deposits) {
        totalDeposit += deposits[id]
    }
    for (let id in withdrawals) {
        totalWithdrawal += withdrawals[id]
    }
    const balance = data.balance
    let totalBalance = totalDeposit - totalWithdrawal
    console.log(totalDeposit, totalWithdrawal, totalBalance)


    const fraudDepositID = '6' 
    const fraudWithdrawalID = '18'

    const colorArr = (arr, fraudID) => {
        let result = []
        for(let id in arr){
            if(arr[id] === fraudID){
                result.push("rgba(255, 0, 0, 0.6)")
            }
            else{
                result.push("rgba(255, 255, 255, 0.6)")
            }
        }
        return result
    }

    console.log(Object.keys(deposits))




    const chartDeposit = {
        labels: Object.keys(deposits),
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
                label: 'Deposits',
                data: Object.values(deposits),
                // you can set indiviual colors for each bar
                backgroundColor: colorArr(Object.keys(deposits), fraudDepositID),
                // [
                //     'rgba(255, 255, 255, 0.6)',
                //     'rgba(255, 255, 255, 0.6)',
                //     'rgba(255, 255, 255, 0.6)'
                // ],
                borderWidth: 1,
            }
        ]
    }

    const chartWithdrawal = {
        labels: Object.keys(withdrawals),
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
                label: 'Withdrawals',
                data: Object.values(withdrawals),
                // you can set indiviual colors for each bar
                backgroundColor: colorArr(Object.keys(withdrawals), fraudWithdrawalID),
                // [
                //     'rgba(255, 255, 255, 0.6)',
                //     'rgba(255, 255, 255, 0.6)',
                //     'rgba(255, 255, 255, 0.6)'
                // ],
                borderWidth: 1,
            }
        ]
    }

    const chartBalance = {
        labels: Object.keys(balance),
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
                label: 'Balance',
                data: Object.values(balance),
                // you can set indiviual colors for each bar
                // backgroundColor: [
                //     'rgba(255, 255, 255, 0.6)',
                //     'rgba(255, 255, 255, 0.6)',
                //     'rgba(255, 255, 255, 0.6)'
                // ],
                borderWidth: 1,
            }
        ]
    }


    return (
        <div>
            <p>Dashboard</p>
            <div id="dashboard">
                <div className="graph">
                    <h2>Graph 1</h2>
                    <Bar
                        data={chartDeposit}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Deposits"
                                },
                                legend: {
                                    display: false
                                }
                            }
                        }}
                    />
                    <p>Total: {totalDeposit}</p>
                </div>
                <div className="graph">
                    <h2>Graph 2</h2>
                    <Bar
                        data={chartWithdrawal}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Deposits"
                                },
                                legend: {
                                    display: false
                                }
                            }
                        }}
                    />
                    <p>Total: {totalWithdrawal}</p>
                </div>
                <div className="graph">
                    <h2>Graph 3</h2>
                    <Line
                        data={chartBalance}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Deposits"
                                },
                                legend: {
                                    display: false
                                }
                            }
                        }}
                    />
                    <p>Total: {totalBalance}</p>
                </div>
                <div className="conclusion graph">
                    <h2>Frauds Detected</h2>
                    <p onClick={() => {
                        setOpen(true)
                        setCurrentID(fraudDepositID)
                    }}>1) Transaction ID: {fraudDepositID}</p>
                    <p onClick={() => {
                        setOpen(true)
                        setCurrentID(fraudWithdrawalID)
                    }}>2) Transaction ID: {fraudWithdrawalID}</p>
                </div>
                {fraudTranData.map((tran) => {
                    if(tran.id === currentID){
                    return (open && (<div className="Modal">
                    <div className="modalContent">
                        <p>Transaction ID: {tran.id}</p>
                        <p>Account Number: {tran.accNo}</p>
                        <p>Receiver Account Number: {tran.recAccNo}</p>
                        <p>Sender Account Number: {tran.senAccNo}</p>
                        <p>Deposit Ammount: {tran.deposit}</p>
                        <p>Withdrawal Ammount: {tran.withdrawal}</p>
                        <p>Account Balance: {tran.balance}</p>
                        <button onClick={() => setOpen(false)}>Close</button>
                    </div>
                </div>))}})}
            </div>
        </div>
    )
}

export default Dashboard