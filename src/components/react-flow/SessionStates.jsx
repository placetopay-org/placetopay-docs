import ReactFlow, {Background, Controls, Handle, Position} from 'reactflow';
import {data} from "autoprefixer";
import clsx from "clsx";

const initialNodes = [
    { id: 'STATE_PENDING', type: 'custom', position: { x: 0, y: 0 }, data: { label: 'PENDING'} },
    { id: 'STATE_REJECTED', type: 'action', position: { x: 400, y: 0 }, data: { label: 'REJECTED', sourceHandle: false} },
    { id: 'STATE_APPROVED', type:'action', position: { x: 400, y: 100 }, data: { label: 'APPROVED', sourceHandle: false } },


    { id: 'ACTION_USER_CANCEL', type: 'action', position: { x: 150, y: -100 }, sourcePosition: 'right', targetPosition: 'left', data: { label: 'User canceled', rounded: true } },
    { id: 'ACTION_EXPIRATION', type: 'action', position: { x: 150, y: 0 }, sourcePosition: 'right', targetPosition: 'left', data: { label: 'Expiration time ends', rounded: true } },
    { id: 'ACTION_T_APPROVED', type: 'action', position: { x: 150, y: 100 }, sourcePosition: 'right', targetPosition: 'left', data: { label: 'Approved Transaction', rounded: true } },
    { id: 'ACTION_T_REJECTED', type: 'action', position: { x: 150, y: 200 }, sourcePosition: 'right', targetPosition: 'left', data: { label: 'Rejected Transaction', rounded: true } },

    // { id: 'APPROVED_PARTIAL', position: { x: 500, y: 100 }, data: { label: 'APPROVED_PARTIAL' } },
    // { id: 'PARTIAL_EXPIRED', position: { x: 300, y: 100 }, data: { label: 'PARTIAL_EXPIRED' } },
    //
];
const initialEdges = [
    { id: 'e__1', source: 'STATE_PENDING', target: 'ACTION_USER_CANCEL' },
    { id: 'e__2', source: 'ACTION_USER_CANCEL', target: 'STATE_REJECTED' },

    { id: 'e__3', source: 'STATE_PENDING', target: 'ACTION_EXPIRATION' },
    { id: 'e__4', source: 'ACTION_EXPIRATION', target: 'STATE_REJECTED' },

    { id: 'e__5', source: 'STATE_PENDING', target: 'ACTION_T_APPROVED' },
    { id: 'e__6', source: 'ACTION_T_APPROVED', target: 'STATE_APPROVED' },

    { id: 'e__7', source: 'STATE_PENDING', target: 'ACTION_T_REJECTED' },
    { id: 'e__8', source: 'ACTION_T_REJECTED', target: 'STATE_PENDING' },


    // { id: 'e__PENDING-APPROVED', source: 'PENDING', target: 'APPROVED' },
    // { id: 'e__PENDING-PARTIAL_EXPIRED', source: 'PENDING', target: 'PARTIAL_EXPIRED' },
    // { id: 'e__PENDING-APPROVED_PARTIAL', source: 'PENDING', target: 'APPROVED_PARTIAL' },
];

const nodeTypes = {
    custom: CustomNode,
    action: CustomNode,
};

function CustomNode({data}) {
    const targetHandle = data.targetHandle ?? true;
    const sourceHandle = data.sourceHandle ?? true;
    return (
        <div className={clsx("px-3 py-2 shadow-sm bg-white border border-gray-200", data.rounded? 'rounded-full': 'rounded-md')}>
            <div className="flex">
                <div className="text-gray-700 text-sm font-medium">{data.label}</div>
            </div>
            { targetHandle && <Handle type="target" position={Position.Left} className="w-16 !bg-teal-500"/>}
            { sourceHandle && <Handle type="source" position={Position.Right} className="w-16 !bg-teal-500"/>}
        </div>
    );
}

export default function SessionStates() {
    return (
        <div style={{ width: '100%', height: '400px' }} className="overflow-hidden ring-1 ring-gray-900/7.5 dark:ring-white/10 rounded-2xl">
            <ReactFlow
                nodes={initialNodes}
                edges={initialEdges}
                nodeTypes={nodeTypes}
                fitView
                className="bg-gray-50 dark:bg-gray-800"
            >
                <Background variant="dots" gap={12} size={1} />
                <Controls showInteractive={false}/>
            </ReactFlow>
        </div>
    );
}