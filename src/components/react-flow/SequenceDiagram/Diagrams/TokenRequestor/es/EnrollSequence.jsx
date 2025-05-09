import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram";
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor";
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction";
import Line from "@/components/react-flow/SequenceDiagram/Line";

export default function EnrollSequenceEs() {
    return (
        <SequenceDiagram customView={{ height: 900, x: 70, y: 27.2727 }}>
            <SequenceActor
                id="actor"
                label="Actor"
                positionX="0"
                positionY="0"
                height="1100px"
            />
            <Line
                id="lineStart"
                label="Inicio"
                positionX="-50"
                positionY="35"
                width="1000px"
            />

            <SequenceActor
                id="integrador"
                color="bg-orangeFlow"
                label="Integrador"
                positionX="200"
                positionY="0"
                height="1200px"
            />

            <SequenceActor
                id="tokenRequestor"
                color="bg-orangeFlow"
                label="Solicitante de Token"
                positionX="500"
                positionY="0"
                height="1200px"
            />

            <SequenceActor
                id="marca"
                color="bg-orangeFlow"
                label="Marca"
                positionX="800"
                positionY="0"
                height="1200px"
            />

            <SequenceAction
                id="selectCard"
                from="actor"
                to="integrador"
                message="Selecciona tarjeta <br> a enrolar"
                positionX="40"
                positionY="150"
            />

            <SequenceAction
                id="sendCard"
                from="integrador"
                to="tokenRequestor"
                message="Enviar tarjeta a enrolar"
                positionX="300"
                positionY="250"
            />

            <SequenceAction
                id="validateMerchantCard"
                from="tokenRequestor"
                to="tokenRequestor"
                message="Valida que el comercio esté activo y <br> la tarjeta lista para realizar enrolamiento"
                positionX="550"
                positionY="350"
                sourcePositionY="250"
                targetPositionY="450"
            />

            <SequenceAction
                id="identifyBrand"
                from="tokenRequestor"
                to="tokenRequestor"
                message="Identifica la marca de la tarjeta"
                positionX="550"
                positionY="450"
                sourcePositionY="350"
                targetPositionY="550"
            />

            <SequenceAction
                id="enrollCardRequest"
                from="tokenRequestor"
                to="marca"
                message="Enrolar tarjeta"
                positionX="550"
                positionY="550"
            />

            <SequenceAction
                id="deliverTokenBrand"
                from="marca"
                to="tokenRequestor"
                message="Entrega token"
                positionX="550"
                positionY="650"
            />

            <SequenceAction
                id="deliverTokenRequestor"
                from="tokenRequestor"
                to="integrador"
                message="Entrega token"
                positionX="310"
                positionY="750"
            />

            <SequenceAction
                id="storeToken"
                from="integrador"
                to="integrador"
                message="Almacena información del <br> token para futuros pagos"
                positionX="290"
                positionY="850"
                sourcePositionY="750"
                targetPositionY="950"
            />

            <SequenceAction
                id="tokenGenerated"
                from="integrador"
                to="actor"
                message="Token generado <br> exitosamente"
                positionX="60"
                positionY="960"
            />
        </SequenceDiagram>
    );
}