import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram";
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor";
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction";
import Line from "@/components/react-flow/SequenceDiagram/Line";

export default function TokenizationByMerchantSequenceEn() {
return (
    <SequenceDiagram customView={{ height: 1000, x: 70, y: 27.2727 }}>
        <SequenceActor
            id="merchant"
            label=":Merchant"
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
            label="Start"
            positionX="-50"
            positionY="35"
            width="900px"
        />

        <SequenceAction
            id="consultPan"
            from="merchant"
            to="core"
            message="1. Consult token PAN/Card DB"
            positionX="80"
            positionY="100"
        />

        <Line
            id="optStart"
            label="opt"
            positionX="-20"
            positionY="150"
            width="900px"
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
            from="merchant"
            to="core"
            message="2. Create provisioning <br> process for the token"
            positionX="100"
            positionY="250"
        />

        <SequenceAction
            id="useEnrollPan"
            from="core"
            to="vts"
            message="3. Use Enroll"
            positionX="400"
            positionY="350"
        />

        <SequenceAction
            id="validatePan"
            from="vts"
            to="issuer"
            message="4. Validate PAN for <br> provisioning"
            positionX="620"
            positionY="450"
        />

        <SequenceAction
            id="returnValidatedPan"
            from="issuer"
            to="vts"
            message="5. Return validated PAN"
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
            message="7. Return token <br> information"
            positionX="400"
            positionY="750"
        />

        <SequenceAction
            id="relateTokenWithPlacetopay"
            from="core"
            to="merchant"
            message="8. Link brand token <br> with Placetopay"
            positionX="150"
            positionY="850"
        />

        <SequenceAction
            id="provisionTokenCommerce"
            from="core"
            to="merchant"
            message="9. Provision the token <br> (Placetopay response)"
            positionX="150"
            positionY="950"
        />

        <SequenceAction
            id="eliminatePanAndStoreToken"
            from="merchant"
            to="merchant"
            message="10. Delete PAN/card <br> and store token"
            positionX="150"
            positionY="1050"
            sourcePositionY="950"
            targetPositionY="1150"
        />

        <Line
            id="loopEnd"
            positionX="0"
            positionY="1100"
            width="900px"
        />

        <Line
            id="optEnd"
            positionX="-20"
            positionY="1150"
            width="900px"
        />

    </SequenceDiagram>
);
}
