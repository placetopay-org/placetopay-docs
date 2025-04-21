import ReactFlow, {Background, Controls} from 'reactflow';
import {nodeTypes} from "@/components/react-flow/react-flow";

const initialNodes = [
    { id: 'STATE_PENDING', type: 'tag', position: { x: 0, y: 0 }, data: { label: "Session", tagLabel: 'PENDING', tagColor: 'amber', targetHandle: false}},

    { id: 'ACTION_T_APPROVED', type: 'action', position: { x: 200, y: -95 }, sourcePosition: 'right', targetPosition: 'left', data: { label: 'Approved Transaction', rounded: true } },
    { id: 'ACTION_T_REJECTED', type: 'action', position: { x: 200, y: -25 }, sourcePosition: 'right', targetPosition: 'left', data: { label: 'Rejected Transaction', rounded: true } },
    { id: 'ACTION_EXPIRATION', type: 'action', position: { x: 200, y: 45 }, sourcePosition: 'right', targetPosition: 'left', data: { label: 'Expiration time ends', rounded: true } },
    { id: 'ACTION_USER_CANCEL', type: 'action', position: { x: 200, y: 115 }, sourcePosition: 'right', targetPosition: 'left', data: { label: 'User canceled', rounded: true } },

    { id: 'STATE_APPROVED', type:'tag', position: { x: 450, y: -110 }, data: { label: "Session", tagLabel: 'APPROVED', tagColor: 'primary', sourceHandle: false } },
    { id: 'STATE_PENDING_2', type: 'tag', position: { x: 450, y: -25 }, data: { label: "Session", tagLabel: 'PENDING', tagColor: 'amber', sourceHandle: false} },
    { id: 'STATE_REJECTED', type: 'tag', position: { x: 450, y: 60 }, data: { label: "Session", tagLabel: 'REJECTED', tagColor: 'rose', sourceHandle: false} },
];

const initialEdges = [
    { id: 'e__1', source: 'STATE_PENDING', target: 'ACTION_USER_CANCEL' },
    { id: 'e__2', source: 'ACTION_USER_CANCEL', target: 'STATE_REJECTED' },

    { id: 'e__3', source: 'STATE_PENDING', target: 'ACTION_EXPIRATION' },
    { id: 'e__4', source: 'ACTION_EXPIRATION', target: 'STATE_REJECTED' },

    { id: 'e__5', source: 'STATE_PENDING', target: 'ACTION_T_APPROVED' },
    { id: 'e__6', source: 'ACTION_T_APPROVED', target: 'STATE_APPROVED' },

    { id: 'e__7', source: 'STATE_PENDING', target: 'ACTION_T_REJECTED' },
    { id: 'e__8', source: 'ACTION_T_REJECTED', target: 'STATE_PENDING_2' },
];


export default function SessionStates() {
    return (
        <div style={{ width: '100%', height: '300px' }} className="overflow-auto ring-1 ring-gray-900/7.5 dark:ring-white/10 rounded-2xl nowheel">
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