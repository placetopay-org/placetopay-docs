import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram";
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor";
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction";
import Line from "@/components/react-flow/SequenceDiagram/Line";

export default function TokenizationByMerchantSequenceEs() {
        return (
            <SequenceDiagram customView={{ height: 600, x: 50, y: 27.2727 }}>
                    <SequenceActor id="comercio" label=":Comercio" positionX="0" positionY="0" height="600px" color="bg-blueFlow" />
                    <SequenceActor id="core" label=":CORE Services Placetopay" positionX="250" positionY="0" height="600px" color="bg-blueFlow" />
                    <SequenceActor id="vts" label=":VTS" positionX="500" positionY="0" height="600px" color="bg-blueFlow" />
                    <SequenceActor id="issuer" label=":Issuer" positionX="750" positionY="0" height="600px" color="bg-orangeFlow" />

                    <Line id="lineStart" label="Inicio" positionX="-50" positionY="35" width="850px" />

                    <SequenceAction
                        id="consultPan"
                        from="comercio"
                        to="core"
                        message="1. Consultar token PAN/Tarjeta BD"
                        positionX="125"
                        positionY="70"
                    />

                    <Line id="optStart" label="opt" positionX="-20" positionY="100" width="800px" />

                    <Line id="loopStart" label="loop" positionX="0" positionY="130" width="780px" />

                    <SequenceAction
                        id="createProvisioningProcess"
                        from="comercio"
                        to="core"
                        message="2. Crear proceso aprovisionamiento del token"
                        positionX="125"
                        positionY="170"
                    />

                    <SequenceAction
                        id="useEnrollPan"
                        from="core"
                        to="vts"
                        message="3. Usar Enroll PAN Microservicio de Placetopay tokenization request"
                        positionX="375"
                        positionY="210"
                    />

                    <SequenceAction
                        id="validatePan"
                        from="vts"
                        to="issuer"
                        message="4. Validar PAN/tarjeta para aprovisionamiento"
                        positionX="625"
                        positionY="250"
                    />

                    <SequenceAction
                        id="returnValidatedPan"
                        from="issuer"
                        to="vts"
                        message="5. Retornar PAN validada"
                        positionX="613"
                        positionY="290"
                    />

                    <SequenceAction
                        id="provisionTokenVts"
                        from="vts"
                        to="vts"
                        message="6. Provision Token[]"
                        positionX="500"
                        positionY="330"
                        sourcePositionY="290"
                        targetPositionY="370"
                    />

                    <SequenceAction
                        id="returnTokenInfo"
                        from="vts"
                        to="core"
                        message="7. Retornar información del token"
                        positionX="363"
                        positionY="370"
                    />

                    <SequenceAction
                        id="relateTokenWithPlacetopay"
                        from="core"
                        to="comercio"
                        message="8. Relacionar token marca con Placetopay"
                        positionX="125"
                        positionY="410"
                    />

                    <SequenceAction
                        id="provisionTokenCommerce"
                        from="core"
                        to="comercio"
                        message="9. Provisionar el token (respuesta Placetopay)"
                        positionX="125"
                        positionY="450"
                    />

                    <SequenceAction
                        id="eliminatePanAndStoreToken"
                        from="comercio"
                        to="comercio"
                        message="10. Eliminar PAN/tarjeta y almacenar token"
                        positionX="125"
                        positionY="490"
                        sourcePositionY="450"
                        targetPositionY="530"
                    />

                    <Line id="loopEnd" positionX="0" positionY="520" width="780px" />
                    <Line id="optEnd" positionX="-20" positionY="550" width="800px" />

            </SequenceDiagram>
        );
}