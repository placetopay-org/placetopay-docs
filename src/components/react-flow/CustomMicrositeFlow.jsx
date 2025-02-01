import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  { id: "start", type: "input", position: { x: 250, y: 0 }, data: { label: "Inicio" }, style: { backgroundColor: "#34D399", borderRadius: "10px", color: "#fff" } },
  { id: "accessForm", type: "process", position: { x: 250, y: 100 }, data: { label: "Formulario de Acceso" }, style: { backgroundColor: "#60A5FA", borderRadius: "10px", color: "#fff" } },
  { id: "invoiceSearch", type: "process", position: { x: 250, y: 200 }, data: { label: "Búsqueda de Facturas Pendientes" }, style: { backgroundColor: "#FBBF24", borderRadius: "10px", color: "#fff" } },
  { id: "selectPayments", type: "decision", position: { x: 150, y: 300 }, data: { label: "Seleccionar Pagos" }, style: { backgroundColor: "#F87171", borderRadius: "10px", color: "#fff" } },
  { id: "paymentForm", type: "process", position: { x: 400, y: 300 }, data: { label: "Formulario de Pago" }, style: { backgroundColor: "#A78BFA", borderRadius: "10px", color: "#fff" } },
  { id: "transactionDetail", type: "output", position: { x: 250, y: 400 }, data: { label: "Detalle de Transacción" }, style: { backgroundColor: "#10B981", borderRadius: "10px", color: "#fff" } }
];

const initialEdges = [
  { id: "e1", source: "start", target: "accessForm", label: "Ingresar URL" },
  { id: "e2", source: "accessForm", target: "invoiceSearch", label: "Ingresar Datos de Acceso" },
  { id: "e3", source: "invoiceSearch", target: "selectPayments", label: "Listar Facturas Pendientes" },
  { id: "e4", source: "selectPayments", target: "paymentForm", label: "Seleccionar Pagos" },
  { id: "e5", source: "paymentForm", target: "transactionDetail", label: "Procesar Pago" },
  { id: "e6", source: "transactionDetail", target: "end", label: "Mostrar Detalle" }
];

const CustomMicrositeFlow = () => {
  return (
    <div style={{ width: "100%", height: "500px" }} className="overflow-hidden ring-1 ring-gray-900/7.5 dark:ring-white/10 rounded-2xl">
      <ReactFlow nodes={initialNodes} edges={initialEdges} fitView className="bg-gray-50 dark:bg-gray-800">
        <Background variant="dots" gap={12} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
};

export default CustomMicrositeFlow;