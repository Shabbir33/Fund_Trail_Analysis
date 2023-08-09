import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
// import GraphData from "./GraphData";
import store from "../stores/store";
import { v4 as uuidv4 } from "uuid";

const GraphComponent = (acc) => {
  // let graph = GraphData(acc);
  const [selectedEdge, setSelectedEdge] = useState(null);

  const Store = store();
  useEffect(() => {
    Store.getTransactions(acc);
  }, []);
  const tranData = Store.transactions;
  console.log(tranData);
  let data1 = {
    nodes: [
      { id: 1, label: "Node 1", title: "node 1 tootip text" },
      { id: 2, label: "Node 2", title: "node 2 tootip text" },
      { id: 3, label: "Node 3", title: "node 3 tootip text" },
      { id: 4, label: "Node 4", title: "node 4 tootip text" },
      { id: 5, label: "Node 5", title: "node 5 tootip text" },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 5, to: 2 },
      { from: 2, to: 2 },
    ],
  };
  let data = {};

  if (tranData !== []) {
    console.log(tranData);
    let nodesList = tranData.map((tran) => {
      return tran.secAccountNo;
    });
    nodesList = [...nodesList, tranData[0]?.accountNo];
    let outputArray = Array.from(new Set(nodesList));
    console.log(outputArray);

    let edgesList = [];
    edgesList = tranData.map((tran) => {
      const key =
        tran.type === 1 || tran.type === 3
          ? [tran.accountNo, tran.secAccountNo]
          : [tran.secAccountNo, tran.accountNo];
      return {
        key: key,
        value: tran.tranID,
      };
    });

    const groupedData = {};

    edgesList.forEach((edge) => {
      if (groupedData[edge.key]) {
        groupedData[edge.key].push(edge.value);
      } else {
        groupedData[edge.key] = [edge.value];
      }
    });

    console.log(groupedData);

    const edgeData = [];
    Object.keys(groupedData).forEach(function (key, index) {
      const [from, to] = key.split(",");
      console.log(from, to);
      edgeData.push({
        id: `${from} --> ${to} : ${groupedData[key]}`,
        from: parseInt(from),
        to: parseInt(to),
      });
    });
    console.log(edgeData);

    data = {
      nodes: outputArray.map((accNo) => {
        return {
          id: accNo,
          label: `Account ${accNo}`,
        };
      }),
      edges: edgeData,
      // tranData.map((tran) => {
      //   const from = tran.type === 1 || tran.type === 3
      //   ? tran.accountNo
      //   : tran.secAccountNo
      //   const to = tran.type === 1 || tran.type === 3
      //   ? tran.secAccountNo
      //   : tran.accountNo
      //   return {
      //     id: `${from} -> ${to} : ${tran.tranID}`,
      //     from:from,
      //     to:to,
      //   };
      // }),
    };
  }

  console.log(data);

  // const [graph, setGraph] = useState(null)

  // useEffect(() => {
  //   graphData = GraphData(accNo)
  //   console.log(graphData)
  // }, [])

  // if(graphData === undefined){
  //   return(<div>
  //     Loading .....
  //   </div>)
  // }

  // setGraph(graphData)

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#000000",
      arrows: {
        to: {
          enabled: true,
          scaleFactor: 0.5,
        },
      },
      smooth: {
        type: "curvedCCW",
        roundness: 0.1,
      },
    },
    height: "500px",
  };

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
    },
    selectEdge: (event) => {
      const { edges } = event;
      if (edges.length === 1) {
        setSelectedEdge(edges[0]);
      }
    },
    // drawEdge: (graph, edge, id, selected, hovered) => {
    //   const { from, to } = edge;
    //   const isSelfLoop = from === to;

    //   // If it's a self-loop edge, draw a curved line
    //   if (isSelfLoop) {
    //     const radius = 0; // Adjust this value to control the loop's curvature
    //     const x = graph.nodes[from].x;
    //     const y = graph.nodes[from].y;
    //     const xOffset = radius * Math.cos(0.8);
    //     const yOffset = radius * Math.sin(0.8);

    //     return `<path d="M ${x} ${y} C ${x + xOffset} ${y - yOffset} ${x - xOffset} ${y - yOffset} ${x} ${y}"/>`;
    //   }

    //   // For other edges, use the default drawEdge function
    //   return graph.svg.drawEdge(graph, edge, id, selected, hovered);
    // },
  };

  return (
    <div>
      <h2>Fund Flow Network</h2>
      <Graph
        key={uuidv4()}
        graph={data}
        options={options}
        events={events}
        // getNetwork={network => {
        //   //  if you want access to vis.js network api you can set the state in a parent component using this property
        // }}
      />
      <div className="edge-popup">
        {selectedEdge &&
        // <p>{(selectedEdge
        // .split(":")[1])
        // .split(",").map((id) => {
        //   return <p>{id}</p>
        // })}</p>
          (selectedEdge
            .split(":")[1])
            .split(",")
            .map((ID) => {
              return tranData.map((tran) => {
                if (tran.tranID === ID) {
                  return (
                    <>
                      <h2>Transaction Details</h2>
                      <p>Transaction ID: {tran.tranID}</p>
                      <p>Account Number: {tran.accountNo}</p>
                      <p>Second Account Number: {tran.secAccountNo}</p>
                      <p>Amount: {tran.amount}</p>
                      {/* <button onClick={() => setSelectedEdge(null)}>Close</button> */}
                    </>
                  );
                }
                return
              });
            }
            )
        }
      </div>
    </div>
  );
};

export default GraphComponent;
