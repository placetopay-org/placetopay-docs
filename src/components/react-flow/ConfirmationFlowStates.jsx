import ReactFlow, {Background, Controls} from 'reactflow';
import {nodeTypes} from "@/components/react-flow/react-flow";

const initialNodes = [
    { id: 'STATE_PENDING', type: 'tag', position: { x: 0, y: 0 }, data: { label: "Session", tagLabel: 'PENDING', tagColor: 'amber', targetHandle: false } },

    { id: 'ACTION_T_PENDING_CONF', type: 'action', position: { x: 120, y: 14 }, sourcePosition: 'right', targetPosition: 'left', data: { label: 'Captures Transaction', rounded: true } },

    { id: 'STATE_PENDING_2', type: 'tag', position: { x: 320, y: 0 }, data: { label: "Session", tagLabel: 'PENDING', tagColor: 'amber', sourceHandle: true, targetHandle: true } },

    { id: 'ACTION_CONFIRM', type: 'action', position: { x: 450, y: -55 }, sourcePosition: 'right', targetPosition: 'left', data: { label: 'Merchant Confirms', rounded: true } },
    { id: 'ACTION_CANCEL', type: 'action', position: { x: 450, y: 80 }, sourcePosition: 'right', targetPosition: 'left', data: { label: 'Merchant Cancels / Expiration', rounded: true } },

    { id: 'STATE_APPROVED', type: 'tag', position: { x: 750, y: -80 }, data: { label: "Session", tagLabel: 'APPROVED', tagColor: 'primary', sourceHandle: false } },
    { id: 'STATE_REJECTED', type: 'tag', position: { x: 750, y: 25 }, data: { label: "Session", tagLabel: 'REJECTED', tagColor: 'rose', sourceHandle: false } },
];

const initialEdges = [
    { id: 'e__1', source: 'STATE_PENDING', target: 'ACTION_T_PENDING_CONF' },
    { id: 'e__2', source: 'ACTION_T_PENDING_CONF', target: 'STATE_PENDING_2' },

    { id: 'e__4', source: 'STATE_PENDING_2', target: 'ACTION_CONFIRM' },
    { id: 'e__5', source: 'ACTION_CONFIRM', target: 'STATE_APPROVED' },
    { id: 'e__8', source: 'ACTION_CONFIRM', target: 'STATE_REJECTED' },

    { id: 'e__6', source: 'STATE_PENDING_2', target: 'ACTION_CANCEL' },
    { id: 'e__7', source: 'ACTION_CANCEL', target: 'STATE_REJECTED' },
];

export default function ConfirmationFlowStates() {
    return (
        <div style={{ width: '100%', height: '180px' }} className="overflow-auto ring-1 ring-gray-900/7.5 dark:ring-white/10 rounded-2xl nowheel">
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
