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
                id="integrador"
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
                to="integrador"
                message="Select <br> enrolled card (Token)"
                positionX={100}
                positionY={170}
            />

            <SequenceAction
                id="sendToken"
                from="integrador"
                to="tokenRequestor"
                message="Send Token"
                positionX={350}
                positionY={350}
            />

            <SequenceAction
                id="validateMerchantActive"
                from="tokenRequestor"
                to="tokenRequestor"
                message="Validate that the merchant is active"
                positionX={550}
                positionY={500}
                sourcePositionY={350}
                targetPositionY={650}
            />
            <SequenceAction
                id="validateTokenActive"
                from="tokenRequestor"
                to="tokenRequestor"
                message="Validate that the token belongs to it <br> and is active with the brand"
                positionX={550}
                positionY={650}
                sourcePositionY={500}
                targetPositionY={790}
            />

            <SequenceAction
                id="generateCryptogramRequest"
                from="tokenRequestor"
                to="brand"
                message="Generate cryptogram"
                positionX={550}
                positionY={800}
            />

            <SequenceAction
                id="deliverCryptogramBrand"
                from="brand"
                to="tokenRequestor"
                message="Deliver cryptogram"
                positionX={550}
                positionY={950}
            />

            <SequenceAction
                id="deliverCryptogramRequestor"
                from="tokenRequestor"
                to="integrador"
                message="Deliver cryptogram"
                positionX={320}
                positionY={1100}
            />

            <SequenceAction
                id="performAction"
                from="integrador"
                to="integrador"
                message="Perform action with <br> the generated cryptogram"
                positionX={310}
                positionY={1250}
                sourcePositionY={1100}
                targetPositionY={1390}
            />

            <SequenceAction
                id="actionSuccess"
                from="integrador"
                to="actor"
                message="Action performed <br> successfully"
                positionX={400 - 300}
                positionY={1400}
            />
        </SequenceDiagram>
    );
}