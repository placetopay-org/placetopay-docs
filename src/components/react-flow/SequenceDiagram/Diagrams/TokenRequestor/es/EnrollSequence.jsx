import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram";
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor";
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction";
import Line from "@/components/react-flow/SequenceDiagram/Line";

export default function EnrollSequenceEs() {
    return (
        <SequenceDiagram customView={{ height: 1200, x: 70, y: 27.2727 }}>
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
                message="1. Selecciona tarjeta <br> a enrolar"
                positionX="40"
                positionY="150"
            />

            <SequenceAction
                id="sendCard"
                from="integrador"
                to="tokenRequestor"
                message="2. Enviar tarjeta a enrolar"
                positionX="300"
                positionY="250"
            />

            <SequenceAction
                id="validateMerchantCard"
                from="tokenRequestor"
                to="tokenRequestor"
                message={`<span> 3. Valida que el comercio <br> esté activo y la<br> <b> tarjeta lista para realizar <br> enrolamiento </b> </span>`}
                positionX="580"
                positionY="300"
                sourcePositionY="250"
                targetPositionY="400"
            />

            <SequenceAction
                id="identifyBrand"
                from="tokenRequestor"
                to="tokenRequestor"
                message="4. Identifica la marca de la tarjeta"
                positionX="550"
                positionY="550"
                sourcePositionY="500"
                targetPositionY="600"
            />

            <SequenceAction
                id="enrollCardRequest"
                from="tokenRequestor"
                to="marca"
                message="5. Enrolar tarjeta"
                positionX="550"
                positionY="700"
            />

            <SequenceAction
                id="deliverTokenBrand"
                from="marca"
                to="tokenRequestor"
                message="6. Entrega token"
                positionX="550"
                positionY="800"
            />

            <SequenceAction
                id="deliverTokenRequestor"
                from="tokenRequestor"
                to="integrador"
                message="7. Entrega token"
                positionX="310"
                positionY="900"
            />

            <SequenceAction
                id="storeToken"
                from="integrador"
                to="integrador"
                message={`<span> 8. <b> Almacena información </b> <br> del token para futuros pagos</span>`}
                positionX="290"
                positionY="1060"
                sourcePositionY="1000"
                targetPositionY="1110"
            />

            <SequenceAction
                id="tokenGenerated"
                from="integrador"
                to="actor"
                message="9. Token generado <br> exitosamente"
                positionX="60"
                positionY="1200"
            />
        </SequenceDiagram>
    );
}