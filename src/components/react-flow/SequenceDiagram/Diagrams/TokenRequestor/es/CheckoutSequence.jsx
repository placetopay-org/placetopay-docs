import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram";
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor";
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction";
import Line from "@/components/react-flow/SequenceDiagram/Line";

export default function ActionWithTokenSequenceEs() {
    return (
      <SequenceDiagram customView={{ height: 1200, x: 70, y: 27.2727 }}>
        <SequenceActor
          id="actor"
          label="Actor"
          positionX="80"
          positionY="0"
          height="1500px"
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
          positionX="300"
          positionY="0"
          height="1000px"
        />

        <SequenceActor
          id="tokenRequestor"
          color="bg-orangeFlow"
          label="Solicitante de Token"
          positionX="500"
          positionY="0"
          height="1500px"
        />

        <SequenceActor
          id="brand"
          label="Marca"
          positionX="850"
          positionY="0"
          height="1500px"
        />

        <SequenceAction
          id="selectEnrolledCard"
          from="actor"
          to="integrador"
          message="1. Seleccionar <br> tarjeta inscrita <span>Token</span>"
          positionX="100"
          positionY="170"
        />

        <SequenceAction
          id="sendToken"
          from="integrador"
          to="tokenRequestor"
          message="2. Enviar Token"
          positionX="350"
          positionY="350"
        />

        <SequenceAction
          id="validateMerchantActive"
          from="tokenRequestor"
          to="tokenRequestor"
          message="3. Validar que el comercio esté activo"
          positionX="550"
          positionY="500"
          sourcePositionY="350"
          targetPositionY="650"
        />
        <SequenceAction
          id="validateTokenActive"
          from="tokenRequestor"
          to="tokenRequestor"
          message="4. Validar que el token le pertenece <br> y está activo con la marca"
          positionX="550"
          positionY="650"
          sourcePositionY="500"
          targetPositionY="790"
        />

        <SequenceAction
          id="generateCryptogramRequest"
          from="tokenRequestor"
          to="brand"
          message="5. Generar criptograma"
          positionX="550"
          positionY="800"
        />

        <SequenceAction
          id="deliverCryptogramBrand"
          from="brand"
          to="tokenRequestor"
          message="6. Entregar criptograma"
          positionX="550"
          positionY="950"
        />

        <SequenceAction
          id="deliverCryptogramRequestor"
          from="tokenRequestor"
          to="integrador"
          message="7. Entregar criptograma"
          positionX="320"
          positionY="1100"
        />

        <SequenceAction
          id="performAction"
          from="integrador"
          to="integrador"
          message={`8. <span> Realizar acción con el<br> <b> criptograma generado </b> </span>`}
          positionX="310"
          positionY="1250"
          sourcePositionY="1100"
          targetPositionY="1390"
        />

        <SequenceAction
          id="actionSuccess"
          from="integrador"
          to="actor"
          message="9. Acción realizada <br> exitosamente"
          positionX={400 - 300}
          positionY="1400"
        />
      </SequenceDiagram>
    );
}
