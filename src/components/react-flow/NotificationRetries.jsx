import ReactFlow, { Background, Controls } from 'reactflow';
import { nodeTypes } from "@/components/react-flow/react-flow";
import { useLocale } from "@/components/LocaleProvider";

const T = {
    es: {
        subject: "Notificación",
        ack: "Respondes 2xx",
        retry: "5xx, 408, 425, 429 o error de red",
        reject: "Respondes cualquier otro 4xx",
        exhausted: "Se agotan los 6 intentos",
    },
    en: {
        subject: "Notification",
        ack: "You answer 2xx",
        retry: "5xx, 408, 425, 429 or network error",
        reject: "You answer any other 4xx",
        exhausted: "The 6 attempts run out",
    },
};

const buildNodes = (t) => [
    { id: 'STATE_PENDING', type: 'tag', position: { x: 0, y: 115 }, data: { label: t.subject, tagLabel: 'PENDING', tagColor: 'amber', targetHandle: false } },

    { id: 'ACTION_ACK', type: 'action', position: { x: 260, y: 0 }, sourcePosition: 'right', targetPosition: 'left', data: { label: t.ack, rounded: true } },
    { id: 'ACTION_RETRY', type: 'action', position: { x: 260, y: 85 }, sourcePosition: 'right', targetPosition: 'left', data: { label: t.retry, rounded: true } },
    { id: 'ACTION_REJECT', type: 'action', position: { x: 260, y: 170 }, sourcePosition: 'right', targetPosition: 'left', data: { label: t.reject, rounded: true } },
    { id: 'ACTION_EXHAUSTED', type: 'action', position: { x: 260, y: 255 }, sourcePosition: 'right', targetPosition: 'left', data: { label: t.exhausted, rounded: true } },

    { id: 'STATE_DELIVERED', type: 'tag', position: { x: 650, y: -15 }, data: { label: t.subject, tagLabel: 'DELIVERED', tagColor: 'primary', sourceHandle: false } },
    { id: 'STATE_PENDING_2', type: 'tag', position: { x: 650, y: 70 }, data: { label: t.subject, tagLabel: 'PENDING', tagColor: 'amber', sourceHandle: false } },
    { id: 'STATE_FAILED', type: 'tag', position: { x: 650, y: 155 }, data: { label: t.subject, tagLabel: 'FAILED', tagColor: 'rose', sourceHandle: false } },
    { id: 'STATE_FAILED_2', type: 'tag', position: { x: 650, y: 240 }, data: { label: t.subject, tagLabel: 'FAILED', tagColor: 'rose', sourceHandle: false } },
];

const initialEdges = [
    { id: 'e__1', source: 'STATE_PENDING', target: 'ACTION_ACK' },
    { id: 'e__2', source: 'ACTION_ACK', target: 'STATE_DELIVERED' },

    { id: 'e__3', source: 'STATE_PENDING', target: 'ACTION_RETRY' },
    { id: 'e__4', source: 'ACTION_RETRY', target: 'STATE_PENDING_2' },

    { id: 'e__5', source: 'STATE_PENDING', target: 'ACTION_REJECT' },
    { id: 'e__6', source: 'ACTION_REJECT', target: 'STATE_FAILED' },

    { id: 'e__7', source: 'STATE_PENDING', target: 'ACTION_EXHAUSTED' },
    { id: 'e__8', source: 'ACTION_EXHAUSTED', target: 'STATE_FAILED_2' },
];

export default function NotificationRetries() {
    const { locale } = useLocale();
    const t = T[locale] ?? T.es;

    return (
        <div style={{ width: '100%', height: '340px' }} className="overflow-auto ring-1 ring-gray-900/7.5 dark:ring-white/10 rounded-2xl nowheel">
            <ReactFlow
                nodes={buildNodes(t)}
                edges={initialEdges}
                nodeTypes={nodeTypes}
                defaultViewport={{ x: 10, y: 25, zoom: 0.75 }}
                zoomOnScroll={false}
                className="bg-gray-50 dark:bg-gray-800"
            >
                <Background variant="dots" gap={12} size={1} />
                <Controls showInteractive={false} />
            </ReactFlow>
        </div>
    );
}
