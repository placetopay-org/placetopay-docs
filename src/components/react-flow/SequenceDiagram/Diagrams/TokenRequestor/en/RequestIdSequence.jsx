import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram";
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor";
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction";
import Line from "@/components/react-flow/SequenceDiagram/Line";

export default function RequestIdSequenceEn() {
    return (
        <SequenceDiagram customView={{ height: 400, x: 100, y: 27.2727 }}>
            <SequenceActor id="consumer" label="Consumer" positionX="0" positionY="0" height="400px" />
            <SequenceActor id="system" label="System (Request Id/Token Requestor)" positionX="300" positionY="0" height="400px" color="bg-blueFlow" />

            <Line id="lineStart" label="Start" positionX="50" positionY="35" width="400px" />

            <SequenceAction
                id="initEnrollment"
                from="consumer"
                to="system"
                message="1. Initiate Enrollment"
                positionX="150"
                positionY="70"
            />

            <SequenceAction
                id="sendRequestId"
                from="consumer"
                to="system"
                message="2. Send Request (Request Id)"
                positionX="150"
                positionY="130"
            />

            <SequenceAction
                id="processRequest"
                from="system"
                to="system"
                message="3. Validate Request and Enroll Card (Internally)"
                positionX="300"
                positionY="190"
                sourcePositionY="130"
                targetPositionY="250"
            />

            <SequenceAction
                id="deliverToken"
                from="system"
                to="consumer"
                message="4. Deliver Token"
                positionX="150"
                positionY="250"
            />
        </SequenceDiagram>
    );
}