import React, { useCallback, useState } from "react";
import ReactFlow, { MiniMap, Controls, Background, addEdge } from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    data: { label: "Start Node" },
    position: { x: 250, y: 0 },
  },
];

const FlowChart = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [nodeId, setNodeId] = useState(2);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addNode = () => {
    const newNode = {
      id: String(nodeId),
      data: { label: `Node ${nodeId}` },
      position: { x: 200, y: nodeId * 80 },
    };
    setNodes((nds) => [...nds, newNode]);

    if (nodes.length > 0) {
      setEdges((eds) => [
        ...eds,
        {
          id: `e${nodeId - 1}-${nodeId}`,
          source: String(nodeId - 1),
          target: String(nodeId),
        },
      ]);
    }

    setNodeId(nodeId + 1);
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <button
        onClick={addNode}
        style={{
          marginBottom: "10px",
          padding: "8px 16px",
          background: "#61dafb",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        ➕ Add Node
      </button>

      <ReactFlow nodes={nodes} edges={edges} onConnect={onConnect} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
