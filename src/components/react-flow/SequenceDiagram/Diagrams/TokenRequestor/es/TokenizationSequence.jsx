import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram";
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor";
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction";
import Line from "@/components/react-flow/SequenceDiagram/Line";

export default function TokenizationByMerchantSequenceEs() {
    return (
        <SequenceDiagram customView={{ height: 1000, x: 70, y: 27.2727 }}>
            <SequenceActor
                id="comercio"
                label=":Comercio"
                positionX="0"
                positionY="0"
                height="1000px"
                color="bg-blueFlow"
            />

            <SequenceActor
                id="core"
                label=":CORE Services Placetopay"
                positionX="350"
                positionY="0"
                height="1000px"
                color="bg-blueFlow"
            />

            <SequenceActor
                id="vts"
                label=":VTS"
                positionX="600"
                positionY="0"
                height="1000px"
                color="bg-blueFlow"
            />

            <SequenceActor
                id="issuer"
                label=":Issuer"
                positionX="800"
                positionY="0"
                height="1000px"
                color="bg-orangeFlow"
            />

            <Line
                id="lineStart"
                label="Inicio"
                positionX="-50"
                positionY="35"
                width="1150px"
            />

            <SequenceAction
                id="consultPan"
                from="comercio"
                to="core"
                message={`<span> 1. Consultar token <b> PAN BD </b> </span>`}
                positionX="80"
                positionY="100"
            />

            <Line
                id="optStart"
                label="opt"
                positionX="-20"
                positionY="150"
                width="1100px"
            />

            <Line
                id="loopStart"
                label="loop"
                positionX="0"
                positionY="200"
                width="1080px"
            />

            <SequenceAction
                id="createProvisioningProcess"
                from="comercio"
                to="core"
                message="2. Crear proceso <br> aprovisionamiento del token"
                positionX="100"
                positionY="250"
            />

            <SequenceAction
                id="useEnrollPan"
                from="core"
                to="vts"
                message="3. Usar Enroll"
                positionX="400"
                positionY="350"
            />

            <SequenceAction
                id="validatePan"
                from="vts"
                to="issuer"
                message="4. Validar PAN para <br> aprovisionamiento"
                positionX="620"
                positionY="450"
            />

            <SequenceAction
                id="returnValidatedPan"
                from="issuer"
                to="vts"
                message="5. Retornar PAN validada"
                positionX="620"
                positionY="550"
            />

            <SequenceAction
                id="provisionTokenVts"
                from="vts"
                to="vts"
                message="6. Provision Token[]"
                positionX="620"
                positionY="650"
                sourcePositionY="550"
                targetPositionY="750"
            />

            <SequenceAction
                id="returnTokenInfo"
                from="vts"
                to="core"
                message="7. Retornar información <br> del token"
                positionX="400"
                positionY="750"
            />

            <SequenceAction
                id="relateTokenWithPlacetopay"
                from="core"
                to="comercio"
                message="8. Relacionar token <br> marca con Placetopay"
                positionX="150"
                positionY="850"
            />

            <SequenceAction
                id="provisionTokenCommerce"
                from="core"
                to="comercio"
                message={`<span> 9. Provisionar el token <br> <b> respuesta Placetopay </b> </span>`}
                positionX="150"
                positionY="950"
            />

            <SequenceAction
                id="eliminatePanAndStoreToken"
                from="comercio"
                to="comercio"
                message="10. Eliminar PAN <br> y almacenar token"
                positionX="150"
                positionY="1050"
                sourcePositionY="950"
                targetPositionY="1150"
            />

            <Line
                id="loopEnd"
                positionX="0"
                positionY="1100"
                width="1080px"
            />

            <Line
                id="optEnd"
                positionX="-20"
                positionY="1150"
                width="1100px"
            />

        </SequenceDiagram>
    );
}