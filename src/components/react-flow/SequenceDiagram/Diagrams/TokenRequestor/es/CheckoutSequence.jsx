import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram";
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor";
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction";
import Line from "@/components/react-flow/SequenceDiagram/Line";

export default function ActionWithTokenSequenceEs() {
      return (
          <SequenceDiagram customView={{ height: 450, x: 50, y: 27.2727 }}>
                <SequenceActor
                    id="actor"
                    label="Actor"
                    positionX="0"
                    positionY="0"
                    height="450px"
                />
                <Line id="lineStart" label="Start" positionX="-50" positionY="35" width="600px" />

                <SequenceActor
                    id="integrador"
                    color="bg-orangeFlow"
                    label="Integrador"
                    positionX="150"
                    positionY="0"
                    height="450px"
                />

                <SequenceActor
                    id="tokenRequestor"
                    color="bg-orangeFlow"
                    label="Token Requestor"
                    positionX="350"
                    positionY="0"
                    height="450px"
                />

                <SequenceActor
                    id="brand"
                    color="bg-orangeFlow"
                    label="Marca"
                    positionX="550"
                    positionY="0"
                    height="450px"
                />

                <SequenceAction
                    id="selectEnrolledCard"
                    from="actor"
                    to="integrador"
                    message="Selecciona tarjeta enrolada (Token)"
                    positionX="75"
                    positionY="70"
                />

                <SequenceAction
                    id="sendToken"
                    from="integrador"
                    to="tokenRequestor"
                    message="Envía Token"
                    positionX="250"
                    positionY="110"
                />

                <SequenceAction
                    id="validateMerchantActive"
                    from="tokenRequestor"
                    to="tokenRequestor"
                    message="Valida que el comercio esté activo"
                    positionX="350"
                    positionY="150"
                    sourcePositionY="110"
                    targetPositionY="190"
                />

                <SequenceAction
                    id="validateTokenActive"
                    from="tokenRequestor"
                    to="tokenRequestor"
                    message="Valida que el token le pertenezca y esté activo ante la marca"
                    positionX="350"
                    positionY="190"
                    sourcePositionY="150"
                    targetPositionY="230"
                />

                <SequenceAction
                    id="generateCryptogramRequest"
                    from="tokenRequestor"
                    to="brand"
                    message="Generar criptograma"
                    positionX="450"
                    positionY="230"
                />

                <SequenceAction
                    id="deliverCryptogramBrand"
                    from="brand"
                    to="tokenRequestor"
                    message="Entrega criptograma"
                    positionX="438"
                    positionY="270"
                />

                <SequenceAction
                    id="deliverCryptogramRequestor"
                    from="tokenRequestor"
                    to="integrador"
                    message="Entrega criptograma"
                    positionX="250"
                    positionY="310"
                />

                <SequenceAction
                    id="performAction"
                    from="integrador"
                    to="integrador"
                    message="Realiza acción con el criptograma generado"
                    positionX="150"
                    positionY="350"
                    sourcePositionY="310"
                    targetPositionY="390"
                />

                <SequenceAction
                    id="actionSuccess"
                    from="integrador"
                    to="actor"
                    message="Acción realizada exitosamente"
                    positionX="75"
                    positionY="390"
                />
          </SequenceDiagram>
      );
}