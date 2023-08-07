import ReactFlow, { Controls, Background } from "react-flow-renderer";

const FlowGraph = () => {
  const initialNodes = [
    {
      id: "node-1",
      type: "default",
      data: { label: "Node 1" },
      position: { x: 100, y: 100 },
    },
    {
      id: "node-2",
      type: "default",
      data: { label: "Node 2" },
      position: { x: 200, y: 200 },
    },
  ]
  const initialEdges = [
    // Add self-loop edge for 'node-1'
    {
      id: "edge-1",
      source: "node-1",
      target: "node-1",
      animated: true,
      label: "Self Loop",
    },
    {
      id: "edge-2",
      source: "node-1",
      target: "node-2",
      animated: true,
      label: "Edge from node 1 to node 2",
    },
    {
        id: "edge-3",
        source: "node-2",
        target: "node-1",
        animated: true,
        label: "Edge from node 2 to node 1",
    },
  ];

  const styles = {
    width: "100%",
    height: "500px",
  };

  return (
    <div style={styles}>
      <ReactFlow nodes={initialNodes} edges={initialEdges}>
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowGraph
