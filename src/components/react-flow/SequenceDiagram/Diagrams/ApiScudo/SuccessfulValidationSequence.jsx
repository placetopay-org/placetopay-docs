import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram"
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor"
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction"

export default function SuccessfulValidationSequence() {
    return (
        <SequenceDiagram customView={{ height:790, x:90, y:27.2727 }}> 
        <SequenceActor id="actor" color="bg-blueFlow" label="Actor" positionX="0" positionY="0" height="960px" />
        <SequenceActor id="merchant" label="Merchant" positionX="220" positionY="0" height="960px" />
        <SequenceActor id="api_scudo" color="bg-orangeFlow" label="API Scudo" positionX="600" positionY="0" height="960px" />
        <SequenceAction 
            id="action1"
            from="actor" 
            to="merchant" 
            message="1: Enter payment data" 
            positionX="30" 
            positionY="70" 
        />
        <SequenceAction 
            id="action2"
            from="actor" 
            to="merchant" 
            message="2: Select pay" 
            positionX="60" 
            positionY="120" 
        />
        <SequenceAction 
            id="action3"
            from="merchant" 
            to="api_scudo" 
            message={`<span>3: Request: Post/validate/header {locale,payer, <br> shipping,payment,instrument,ip_address}</span>`} 
            positionX="255" 
            positionY="210" 
        />
        <SequenceAction 
            id="action4"
            from="api_scudo" 
            to="api_scudo"
            positionX="620" 
            positionY="310" 
            selfAction="true"
            sourcePositionY="210"
            targetPositionY="428"
            message={`<span>4: Perform validation and<br> consumption of internal<br> and external services</span>`} 
        />
        <SequenceAction 
            id="action5"
            from="api_scudo" 
            to="merchant" 
            positionX="275" 
            positionY="440"
            isReturned="true"
            message={`<span>5: Response: {status, date, rules, action}</span>`} 
        />
        <SequenceAction 
            id="action6"
            from="merchant" 
            to="merchant"
            positionX="250" 
            positionY="560" 
            selfAction="true"
            sourcePositionY="480"
            targetPositionY="650"
            message={`<span>6: Make decision according to (action)</span>`} 
        />
        <SequenceAction 
            id="action7"
            from="merchant" 
            to="actor" 
            positionX="35" 
            positionY="650"
            isReturned="true"
            message={`<span>7: Payment response</span>`} 
        />
        <SequenceAction 
            id="action8"
            from="merchant" 
            to="api_scudo" 
            positionX="300" 
            positionY="698"
            message={`<span>8: Request: Post/ notify / header<br> {id, transaction, status}</span>`} 
        />
        <SequenceAction 
            id="action9"
            from="api_scudo" 
            to="api_scudo"
            positionX="620" 
            positionY="800" 
            selfAction="true"
            sourcePositionY="698"
            targetPositionY="900"
            message={`<span>9: Update transaction<br> status</span>`} 
        />
        <SequenceAction 
            id="action10"
            from="api_scudo" 
            to="merchant" 
            positionX="310" 
            positionY="912"
            isReturned="true"
            message={`<span>10: Response: {status, data}</span>`} 
        />
        </SequenceDiagram>

    )
}
