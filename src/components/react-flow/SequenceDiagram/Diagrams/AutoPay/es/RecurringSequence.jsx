import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram"
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor"
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction"
import Line from "@/components/react-flow/SequenceDiagram/Line"

export default function RecurringSequence() {
    return (
        <SequenceDiagram customView={{ height: 500, x: 150, y: 0 }}>
            {/* Actores: El Motor y la Data */}
            <SequenceActor
                id="scheduler"
                label="Motor (Scheduler)"
                positionX="0"
                positionY="0"
                height="600px"
            />
            <SequenceActor
                id="entity"
                label="Regla (Suscripción)"
                color="bg-blueFlow"
                positionX="300"
                positionY="0"
                height="600px"
            />

            {/* Paso 1: Trigger */}
            <Line id="lineStart" label="Cobro Exitoso Detectado" positionX="-80" positionY="40" width="600px" />

            <SequenceAction
                id="calc_request"
                from="scheduler"
                to="entity"
                message="Calcular Siguiente Fecha"
                positionX="20"
                positionY="70"
            />

            {/* Paso 2: Cálculo Matemático */}
            <SequenceAction
                id="math_logic"
                from="entity"
                to="entity"
                message="Fecha = Actual + (Intervalo * Periodo)"
                positionX="300"
                positionY="130"
                sourcePositionY="130"
                targetPositionY="180"
            />

            {/* Paso 3: Validación */}
            <Line id="lineCheck" label="Validación de Vigencia" positionX="-80" positionY="220" width="600px" />

            <SequenceAction
                id="check_duedate"
                from="entity"
                to="entity"
                message="¿Nueva Fecha <= DueDate?"
                positionX="300"
                positionY="260"
                sourcePositionY="260"
                targetPositionY="310"
            />

            {/* Resultado A: Fecha Válida */}
            <SequenceAction
                id="update_next"
                from="entity"
                to="scheduler"
                message="OK: Actualizar nextPayment"
                positionX="20"
                positionY="360"
                isDotted
            />

            {/* Resultado B: Vencido (Opcional visualmente para no saturar, o se puede agregar otra línea) */}

        </SequenceDiagram>
    )
}