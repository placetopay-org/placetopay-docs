import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram";
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor";
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction";
import Line from "@/components/react-flow/SequenceDiagram/Line";

export default function EnrollSequenceEn() {
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
                label="Start"
                positionX="-50"
                positionY="35"
                width="1000px"
            />

            <SequenceActor
                id="integrator"
                color="bg-orangeFlow"
                label="Integrator"
                positionX="200"
                positionY="0"
                height="1200px"
            />

            <SequenceActor
                id="tokenRequestor"
                color="bg-orangeFlow"
                label="Token Requestor"
                positionX="500"
                positionY="0"
                height="1200px"
            />

            <SequenceActor
                id="brand"
                color="bg-orangeFlow"
                label="Brand"
                positionX="800"
                positionY="0"
                height="1200px"
            />

            <SequenceAction
                id="selectCard"
                from="actor"
                to="integrator"
                message="1. Select card <br> to enroll"
                positionX="40"
                positionY="150"
            />

            <SequenceAction
                id="sendCard"
                from="integrator"
                to="tokenRequestor"
                message="2. Send card to enroll"
                positionX="300"
                positionY="250"
            />

            <SequenceAction
                id="validateMerchantCard"
                from="tokenRequestor"
                to="tokenRequestor"
                message={`<span> 3. Validate if the merchant <br> is active and the <br> <b> card is ready for <br> enrollment </b> </span>`}
                positionX="580"
                positionY="300"
                sourcePositionY="250"
                targetPositionY="400"
            />

            <SequenceAction
                id="identifyBrand"
                from="tokenRequestor"
                to="tokenRequestor"
                message="4. Identify the card brand"
                positionX="550"
                positionY="550"
                sourcePositionY="500"
                targetPositionY="600"
            />

            <SequenceAction
                id="enrollCardRequest"
                from="tokenRequestor"
                to="brand"
                message="5. Enroll card"
                positionX="550"
                positionY="700"
            />

            <SequenceAction
                id="deliverTokenBrand"
                from="brand"
                to="tokenRequestor"
                message="6. Deliver token"
                positionX="550"
                positionY="800"
            />

            <SequenceAction
                id="deliverTokenRequestor"
                from="tokenRequestor"
                to="integrator"
                message="7. Deliver token"
                positionX="310"
                positionY="900"
            />

            <SequenceAction
                id="storeToken"
                from="integrator"
                to="integrator"
                message={`<span> 8. <b> Store token </b> <br> information for future payments</span>`}
                positionX="290"
                positionY="1060"
                sourcePositionY="1000"
                targetPositionY="1110"
            />

            <SequenceAction
                id="tokenGenerated"
                from="integrator"
                to="actor"
                message="9. Token successfully <br> generated"
                positionX="60"
                positionY="1200"
            />
        </SequenceDiagram>
    );
}
