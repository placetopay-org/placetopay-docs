import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls
} from 'reactflow';
 
import SequenceActor from '@/components/react-flow/SequenceActor';

const nodeTypes = { sequenceActor: SequenceActor };
 
function DiagramSequence({children}) {
  const initialNodes = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && child.type.name === "SequenceActor") {
      return {
        id: child.props.name,
        type: 'sequenceActor',
        position: { x: index * 200, y: 0 },
        data: { 
          label: child.props.label,
          color: child.props.color
        },
      };
    }
    return null;
  }).filter(Boolean);

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
 
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );
 
  return (
    <div style={{ width: '100%', height: '300px' }} className="overflow-hidden ring-1 ring-gray-900/7.5 dark:ring-white/10 rounded-2xl">
        <ReactFlow
        nodes={nodes}
        edges={edges}

        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50 dark:bg-gray-800">
        <Background variant="dots" gap={12} size={1} />
        <Controls showInteractive={false}/>
        </ReactFlow>
    </div>

  );
}
 
export default DiagramSequence;