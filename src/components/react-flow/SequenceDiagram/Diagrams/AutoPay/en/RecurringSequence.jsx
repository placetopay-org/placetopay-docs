import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram"
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor"
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction"
import Line from "@/components/react-flow/SequenceDiagram/Line"

export default function RecurringSequence() {
        return (
            <SequenceDiagram customView={{ height: 500, x: 150, y: 0 }}>
                    {/* Actors: The Engine and the Data */}
                    <SequenceActor
                        id="scheduler"
                        label="Engine (Scheduler)"
                        positionX="0"
                        positionY="0"
                        height="600px"
                    />
                    <SequenceActor
                        id="entity"
                        label="Rule (Subscription)"
                        color="bg-blueFlow"
                        positionX="300"
                        positionY="0"
                        height="600px"
                    />

                    {/* Step 1: Trigger */}
                    <Line id="lineStart" label="Successful Charge Detected" positionX="-80" positionY="40" width="600px" />

                    <SequenceAction
                        id="calc_request"
                        from="scheduler"
                        to="entity"
                        message="Calculate Next Date"
                        positionX="20"
                        positionY="70"
                    />

                    {/* Step 2: Math Calculation */}
                    <SequenceAction
                        id="math_logic"
                        from="entity"
                        to="entity"
                        message="Date = Current + (Interval * Period)"
                        positionX="300"
                        positionY="130"
                        sourcePositionY="130"
                        targetPositionY="180"
                    />

                    {/* Step 3: Validation */}
                    <Line id="lineCheck" label="Validity Check" positionX="-80" positionY="220" width="600px" />

                    <SequenceAction
                        id="check_duedate"
                        from="entity"
                        to="entity"
                        message="New Date <= DueDate?"
                        positionX="300"
                        positionY="260"
                        sourcePositionY="260"
                        targetPositionY="310"
                    />

                    {/* Result A: Valid Date */}
                    <SequenceAction
                        id="update_next"
                        from="entity"
                        to="scheduler"
                        message="OK: Update nextPayment"
                        positionX="20"
                        positionY="360"
                        isDotted
                    />

                    {/* Result B: Expired (Optional visually to avoid clutter) */}

            </SequenceDiagram>
        )
}