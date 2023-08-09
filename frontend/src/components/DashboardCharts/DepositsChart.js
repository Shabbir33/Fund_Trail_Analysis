import { useEffect, useRef, useState } from "react";
import ReactFlow, { Controls, Background } from "react-flow-renderer";
import store from "../../stores/store";
import BarChart from "../Charts/BarChart";
import { getElementAtEvent } from "react-chartjs-2";

const DepositsChart = ({accNo}) => {
  const Store = store();

  const data = Store.data[accNo];
  const graphTranData = Store.transactions;
  const [open, setOpen] = useState(false);

  const [currentID, setCurrentID] = useState(null);

  const chartRefBarDeposit = useRef();

  useEffect(() => {
    Store.getDeposits(accNo);
    Store.getTransactions(accNo);
  }, []);

  if (data === undefined || data.deposits === null || graphTranData === undefined) {
    // console.log()
    // Store.getDeposits(accNo);
    // Store.getWithdrawals(accNo)
    // Store.getBalance(accNo)
    return <div>Loading ....</div>;
  }

  const deposits = data.deposits;


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
    <div>
      <div className="graph">
        <h2>Graph for Deposits per Transaction ID</h2>
        <BarChart
          chartRef={chartRefBarDeposit}
          onClick={(event) =>
            onClickBar(event, chartDeposit, chartRefBarDeposit)
          }
          data={chartDeposit}
          title="Deposits"
        />
      </div>
      {graphTranData.map((tran) => {
          if (String(tran.tranID) === currentID) {
            return (
              open && (
                <div className="Modal">
                  <div className="modalContent">
                    <p>Transaction ID: {tran.tranID}</p>
                    <p>Account Number: {accNo}</p>
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
          return
        })}
    </div>
  );
};

export default DepositsChart;