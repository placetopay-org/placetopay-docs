import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram"
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor"
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction"

export default function ManualValidationSequence() {
  return (
    <SequenceDiagram customView={{ height:750, x:150, y:27.2727, zoom: 0.55 }}> 
    <SequenceActor id="actor" color="bg-blueFlow" label="Actor" positionX="-60" positionY="0" height="1250px" />
    <SequenceActor id="merchant" label="Merchant" positionX="180" positionY="0" height="1250px" />
    <SequenceActor id="api_scudo" color="bg-orangeFlow" label="API Scudo" positionX="600" positionY="0" height="1250px" />
    <SequenceActor id="placetopay" color="bg-yellow-500" label="Placetopay transactional security" positionX="820" positionY="0" height="1250px" />
    <SequenceAction 
        id="action1"
        from="actor" 
        to="merchant" 
        message="1. Enter payment data" 
        positionX="-17" 
        positionY="70" 
    />
    <SequenceAction 
        id="action2"
        from="actor" 
        to="merchant" 
        message="2. Select pay" 
        positionX="8" 
        positionY="120" 
    />
    <SequenceAction 
        id="action3"
        from="merchant" 
        to="api_scudo" 
        message={`<span>3. Request: Post/validate/header {locale,payer,<br> buyer, shipping, payment, instrument, ip_address}</span>`} 
        positionX="225" 
        positionY="170" 
    />
    <SequenceAction 
        id="action4"
        from="api_scudo" 
        to="api_scudo"
        positionX="620" 
        positionY="260" 
        selfAction="true"
        sourcePositionY="170"
        targetPositionY="380"
        message={`<span>4: Perform validation and<br> consumption of internal<br> and external services</span>`} 
    />
    <SequenceAction 
        id="action5"
        from="api_scudo" 
        to="merchant" 
        positionX="290" 
        positionY="380"
        isReturned="true"
        message={`<span>5: Response: {status, date,<br> rules, action}</span>`} 
    />
    <SequenceAction 
        id="action44"
        from="placetopay" 
        to="placetopay"
        positionX="835" 
        positionY="500" 
        selfAction="true"
        sourcePositionY="420"
        targetPositionY="590"
        message={`<span>6: Approve/reject<br> manually transaction</span>`} 
    />
    <SequenceAction 
        id="action77"
        from="placetopay" 
        to="api_scudo" 
        positionX="650" 
        positionY="590"
        isReturned="true"
        message={`<span>7: Notification:<br> final decision</span>`} 
    />
    <SequenceAction 
        id="action6"
        from="api_scudo" 
        to="api_scudo"
        positionX="620" 
        positionY="740" 
        selfAction="true"
        sourcePositionY="650"
        targetPositionY="820"
        message={`<span>8: Update transaction<br> status</span>`} 
    />
    <SequenceAction 
        id="action7"
        from="api_scudo" 
        to="merchant" 
        positionX="290" 
        positionY="832"
        isReturned="true"
        message={`<span>9: Response: {status, data}</span>`} 
    />
    <SequenceAction 
        id="action66"
        from="merchant" 
        to="merchant"
        positionX="220" 
        positionY="940" 
        selfAction="true"
        sourcePositionY="852"
        targetPositionY="1020"
        message={`<span>10: Make decision according to (action)</span>`} 
    />
    <SequenceAction 
        id="action_payment"
        from="merchant" 
        to="actor" 
        positionX="-15" 
        positionY="1020"
        isReturned="true"
        message={`<span>11:Payment response</span>`} 
    />
    <SequenceAction 
        id="action_request"
        from="merchant" 
        to="api_scudo" 
        positionX="280" 
        positionY="1070"
        message={`<span>12:Request: Post/notify/header<br>{id, transaction, status}</span>`} 
    />
    <SequenceAction 
        id="action_update"
        from="api_scudo" 
        to="api_scudo"
        positionX="620" 
        positionY="1150" 
        selfAction="true"
        sourcePositionY="1070"
        targetPositionY="1218"
        message={`<span>13: Update transaction <br>status</span>`} 
    />
    <SequenceAction 
        id="action_response"
        from="api_scudo" 
        to="merchant" 
        positionX="290" 
        positionY="1230"
        isReturned="true"
        message={`<span>14:Response: {status, data}</span>`} 
    />
    </SequenceDiagram>
  )
}