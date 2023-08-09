import "./Dashboard.css";
import { Line, Scatter } from "react-chartjs-2";
import { useEffect, useState } from "react";
import BarChart from "./Charts/BarChart";
import store from "../stores/store";
import { useRef } from "react";
import { getElementAtEvent } from "react-chartjs-2";
import { Navigate, useParams } from "react-router-dom";
import GraphComponent from "./GraphComponent";
import LineChart from "./Charts/LineChart";

const Dashboard = () => {
  const Store = store();
  const { accNo } = useParams();
  const data = Store.data[accNo];
  const graphTranData = Store.transactions;
  const [open, setOpen] = useState(false);

  const [iframeWindow, setIframeWindow] = useState(null);

  const openIframeWindow = () => {
    const newWindow = window.open("", "_blank");
    newWindow.document.write(
      '<iframe title="Dash App" src="http://localhost:8050/" width="100%" height="100%" frameBorder="0"></iframe>'
    );
    setIframeWindow(newWindow);
  };

  const [currentID, setCurrentID] = useState(null);
  const chartRefBarDeposit = useRef();
  const chartRefBarWithDrawal = useRef();
  const chartRefLineBalance = useRef();

  useEffect(() => {
    Store.getDeposits(accNo);
    Store.getWithdrawals(accNo);
    Store.getBalance(accNo);
    Store.getTransactions(accNo);
    // Store.getMLGraph(accNo)
    // Store.getAllTransactions()
  }, [accNo]);

  console.log("Data : ", Store.data);
  console.log(graphTranData);

  if (
    graphTranData === undefined ||
    data === undefined ||
    data.deposits === null ||
    data.withdrawals == null ||
    data.balance == null
  ) {
    // console.log()
    // Store.getDeposits(accNo);
    // Store.getWithdrawals(accNo)
    // Store.getBalance(accNo)
    return <div>Loading ....</div>;
  }

  // console.log(Store.getDeposits("11"))

  const deposits = data.deposits;
  let totalDeposit = 0;
  let withdrawals = data.withdrawals;
  let totalWithdrawal = 0;
  for (let id in deposits) {
    totalDeposit += deposits[id];
  }
  for (let id in withdrawals) {
    totalWithdrawal += withdrawals[id];
  }
  const balance = data.balance;
  let totalBalance = totalDeposit - totalWithdrawal;
  console.log(totalDeposit, totalWithdrawal, totalBalance);

  // const ml_data = data.ml_data["result"]

  // const fraudDepositID = '6'
  // const fraudWithdrawalID = '18'

  const colorArr = (fraudID) => {
    console.log(fraudID);
    let result = [];
    fraudID.forEach((id) => {
      if (id === 1) {
        result.push("rgba(255, 0, 0, 0.6)");
      } else {
        result.push("rgba(255, 255, 255, 0.6)");
      }
    });
    console.log(result);
    return result;
  };

  // console.log(Object.keys(deposits))
  console.log(
    Object.keys(deposits).map((key) => {
      return key.toString();
    })
  );

  const chartDeposit = {
    labels: Object.keys(deposits).map((key) => {
      return key.toString();
    }),
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Deposits",
        data: Object.values(deposits),
        // you can set indiviual colors for each bar
        // backgroundColor: colorArr(Object.keys(deposits), fraudDepositID),
        // [
        //     'rgba(255, 255, 255, 0.6)',
        //     'rgba(255, 255, 255, 0.6)',
        //     'rgba(255, 255, 255, 0.6)'
        // ],
        borderWidth: 1,
      },
    ],
  };

  const chartWithdrawal = {
    labels: Object.keys(withdrawals).map((key) => {
      return key.toString();
    }),
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Withdrawals",
        data: Object.values(withdrawals),
        // you can set indiviual colors for each bar
        // backgroundColor: colorArr(Object.keys(withdrawals), fraudWithdrawalID),
        // [
        //     'rgba(255, 255, 255, 0.6)',
        //     'rgba(255, 255, 255, 0.6)',
        //     'rgba(255, 255, 255, 0.6)'
        // ],
        borderWidth: 1,
      },
    ],
  };

  const chartBalance = {
    labels: Object.keys(balance).map((key) => {
      return key.toString();
    }),
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Balance",
        data: Object.values(balance),
        // you can set indiviual colors for each bar
        // backgroundColor: [
        //     'rgba(255, 255, 255, 0.6)',
        //     'rgba(255, 255, 255, 0.6)',
        //     'rgba(255, 255, 255, 0.6)'
        // ],
        borderWidth: 1,
      },
    ],
  };

  // const chartML = {
  //     labels: Object.keys(ml_data),
  //     // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
  //     datasets: [
  //         {
  //             label: 'Balance',
  //             data: Object.values(ml_data),
  //             // you can set indiviual colors for each bar
  //             backgroundColor: colorArr(data.ml_data["svm"]),
  //             // [
  //             //     'rgba(255, 255, 255, 0.6)',
  //             //     'rgba(255, 255, 255, 0.6)',
  //             //     'rgba(255, 255, 255, 0.6)'
  //             // ],
  //             borderWidth: 1,
  //         }
  //     ]
  // }

  const onClickBar = (event, chartData, chartRefBar) => {
    if (getElementAtEvent(chartRefBar.current, event).length !== 0) {
      const index = getElementAtEvent(chartRefBar.current, event)[0].index;
      console.log("Called");
      console.log(chartData.labels[index]);
      setCurrentID(chartData.labels[index]);
      setOpen(true);
      console.log(currentID);
    }
  };

  return (
    <div className="backGround">
      <h2 style={{ color: "white" }}>Dashboard</h2>
      <div id="dashboard">
        <div className="graph">
          <h2>Graph 1</h2>
          <BarChart
            chartRef={chartRefBarDeposit}
            onClick={(event) =>
              onClickBar(event, chartDeposit, chartRefBarDeposit)
            }
            data={chartDeposit}
            title="Deposits"
          />
          <p>Total: {totalDeposit}</p>
        </div>
        <div className="graph">
          <h2>Graph 2</h2>
          <BarChart
            chartRef={chartRefBarWithDrawal}
            onClick={(event) =>
              onClickBar(event, chartWithdrawal, chartRefBarWithDrawal)
            }
            data={chartWithdrawal}
            title="Withdrawals"
          />
          <p>Total: {totalWithdrawal}</p>
        </div>
        <div className="graph">
          <h2>Graph 3</h2>
          <LineChart
            data={chartBalance}
            chartRef={chartRefLineBalance}
            onClick={(event) =>
              onClickBar(event, chartBalance, chartRefLineBalance)
            }
            title={"Balance"}
          />
          <p>Total: {totalBalance}</p>
        </div>
        <div className="graph">
          <h2>Fund Flow Network</h2>
          <GraphComponent acc={accNo} />
        </div>
        {/* <div className="graph">
                    <h2>Graph 4</h2>
                    <Scatter data={chartML}
                        // chartRef={chartRefLineBalance}
                        // onClick={(event) => onClickBar(event, chartBalance, chartRefLineBalance)}
                        // title={"Balance"}
                        />
                    <p>Total: {totalBalance}</p>
                </div> */}
        {/* <div className="conclusion graph">
                    <h2>Frauds Detected</h2>
                    <p onClick={() => {
                        setOpen(true)
                        setCurrentID(fraudDepositID)
                    }}>1) Transaction ID: {fraudDepositID}</p>
                    <p onClick={() => {
                        setOpen(true)
                        setCurrentID(fraudWithdrawalID)
                    }}>2) Transaction ID: {fraudWithdrawalID}</p>
                </div> */}
        {graphTranData.map((tran) => {
          if (String(tran.tranID) === currentID) {
            return (
              open && (
                <div className="Modal">
                  <div className="modalContent">
                    <p>Transaction ID: {tran.tranID}</p>
                    <p>Account Number: {tran.accNo}</p>
                    {tran.secAccountNo === 0 ? (
                      <p />
                    ) : (
                      <p>Second Account Number: {tran.secAccountNo}</p>
                    )}
                    <p>Ammount: {tran.amount}</p>
                    <p>Account Balance: {tran.balance}</p>
                    <button onClick={() => setOpen(false)}>Close</button>
                  </div>
                </div>
              )
            );
          }
          return;
        })}
      </div>

      <button onClick={openIframeWindow}>Advanced Analytics</button>
      {iframeWindow && iframeWindow.closed && setIframeWindow(null)}
    </div>
  );
};

export default Dashboard;
