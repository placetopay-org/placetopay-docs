import React from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
} from 'reactflow';

import { nodeTypes } from "@/components/react-flow/react-flow";

function DiagramSequence({ children }) {
  const data = {};

  const initialEdges = [];

  const nodes = [];
  const edges = [];


  const actorsData = {};

  for (const child of children) {
    if (!React.isValidElement(child)) {
      continue;
    }

    let nodeData = {
      position: { x: Number(child.props.positionX), y: Number(child.props.positionY) },
      data: {
        label: child.props.label,
        color: child.props.color,
      }
    };

    if (child.type.name === "SequenceActor") {

      nodeData['id'] = 'actor_' + child.props.name;
      nodeData['type'] = 'actor';
      nodeData['data']['height'] = child.props.height;
      actorsData[child.props.name] = { position: nodeData.position, color: child.props.color };

    } else if (child.type.name === "SequenceAction") {

      nodeData['id'] = 'action_' + child.props.name;
      nodeData['type'] = 'action';
      nodeData['data']['label'] = child.props.message;
      nodeData['data']['isBack'] = child.props.isBack;
      nodeData['data']['selfAction'] = child.props.selfAction;

      let sourceActionPointPositionY = child.props.selfAction ? Number(child.props.sourcePositionY) : nodeData.position.y;
      let sourceActionPoint = nodes.find(node => node.data.actor === child.props.from && node.position.y === sourceActionPointPositionY);
      if (sourceActionPoint === undefined) {
        sourceActionPoint = {
          id: 'action_point_' + nodeData['id'] + '_' + child.props.from + Math.random().toString(36),
          type: 'actionPoint',
          position: {
            x: actorsData[child.props.from].position.x,
            y: sourceActionPointPositionY
          },
          data: {
            color: actorsData[child.props.from].color,
            isBack: child.props.isBack,
            actor: child.props.from,
          }
        };
      }
      nodes.push(sourceActionPoint);

      let targetActionPointPositionY = child.props.selfAction ? Number(child.props.targetPositionY) : nodeData.position.y;
      let targetActionPoint = nodes.find(node => node.data.actor === child.props.to && node.position.y === targetActionPointPositionY);
      if (targetActionPoint === undefined) {
        targetActionPoint = {
          id: 'action_point_' + nodeData['id'] + '_' + child.props.to + '_' + Math.random().toString(36),
          type: 'actionPoint',
          position: {
            x: actorsData[child.props.to].position.x,
            y: targetActionPointPositionY
          },
          data: {
            color: actorsData[child.props.to].color,
            isBack: child.props.isBack,
            actor: child.props.to,
          }
        };
      }
      nodes.push(targetActionPoint);

      edges.push( {
        id: `edge_${nodeData['id']}_${child.props.from}_${Math.random().toString(36)}`,
        source: sourceActionPoint.id,
        sourceHandle:  Boolean(child.props.isBack) && !Boolean(sourceActionPoint.data.isBack) ? 'source_self_action' : 'default_source',
        target: nodeData['id'],
        targetHandle: 'default_target',
        type: 'default',
        markerEnd: {
          type: MarkerType.ArrowClosed,
        }
      },  {
        id: `edge_${nodeData['id']}_${child.props.to}_${Math.random().toString(36)}`,
        source: nodeData['id'],
        sourceHandle: 'default_source',
        target: targetActionPoint.id,
        targetHandle: Boolean(child.props.selfAction) ? 'target_self_action' : 'default_target',
        type: 'default',
        markerEnd: {
          type: MarkerType.ArrowClosed,
        }
      });
    }

    nodes.push(nodeData);
  }

  return (
    <div style={{ width: '100%', height: '300px' }} className="overflow-hidden ring-1 ring-gray-900/7.5 dark:ring-white/10 rounded-2xl">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50 dark:bg-gray-800">
        <Background variant="dots" gap={12} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>

  );
}

export default DiagramSequence;