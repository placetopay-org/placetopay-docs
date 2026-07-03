import ReactFlow, {Background, Controls} from 'reactflow';
import {nodeTypes} from "@/components/react-flow/react-flow";

const initialNodes = [
    { id: 'STATE_PENDING', type: 'tag', position: { x: 0, y: 0 }, data: { label: "Session", tagLabel: 'PENDING', tagColor: 'amber', targetHandle: false } },

    { id: 'ACTION_T_PENDING_CONF', type: 'action', position: { x: 200, y: -20 }, sourcePosition: 'right', targetPosition: 'left', data: { label: 'Requires Confirmation', rounded: true } },

    { id: 'STATE_PENDING_CONFIRMATION', type: 'tag', position: { x: 450, y: -20 }, data: { label: "Transaction", tagLabel: 'PENDING\\_CONFIRMATION', tagColor: 'amber', sourceHandle: true, targetHandle: true } },

    { id: 'ACTION_CONFIRM', type: 'action', position: { x: 700, y: -65 }, sourcePosition: 'right', targetPosition: 'left', data: { label: 'Merchant Confirms', rounded: true } },
    { id: 'ACTION_CANCEL', type: 'action', position: { x: 700, y: 25 }, sourcePosition: 'right', targetPosition: 'left', data: { label: 'Merchant Cancels / Timeout', rounded: true } },

    { id: 'STATE_APPROVED', type: 'tag', position: { x: 950, y: -65 }, data: { label: "Session", tagLabel: 'APPROVED', tagColor: 'primary', sourceHandle: false } },
    { id: 'STATE_REJECTED', type: 'tag', position: { x: 950, y: 25 }, data: { label: "Session", tagLabel: 'REJECTED', tagColor: 'rose', sourceHandle: false } },
];

const initialEdges = [
    { id: 'e__1', source: 'STATE_PENDING', target: 'ACTION_T_PENDING_CONF' },
    { id: 'e__2', source: 'ACTION_T_PENDING_CONF', target: 'STATE_PENDING_CONFIRMATION' },

    { id: 'e__3', source: 'STATE_PENDING_CONFIRMATION', target: 'ACTION_CONFIRM' },
    { id: 'e__4', source: 'ACTION_CONFIRM', target: 'STATE_APPROVED' },

    { id: 'e__5', source: 'STATE_PENDING_CONFIRMATION', target: 'ACTION_CANCEL' },
    { id: 'e__6', source: 'ACTION_CANCEL', target: 'STATE_REJECTED' },
];

export default function ConfirmationFlowStates() {
    return (
        <div style={{ width: '100%', height: '220px' }} className="overflow-auto ring-1 ring-gray-900/7.5 dark:ring-white/10 rounded-2xl nowheel">
            <ReactFlow
                nodes={initialNodes}
                edges={initialEdges}
                nodeTypes={nodeTypes}
                fitView
                zoomOnScroll={false}
                className="bg-gray-50 dark:bg-gray-800"
            >
                <Background variant="dots" gap={12} size={1} />
                <Controls showInteractive={false} />
            </ReactFlow>
        </div>
    );
}
