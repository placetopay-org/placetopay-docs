import React from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
} from 'reactflow';

import { nodeTypes } from "@/components/react-flow/react-flow";
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor";
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction";
import Line from "@/components/react-flow/SequenceDiagram/Line";

function SequenceDiagram({ customView = null, children }) {
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

    if (child.type === SequenceActor) {

      nodeData['id'] = 'actor_' + child.props.id;
      nodeData['type'] = 'actor';
      nodeData['data']['height'] = child.props.height;
      actorsData[child.props.id] = { position: nodeData.position, color: child.props.color };

    }else if(child.type === Line){
      nodeData['id'] = 'line:' + child.props.id;
      nodeData['type'] = 'line';
      nodeData['data']['label'] = child.props.label;
      nodeData['data']['width'] = child.props.width;
      
    } else if (child.type === SequenceAction) {
      const arrowsRerverse = actorsData[child.props.from].position.x > actorsData[child.props.to].position.x;
      const selfAction = child.props.from === child.props.to;
      
      nodeData['id'] = 'action_' + child.props.id;
      nodeData['type'] = 'action';
      nodeData['data']['label'] = child.props.message;
      nodeData['data']['isReturned'] = arrowsRerverse;
      nodeData['data']['selfAction'] = selfAction;
      
      let sourceActionPointPositionY = selfAction ? Number(child.props.sourcePositionY) : nodeData.position.y;
      let sourceActionPoint = nodes.find(node => node.data.actor === child.props.from && node.position.y === sourceActionPointPositionY);
      let regex = /<br>/;
      let yAdjustment = regex.test(child.props.message) ? 1 : -11;
      let sourceActionPointPositionYFinal = sourceActionPointPositionY + yAdjustment;

      if (sourceActionPoint === undefined) {
        sourceActionPoint = {
          id: 'action_point_' + nodeData['id'] + '_' + child.props.from + Math.random().toString(36),
          type: 'actionPoint',
          position: {
            x: actorsData[child.props.from].position.x,
            y: sourceActionPointPositionYFinal
          },
          data: {
            color: actorsData[child.props.from].color,
            isReturned: arrowsRerverse,
            actor: child.props.from,
          }
        };
      }
      nodes.push(sourceActionPoint);

      let targetActionPointPositionY = selfAction ? Number(child.props.targetPositionY) : nodeData.position.y;
      let targetActionPoint = nodes.find(node => node.data.actor === child.props.to && node.position.y === targetActionPointPositionY);
      let targetActionPointPositionYFinal = targetActionPointPositionY + yAdjustment;

      if (targetActionPoint === undefined) {
        targetActionPoint = {
          id: 'action_point_' + nodeData['id'] + '_' + child.props.to + '_' + Math.random().toString(36),
          type: 'actionPoint',
          position: {
            x: actorsData[child.props.to].position.x,
            y: targetActionPointPositionYFinal
          },
          data: {
            color: actorsData[child.props.to].color,
            isReturned: arrowsRerverse,
            actor: child.props.to,
          }
        };
      }
      nodes.push(targetActionPoint);

      edges.push( {
        id: `edge_${nodeData['id']}_${child.props.from}_${Math.random().toString(36)}`,
        source: sourceActionPoint.id,
        sourceHandle:  Boolean(arrowsRerverse) && !Boolean(sourceActionPoint.data.isReturned) ? 'source_self_action' : 'default_source',
        target: nodeData['id'],
        targetHandle: 'default_target',
        type: 'default',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
        }
      },  {
        id: `edge_${nodeData['id']}_${child.props.to}_${Math.random().toString(36)}`,
        source: nodeData['id'],
        sourceHandle: 'default_source',
        target: targetActionPoint.id,
        targetHandle: Boolean(selfAction) ? 'target_self_action' : 'default_target',
        type: 'default',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
        }
      });
    }

    nodes.push(nodeData);
  }

  const viewportProps = customView 
  ? { 
      defaultViewport: { 
        x: Number(customView.x), 
        y: Number(customView.y), 
        zoom: customView.zoom ? customView.zoom : 0.75
      } 
    }
  : { fitView: true };

  return (
    <div style={{ width: '100%', height: customView?.height ?? '400px' }} className="overflow-auto ring-1 ring-gray-900/7.5 dark:ring-white/10 rounded-2xl nowheel">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        {...viewportProps}
        zoomOnScroll={false}
        className="bg-gray-50 dark:bg-gray-800">
        <Background variant="dots" gap={12} size={1} />
        <Controls showInteractive={false}/>
      </ReactFlow>
    </div>
  );
}

export default SequenceDiagram;