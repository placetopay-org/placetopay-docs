import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram";
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor";
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction";
import Line from "@/components/react-flow/SequenceDiagram/Line";

export default function EnrollSequenceEs() {
  return (
      <SequenceDiagram customView={{ height: 400, x: 50, y: 27.2727 }}>
        <SequenceActor
            id="actor"
            label="Actor"
            positionX="0"
            positionY="0"
            height="400px"
        />
        <Line id="lineStart" label="Inicio" positionX="-50" positionY="35" width="600px" />

        <SequenceActor
            id="integrador"
            color="bg-orangeFlow"
            label="Integrador"
            positionX="150"
            positionY="0"
            height="400px"
        />

        <SequenceActor
            id="tokenRequestor"
            color="bg-orangeFlow"
            label="Solicitante de Token"
            positionX="350"
            positionY="0"
            height="400px"
        />

        <SequenceActor
            id="marca"
            color="bg-orangeFlow"
            label="Marca"
            positionX="550"
            positionY="0"
            height="400px"
        />

        <SequenceAction
            id="selectCard"
            from="actor"
            to="integrador"
            message="Selecciona tarjeta a enrolar"
            positionX="75"
            positionY="70"
        />

        <SequenceAction
            id="sendCard"
            from="integrador"
            to="tokenRequestor"
            message="Enviar tarjeta a enrolar"
            positionX="250"
            positionY="110"
        />

        <SequenceAction
            id="validateMerchantCard"
            from="tokenRequestor"
            to="tokenRequestor"
            message="Valida que el comercio esté activo y la tarjeta lista para realizar enrolamiento"
            positionX="350"
            positionY="150"
            sourcePositionY="110"
            targetPositionY="190"
        />

        <SequenceAction
            id="identifyBrand"
            from="tokenRequestor"
            to="tokenRequestor"
            message="Identifica la marca de la tarjeta"
            positionX="350"
            positionY="190"
            sourcePositionY="150"
            targetPositionY="230"
        />

        <SequenceAction
            id="enrollCardRequest"
            from="tokenRequestor"
            to="marca"
            message="Enrolar tarjeta"
            positionX="450"
            positionY="230"
        />

        <SequenceAction
            id="deliverTokenBrand"
            from="marca"
            to="tokenRequestor"
            message="Entrega token"
            positionX="438"
            positionY="270"
        />

        <SequenceAction
            id="deliverTokenRequestor"
            from="tokenRequestor"
            to="integrador"
            message="Entrega token"
            positionX="250"
            positionY="310"
        />

        <SequenceAction
            id="storeToken"
            from="integrador"
            to="integrador"
            message="Almacena información del token para futuros pagos"
            positionX="150"
            positionY="350"
            sourcePositionY="310"
            targetPositionY="390"
        />

        <SequenceAction
            id="tokenGenerated"
            from="integrador"
            to="actor"
            message="Token generado exitosamente"
            positionX="75"
            positionY="390"
        />
      </SequenceDiagram>
  );
}