import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram"
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor"
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction"
import Line from "@/components/react-flow/SequenceDiagram/Line"

export default function AutoPaySequence() {
      return (
          <SequenceDiagram customView={{ height: 750, x: 100, y: 0 }}>
                {/* Actors */}
                <SequenceActor
                    id="user"
                    label="User"
                    positionX="0"
                    positionY="0"
                    height="850px"
                />
                <SequenceActor
                    id="server"
                    label="Your Server"
                    positionX="200"
                    positionY="0"
                    height="850px"
                />
                <SequenceActor
                    id="gateway"
                    color="bg-orangeFlow"
                    label="Gateway"
                    positionX="450"
                    positionY="0"
                    height="850px"
                />
                <SequenceActor
                    id="webcheckout"
                    color="bg-blueFlow"
                    label="WebCheckout"
                    positionX="700"
                    positionY="0"
                    height="850px"
                />

                {/* Phase 1: Setup */}
                <Line id="lineSetup" label="Phase 1: Setup" positionX="-80" positionY="40" width="900px" />

                <SequenceAction
                    id="req_session"
                    from="server"
                    to="gateway"
                    message="POST /autopay/session"
                    positionX="220"
                    positionY="70"
                />
                <SequenceAction
                    id="res_session"
                    from="gateway"
                    to="server"
                    message="Returns processUrl"
                    positionX="220"
                    positionY="130"
                    isDotted
                />

                {/* Phase 2: Capture */}
                <Line id="lineCapture" label="Phase 2: Capture" positionX="-80" positionY="190" width="900px" />

                <SequenceAction
                    id="redirect_user"
                    from="server"
                    to="user"
                    message="Redirect to WebCheckout"
                    positionX="20"
                    positionY="220"
                />
                <SequenceAction
                    id="user_interact"
                    from="user"
                    to="webcheckout"
                    message="Enters Data / Accepts"
                    positionX="20"
                    positionY="280"
                    sourcePositionY="280"
                    targetPositionY="350"
                />
                <SequenceAction
                    id="internal_token"
                    from="webcheckout"
                    to="gateway"
                    message="Internal Tokenization"
                    positionX="500"
                    positionY="340"
                />

                {/* Phase 3: Confirmation */}
                <Line id="lineConfirm" label="Phase 3: Confirmation" positionX="-80" positionY="420" width="900px" />

                <SequenceAction
                    id="return_merchant"
                    from="webcheckout"
                    to="server"
                    message="Return to returnUrl"
                    positionX="250"
                    positionY="460"
                />
                <SequenceAction
                    id="query_status"
                    from="server"
                    to="gateway"
                    message="Query Status (requestId)"
                    positionX="220"
                    positionY="520"
                />
                <SequenceAction
                    id="res_status"
                    from="gateway"
                    to="server"
                    message="Status: APPROVED"
                    positionX="220"
                    positionY="580"
                    isDotted
                />

                {/* Phase 4: Future Execution */}
                <Line id="lineFuture" label="Phase 4: Future Execution" positionX="-80" positionY="640" width="900px" />

                <SequenceAction
                    id="webhook"
                    from="gateway"
                    to="server"
                    message="Webhook: Charge Executed"
                    positionX="220"
                    positionY="690"
                />

          </SequenceDiagram>
      )
}