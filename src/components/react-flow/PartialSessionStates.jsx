import ReactFlow, {Background, Controls} from 'reactflow';

import {nodeTypes} from "@/components/react-flow/react-flow";

const initialNodes = [
    { id: 'S_PENDING', type: 'tag', position: { x: 0, y: 0 }, data: { label: 'Session', tagLabel: 'PENDING', tagColor: 'amber', targetHandle: false}},

    { id: 'A_T_APPROVED', type: 'action', position: { x: 150, y: 45-70-70 }, data: { label: '100% Approved Transaction', rounded: true } },
    { id: 'A_T_APPROVED_2', type: 'action', position: { x: 150, y: 45-70 }, data: { label: '50% Approved Transaction', rounded: true } },
    { id: 'A_T_REJECTED', type: 'action', position: { x: 150, y: 45 }, data: { label: 'Rejected Transaction', rounded: true } },
    { id: 'A_EXPIRATION', type: 'action', position: { x: 150, y: 45+70 }, data: { label: 'Expiration time ends', rounded: true } },
    { id: 'A_USER_CANCEL', type: 'action', position: { x: 150, y: 45+70+70 }, data: { label: 'User canceled', rounded: true } },

    { id: 'S_APPROVED', type: 'tag', position: { x: 400, y: -110 }, data: { label: 'Session', tagLabel: 'APPROVED', tagColor: 'primary', sourceHandle: false } },
    { id: 'S_APPROVED_PARTIAL', type:'tag', position: { x: 400, y: -25 }, data: { label: 'Session', tagLabel: 'APPROVED_PARTIAL', tagColor: 'sky'} },
    { id: 'S_PENDING_2', type: 'tag', position: { x: 400, y: 75 }, data: { label: 'Session', tagLabel: 'PENDING', tagColor: 'amber', sourceHandle: false} },
    { id: 'S_REJECTED', type: 'tag', position: { x: 400, y: 150 }, data: { label: 'Session', tagLabel: 'REJECTED', tagColor: 'rose', sourceHandle: false} },

    { id: 'A_EXPIRATION_2', type: 'action', position: { x: 580, y: -15 }, data: { label: 'Expiration time ends', rounded: true, sourcePosition: 'bottom'} },
    { id: 'S_PARTIAL_EXPIRED', type: 'tag', position: { x: 600, y: 60 }, data: { label: 'Session', tagLabel: 'PARTIAL_EXPIRED', tagColor: 'rose', sourceHandle: false, targetPosition: 'top'} },
];
const initialEdges = [
    { id: 'e__A1', source: 'S_PENDING', target: 'A_T_APPROVED' },
    { id: 'e__A2', source: 'A_T_APPROVED', target: 'S_APPROVED' },

    { id: 'e__B1', source: 'S_PENDING', target: 'A_T_APPROVED_2' },
    { id: 'e__B2', source: 'A_T_APPROVED_2', target: 'S_APPROVED_PARTIAL' },

    { id: 'e__C1', source: 'S_PENDING', target: 'A_USER_CANCEL' },
    { id: 'e__C2', source: 'A_USER_CANCEL', target: 'S_REJECTED' },

    { id: 'e__D1', source: 'S_PENDING', target: 'A_EXPIRATION' },
    { id: 'e__D2', source: 'A_EXPIRATION', target: 'S_REJECTED' },

    { id: 'e__E1', source: 'S_PENDING', target: 'A_T_REJECTED' },
    { id: 'e__E2', source: 'A_T_REJECTED', target: 'S_PENDING_2' },

    { id: 'e__F1', source: 'S_APPROVED_PARTIAL', target: 'A_EXPIRATION_2' },
    { id: 'e__F2', source: 'A_EXPIRATION_2', target: 'S_PARTIAL_EXPIRED' },
];

export default function PartialSessionStates() {
    return (
        <div style={{ width: '100%', height: '400px' }} className="overflow-auto ring-1 ring-gray-900/7.5 dark:ring-white/10 rounded-2xl nowheel">
            <ReactFlow
                nodes={initialNodes}
                edges={initialEdges}
                nodeTypes={nodeTypes}
                fitView
                zoomOnScroll={false}
                className="bg-gray-50 dark:bg-gray-800"
            >
                <Background variant="dots" gap={12} size={1} />
                <Controls showInteractive={false}/>
            </ReactFlow>
        </div>
    );
}