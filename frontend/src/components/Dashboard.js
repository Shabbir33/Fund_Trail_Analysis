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
import DepositsChart from "./DashboardCharts/DepositsChart";
import WithdrawalsChart from "./DashboardCharts/WithdrawalsChart";
import BalanceChart from "./DashboardCharts/BalanceChart";

const Dashboard = () => {
  const Store = store();
  const { accNo } = useParams();
  // const data = Store.data[accNo];
  // const graphTranData = Store.transactions;
  // const [open, setOpen] = useState(false);

  const [iframeWindow, setIframeWindow] = useState(null);

  const [graphNo, setGraphNo] = useState(1);

  const openIframeWindow = () => {
    const newWindow = window.open("", "_blank");
    newWindow.document.write(
      '<iframe title="Dash App" src="http://localhost:8050/" width="100%" height="100%" frameBorder="0"></iframe>'
    );
    setIframeWindow(newWindow);
  };

  // const [currentID, setCurrentID] = useState(null);
  // const chartRefBarDeposit = useRef();
  // const chartRefBarWithDrawal = useRef();
  // const chartRefLineBalance = useRef();

  // useEffect(() => {
  //   Store.getDeposits(accNo);
  //   Store.getWithdrawals(accNo);
  //   Store.getBalance(accNo);
  //   Store.getTransactions(accNo);
  //   // Store.getMLGraph(accNo)
  //   // Store.getAllTransactions()
  // }, [accNo]);

  // console.log("Data : ", Store.data);
  // console.log(graphTranData);

  // if (
  //   graphTranData === undefined ||
  //   data === undefined ||
  //   data.deposits === null ||
  //   data.withdrawals == null ||
  //   data.balance == null
  // ) {
  //   // console.log()
  //   // Store.getDeposits(accNo);
  //   // Store.getWithdrawals(accNo)
  //   // Store.getBalance(accNo)
  //   return <div>Loading ....</div>;
  // }

  // console.log(Store.getDeposits("11"))

  // const ml_data = data.ml_data["result"]

  // const fraudDepositID = '6'
  // const fraudWithdrawalID = '18'

  // const colorArr = (fraudID) => {
  //   console.log(fraudID);
  //   let result = [];
  //   fraudID.forEach((id) => {
  //     if (id === 1) {
  //       result.push("rgba(255, 0, 0, 0.6)");
  //     } else {
  //       result.push("rgba(255, 255, 255, 0.6)");
  //     }
  //   });
  //   console.log(result);
  //   return result;
  // };

  // const onClickBar = (event, chartData, chartRefBar) => {
  //   if (getElementAtEvent(chartRefBar.current, event).length !== 0) {
  //     const index = getElementAtEvent(chartRefBar.current, event)[0].index;
  //     console.log("Called");
  //     console.log(chartData.labels[index]);
  //     setCurrentID(chartData.labels[index]);
  //     setOpen(true);
  //     console.log(currentID);
  //   }
  // };

  return (
    <div className="backGround">
      <button style={{
          background: "#F5F5F5",
          width: "50%",
          borderRadius: "7x",
          height: "50px",
          margin: "10px 300px",
          fontSize: "30px",
          fontFamily: "monospace",
        }} onClick={openIframeWindow}>Advanced Analytics</button>
      {iframeWindow && iframeWindow.closed && setIframeWindow(null)}
      <button
        style={{
          background: "#F5F5F5",
          width: "20%",
          borderRadius: "7x",
          height: "50px",
          margin: "10px 15px",
          fontSize: "30px",
          fontFamily: "monospace",
        }}
        onClick={() => {
          setGraphNo(1);
        }}
      >
        Deposits
      </button>
      <button
        style={{
          background: "#F5F5F5",
          width: "20%",
          borderRadius: "7x",
          height: "50px",
          margin: "10px 15px",
          fontSize: "30px",
          fontFamily: "monospace",
        }}
        onClick={() => {
          setGraphNo(2);
        }}
      >
        Withdrawals
      </button>
      <button
        style={{
          background: "#F5F5F5",
          width: "20%",
          borderRadius: "7x",
          height: "50px",
          margin: "10px 15px",
          fontSize: "30px",
          fontFamily: "monospace",
        }}
        onClick={() => {
          setGraphNo(3);
        }}
      >
        Balance
      </button>
      <button
        style={{
          background: "#F5F5F5",
          width: "20%",
          borderRadius: "7x",
          height: "50px",
          margin: "10px 15px",
          fontSize: "30px",
          fontFamily: "monospace",
        }}
        onClick={() => {
          setGraphNo(4);
        }}
      >
        Fund Flow
      </button>


      {graphNo === 1 && (
        <div>
          <DepositsChart accNo={accNo} />
        </div>
      )}
      {graphNo === 2 && (
        <div>
          <WithdrawalsChart accNo={accNo} />
        </div>
      )}
      {graphNo === 3 && (
        <div>
          <BalanceChart accNo={accNo} />
        </div>
      )}
      {graphNo === 4 && (
        <div class="graph">
          <GraphComponent acc={accNo} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
