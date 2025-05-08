import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram";
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor";
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction";
import Line from "@/components/react-flow/SequenceDiagram/Line";

export default function EnrollSequenceEn() {
      return (
          <SequenceDiagram customView={{ height: 400, x: 50, y: 27.2727 }}>
                <SequenceActor
                    id="actor"
                    label="Actor"
                    positionX="0"
                    positionY="0"
                    height="400px"
                />
                <Line id="lineStart" label="Start" positionX="-50" positionY="35" width="600px" />

                <SequenceActor
                    id="integrator"
                    color="bg-orangeFlow"
                    label="Integrator"
                    positionX="150"
                    positionY="0"
                    height="400px"
                />

                <SequenceActor
                    id="tokenRequestor"
                    color="bg-orangeFlow"
                    label="Token Requestor"
                    positionX="350"
                    positionY="0"
                    height="400px"
                />

                <SequenceActor
                    id="brand"
                    color="bg-orangeFlow"
                    label="Brand"
                    positionX="550"
                    positionY="0"
                    height="400px"
                />

                <SequenceAction
                    id="selectCard"
                    from="actor"
                    to="integrator"
                    message="Select card to enroll"
                    positionX="75"
                    positionY="70"
                />

                <SequenceAction
                    id="sendCard"
                    from="integrator"
                    to="tokenRequestor"
                    message="Send card to enroll"
                    positionX="250"
                    positionY="110"
                />

                <SequenceAction
                    id="validateMerchantCard"
                    from="tokenRequestor"
                    to="tokenRequestor"
                    message="Validate merchant is active and card ready for enrollment"
                    positionX="350"
                    positionY="150"
                    sourcePositionY="110"
                    targetPositionY="190"
                />

                <SequenceAction
                    id="identifyBrand"
                    from="tokenRequestor"
                    to="tokenRequestor"
                    message="Identify card brand"
                    positionX="350"
                    positionY="190"
                    sourcePositionY="150"
                    targetPositionY="230"
                />

                <SequenceAction
                    id="enrollCardRequest"
                    from="tokenRequestor"
                    to="brand"
                    message="Enroll card"
                    positionX="450"
                    positionY="230"
                />

                <SequenceAction
                    id="deliverTokenBrand"
                    from="brand"
                    to="tokenRequestor"
                    message="Deliver token"
                    positionX="438"
                    positionY="270"
                />

                <SequenceAction
                    id="deliverTokenRequestor"
                    from="tokenRequestor"
                    to="integrator"
                    message="Deliver token"
                    positionX="250"
                    positionY="310"
                />

                <SequenceAction
                    id="storeToken"
                    from="integrator"
                    to="integrator"
                    message="Store token information for future payments"
                    positionX="150"
                    positionY="350"
                    sourcePositionY="310"
                    targetPositionY="390"
                />

                <SequenceAction
                    id="tokenGenerated"
                    from="integrator"
                    to="actor"
                    message="Token generated successfully"
                    positionX="75"
                    positionY="390"
                />
          </SequenceDiagram>
      );
}