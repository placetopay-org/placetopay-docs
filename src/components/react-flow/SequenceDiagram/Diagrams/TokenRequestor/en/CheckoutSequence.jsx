import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram";
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor";
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction";
import Line from "@/components/react-flow/SequenceDiagram/Line";

export default function ActionWithTokenSequenceEn() {
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
                label="Start"
                positionX="-50"
                positionY="35"
                width="1000px"
            />

            <SequenceActor
                id="integrator"
                color="bg-orangeFlow"
                label="Integrator"
                positionX="300"
                positionY="0"
                height="1000px"
            />

            <SequenceActor
                id="tokenRequestor"
                color="bg-orangeFlow"
                label="Token Requestor"
                positionX="500"
                positionY="0"
                height="1500px"
            />

            <SequenceActor
                id="brand"
                label="Brand"
                positionX="850"
                positionY="0"
                height="1500px"
            />

            <SequenceAction
                id="selectEnrolledCard"
                from="actor"
                to="integrator"
                message="1. Select <br> enrolled card <span>Token</span>"
                positionX="100"
                positionY="170"
            />

            <SequenceAction
                id="sendToken"
                from="integrator"
                to="tokenRequestor"
                message="2. Send Token"
                positionX="350"
                positionY="350"
            />

            <SequenceAction
                id="validateMerchantActive"
                from="tokenRequestor"
                to="tokenRequestor"
                message="3. Validate that the merchant is active"
                positionX="550"
                positionY="450"
                sourcePositionY="350"
                targetPositionY="550"
            />
            <SequenceAction
                id="validateTokenActive"
                from="tokenRequestor"
                to="tokenRequestor"
                message="4. Validate that the token belongs to them <br> and is active with the brand"
                positionX="550"
                positionY="650"
                sourcePositionY="550"
                targetPositionY="740"
            />

            <SequenceAction
                id="generateCryptogramRequest"
                from="tokenRequestor"
                to="brand"
                message="5. Generate cryptogram"
                positionX="550"
                positionY="850"
            />

            <SequenceAction
                id="deliverCryptogramBrand"
                from="brand"
                to="tokenRequestor"
                message="6. Deliver cryptogram"
                positionX="550"
                positionY="970"
            />

            <SequenceAction
                id="deliverCryptogramRequestor"
                from="tokenRequestor"
                to="integrator"
                message="7. Deliver cryptogram"
                positionX="320"
                positionY="1090"
            />

            <SequenceAction
                id="performAction"
                from="integrator"
                to="integrator"
                message={`8. <span> Perform action with the<br> <b> generated cryptogram </b> </span>`}
                positionX="320"
                positionY="1230"
                sourcePositionY="1160"
                targetPositionY="1300"
            />

            <SequenceAction
                id="actionSuccess"
                from="integrator"
                to="actor"
                message="9. Action performed <br> successfully"
                positionX={400 - 300}
                positionY="1400"
            />
        </SequenceDiagram>
    );
}
