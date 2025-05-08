import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram";
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor";
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction";
import Line from "@/components/react-flow/SequenceDiagram/Line";

export default function ActionWithTokenSequenceEn() {
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
                    id="integrator"
                    color="bg-orangeFlow"
                    label="Integrator"
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
                    label="Brand"
                    positionX="550"
                    positionY="0"
                    height="450px"
                />

                <SequenceAction
                    id="selectEnrolledCard"
                    from="actor"
                    to="integrator"
                    message="Select enrolled card (Token)"
                    positionX="75"
                    positionY="70"
                />

                <SequenceAction
                    id="sendToken"
                    from="integrator"
                    to="tokenRequestor"
                    message="Send Token"
                    positionX="250"
                    positionY="110"
                />

                <SequenceAction
                    id="validateMerchantActive"
                    from="tokenRequestor"
                    to="tokenRequestor"
                    message="Validate merchant is active"
                    positionX="350"
                    positionY="150"
                    sourcePositionY="110"
                    targetPositionY="190"
                />

                <SequenceAction
                    id="validateTokenActive"
                    from="tokenRequestor"
                    to="tokenRequestor"
                    message="Validate token belongs and is active with the brand"
                    positionX="350"
                    positionY="190"
                    sourcePositionY="150"
                    targetPositionY="230"
                />

                <SequenceAction
                    id="generateCryptogramRequest"
                    from="tokenRequestor"
                    to="brand"
                    message="Generate cryptogram"
                    positionX="450"
                    positionY="230"
                />

                <SequenceAction
                    id="deliverCryptogramBrand"
                    from="brand"
                    to="tokenRequestor"
                    message="Deliver cryptogram"
                    positionX="438"
                    positionY="270"
                />

                <SequenceAction
                    id="deliverCryptogramRequestor"
                    from="tokenRequestor"
                    to="integrator"
                    message="Deliver cryptogram"
                    positionX="250"
                    positionY="310"
                />

                <SequenceAction
                    id="performAction"
                    from="integrator"
                    to="integrator"
                    message="Perform action with the generated cryptogram"
                    positionX="150"
                    positionY="350"
                    sourcePositionY="310"
                    targetPositionY="390"
                />

                <SequenceAction
                    id="actionSuccess"
                    from="integrator"
                    to="actor"
                    message="Action performed successfully"
                    positionX="75"
                    positionY="390"
                />
          </SequenceDiagram>
      );
}