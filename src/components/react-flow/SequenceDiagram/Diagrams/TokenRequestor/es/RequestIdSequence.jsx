import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram";
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor";
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction";
import Line from "@/components/react-flow/SequenceDiagram/Line";

export default function RequestIdSequenceEs() {
    return (
        <SequenceDiagram customView={{ height: 400, x: 100, y: 27.2727 }}>
            <SequenceActor id="consumidor" label="Consumidor" positionX="0" positionY="0" height="400px" />
            <SequenceActor id="sistema" label="Sistema (Request Id/Token Requestor)" positionX="300" positionY="0" height="400px" color="bg-blueFlow" />

            <Line id="lineStart" label="Start" positionX="50" positionY="35" width="400px" />

            <SequenceAction
                id="iniciarEnrolamiento"
                from="consumidor"
                to="sistema"
                message="1. Iniciar Enrolamiento"
                positionX="150"
                positionY="70"
            />

            <SequenceAction
                id="enviarRequestId"
                from="consumidor"
                to="sistema"
                message="2. Enviar Solicitud (Request Id)"
                positionX="150"
                positionY="130"
            />

            <SequenceAction
                id="procesarSolicitud"
                from="sistema"
                to="sistema"
                message="3. Validar Solicitud y Enrolar Tarjeta (Internamente)"
                positionX="300"
                positionY="190"
                sourcePositionY="130"
                targetPositionY="250"
            />

            <SequenceAction
                id="entregarToken"
                from="sistema"
                to="consumidor"
                message="4. Entregar Token"
                positionX="150"
                positionY="250"
            />
        </SequenceDiagram>
    );
}