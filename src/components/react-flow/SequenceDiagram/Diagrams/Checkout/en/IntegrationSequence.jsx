import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram"
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor"
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction"
import Line from "@/components/react-flow/SequenceDiagram/Line"

export default function IntegrationSequence() {
  return (
    <SequenceDiagram customView={{ height:600, x:120, y:27.2727 }}>
    <SequenceActor 
    id="site" 
    color="bg-blueFlow"
    label="Your site" 
    positionX="0" 
    positionY="0" 
    height="700px" 
    />
    <Line id="line" label="Start" positionX="-100" positionY="35" width="800px" />
    <SequenceActor id="server" label="Your server" positionX="220" positionY="0" height="700px" />
    <SequenceActor id="webcheckout" color="bg-orangeFlow" label="Webcheckout" positionX="550" positionY="0" height="700px" />
    <SequenceAction 
        id="process"
        from="site" 
        to="server" 
        message="Start process" 
        positionX="55" 
        positionY="70" 
    />
    <SequenceAction 
        id="session"  
        from="server" 
        to="webcheckout" 
        message="Create checkout session" 
        positionX="300" 
        positionY="70" 
    />
    <SequenceAction 
        id="return"
        from="webcheckout" 
        to="server" 
        positionX="288" 
        positionY="160"
        message={`<span>Return checkout <b>requestId</b><br> and <b>processUrl</b></span>`} 
    />
    <SequenceAction 
        id="return_user"
        from="server" 
        to="webcheckout" 
        positionX="288" 
        positionY="230"
        message={`<span>Redirect user to <b>ProcessUrl</b></span>`} 
    />
    <SequenceAction 
        id="complete"
        from="webcheckout" 
        to="webcheckout"
        positionX="550" 
        positionY="310" 
        sourcePositionY="219"
        targetPositionY="400"
        message={`<span>User completes<br> process</span>`} 
    />
    <SequenceAction 
        id="return2"
        from="webcheckout" 
        to="server" 
        positionX="280" 
        positionY="400"
        message={`<span>Return to the <b>returnUrl</b> sent<br> in the <b>CreateSessionRequest</b></span>`} 
    />
    <Line id="lineConsulta" label="Query" positionX="-100" positionY="460" width="800px" />
    <SequenceAction 
        id="checkSession"  
        from="server" 
        to="webcheckout" 
        message="Query checkout session" 
        positionX="300" 
        positionY="500" 
    />
    <SequenceAction 
        id="statusSession"  
        from="webcheckout" 
        to="server" 
        message="Return session status" 
        positionX="305" 
        positionY="560" 
    />
    <SequenceAction 
        id="detail"  
        from="server" 
        to="site" 
        message="Process detail" 
        positionX="55" 
        positionY="560" 
    />
    <Line id="lineNotificacion" label="Notification" positionX="-100" positionY="618" width="800px" />
    <SequenceAction 
        id="notification"
        from="webcheckout" 
        to="server" 
        message="Webhook notification"
        positionX="300" 
        positionY="660" 
    />
    </SequenceDiagram>
  )
}