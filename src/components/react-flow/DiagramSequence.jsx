import React from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
} from 'reactflow';
 
import {nodeTypes} from "@/components/react-flow/react-flow";

function generateFlowId(type, ...parts) {
  return `${type}-${parts.join('-')}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
}

function DiagramSequence({children}) {
  const data = {};
  const initialEdges = [];

  const initialNodes = children
  .reduce((acc, child) => {
    if (React.isValidElement(child)) {
      if (child.type.name === "SequenceActor") {
        
        data[child.props.name] = {
          positionX: Number(child.props.positionX),
          positionY: Number(child.props.positionY),
          color: child.props.color,
          name: child.props.name
        };

        acc.push({
          id: child.props.name,
          type: 'actor',
          position: { x: Number(child.props.positionX), y: Number(child.props.positionY) },
          data: { 
            label: child.props.label,
            color: child.props.color,
            positionX: child.props.positionX,
            positionY: child.props.positionY
          },
        });
      }

      if (child.type.name === "SequenceAction") {
        const idsNode = {
          [child.props.from]: {
            id: `node' + ${child.props.from} - ${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            positionX: data[child.props.from].positionX,
            positionY: Number(child.props.positionY) - 11
          },
          [child.props.to]: {
            id: `node' + ${child.props.to} - ${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            positionX: data[child.props.to].positionX,
            positionY: Number(child.props.positionY) - 11
          } ,
        };

        const newNodes = [];

        const fromNodeExists = acc.some(existingNode => 
          existingNode.type === 'nodeAction' &&
          existingNode.data?.from === child.props.from &&
          existingNode.position.x === idsNode[child.props.from].positionX &&
          existingNode.position.y === idsNode[child.props.from].positionY
        );

        if (!fromNodeExists) {
          newNodes.push({
            id: idsNode[child.props.from].id,
            type: 'nodeAction',
            position: { 
              x: idsNode[child.props.from].positionX, 
              y: idsNode[child.props.from].positionY
            },
            data: {
              label: child.props.label,
              from: child.props.from,
              to: child.props.to,
              color: data[child.props.from].color,
              isBack: child.props.isBack,
            }
          });
        }

        const toNodeExists = acc.some(existingNode => 
          existingNode.type === 'nodeAction' &&
          existingNode.data?.to === child.props.to &&
          existingNode.position.x === idsNode[child.props.to].positionX &&
          existingNode.position.y === idsNode[child.props.to].positionY
        );

        if (!toNodeExists) {
          newNodes.push({
            id: idsNode[child.props.to].id,
            type: 'nodeAction',
            position: { 
              x: idsNode[child.props.to].positionX, 
              y: idsNode[child.props.to].positionY
            },
            data: {
              label: child.props.label,
              from: child.props.from,
              to: child.props.to,
              color: data[child.props.to].color,
              isBack: child.props.isBack,
            }
          });
        }

        newNodes.push({
          id: child.props.name,
          type: 'action',
          position: { 
            x: Number(child.props.positionX), 
            y: Number(child.props.positionY) 
          },
          data: { 
            name: child.props.name,
            label: child.props.message,
            rounded: true,
            isBack: child.props.isBack,
          }
        });
      
        acc.push(...newNodes);

        initialEdges.push({
          id: `edge-${child.props.from}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          source: idsNode[child.props.from].id,
          target: child.props.name,
          type: 'default',
          markerEnd: {
            type: MarkerType.ArrowClosed,
          }
        },
        {
          id: `edge-${child.props.to}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}` ,
          source: child.props.name,
          target: idsNode[child.props.to].id,
          type: 'default',
          markerEnd: {
            type: MarkerType.ArrowClosed,
          }
        });
      }
    }
    return acc;
  }, []);

  return (
    <div style={{ width: '100%', height: '300px' }} className="overflow-hidden ring-1 ring-gray-900/7.5 dark:ring-white/10 rounded-2xl">
        <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
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