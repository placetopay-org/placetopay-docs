import ReactFlow, { Background, Controls } from 'reactflow';
import { nodeTypes } from "@/components/react-flow/react-flow";
import { useLocale } from "@/components/LocaleProvider";

const T = {
    es: {
        subject: "Proceso",
        start: "Entra en ejecución",
        done: "Comercio registrado",
        failed: "Registro fallido",
    },
    en: {
        subject: "Process",
        start: "Starts running",
        done: "Merchant registered",
        failed: "Registration failed",
    },
};

const buildNodes = (t) => [
    { id: 'STATE_PENDING', type: 'tag', position: { x: 0, y: 55 }, data: { label: t.subject, tagLabel: 'PENDING', tagColor: 'amber', targetHandle: false } },

    { id: 'ACTION_START', type: 'action', position: { x: 150, y: 70 }, sourcePosition: 'right', targetPosition: 'left', data: { label: t.start, rounded: true } },

    { id: 'STATE_PENDING_PROCESS', type: 'tag', position: { x: 310, y: 55 }, data: { label: t.subject, tagLabel: 'PENDING_PROCESS', tagColor: 'amber' } },

    { id: 'ACTION_DONE', type: 'action', position: { x: 470, y: 0 }, sourcePosition: 'right', targetPosition: 'left', data: { label: t.done, rounded: true } },
    { id: 'ACTION_FAILED', type: 'action', position: { x: 470, y: 140 }, sourcePosition: 'right', targetPosition: 'left', data: { label: t.failed, rounded: true } },

    { id: 'STATE_OK', type: 'tag', position: { x: 660, y: -15 }, data: { label: t.subject, tagLabel: 'OK', tagColor: 'primary', sourceHandle: false } },
    { id: 'STATE_FAILED', type: 'tag', position: { x: 660, y: 125 }, data: { label: t.subject, tagLabel: 'FAILED', tagColor: 'rose', sourceHandle: false } },
];

const initialEdges = [
    { id: 'e__1', source: 'STATE_PENDING', target: 'ACTION_START' },
    { id: 'e__2', source: 'ACTION_START', target: 'STATE_PENDING_PROCESS' },

    { id: 'e__3', source: 'STATE_PENDING_PROCESS', target: 'ACTION_DONE' },
    { id: 'e__4', source: 'ACTION_DONE', target: 'STATE_OK' },

    { id: 'e__5', source: 'STATE_PENDING_PROCESS', target: 'ACTION_FAILED' },
    { id: 'e__6', source: 'ACTION_FAILED', target: 'STATE_FAILED' },
];

export default function ProcessStates() {
    const { locale } = useLocale();
    const t = T[locale] ?? T.es;

    return (
        <div style={{ width: '100%', height: '340px' }} className="overflow-auto ring-1 ring-gray-900/7.5 dark:ring-white/10 rounded-2xl nowheel">
            <ReactFlow
                nodes={buildNodes(t)}
                edges={initialEdges}
                nodeTypes={nodeTypes}
                defaultViewport={{ x: 10, y: 30, zoom: 0.75 }}
                zoomOnScroll={false}
                className="bg-gray-50 dark:bg-gray-800"
            >
                <Background variant="dots" gap={12} size={1} />
                <Controls showInteractive={false} />
            </ReactFlow>
        </div>
    );
}
