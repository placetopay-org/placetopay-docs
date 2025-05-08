import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram";
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor";
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction";
import Line from "@/components/react-flow/SequenceDiagram/Line";

export default function PaymentWithTokenSubscriptionSequenceEn() {
    return (
        <SequenceDiagram customView={{ height: 700, x: 50, y: 27.2727 }}>
            <SequenceActor id="customer" label="Customer" positionX="0" positionY="0" height="700px" />
            <SequenceActor id="checkout" label=":Checkout Placetopay" positionX="150" positionY="0" height="700px" color="bg-blueFlow" />
            <SequenceActor id="core" label=":CORE Services Placetopay" positionX="350" positionY="0" height="700px" color="bg-blueFlow" />
            <SequenceActor id="vts" label=":VTS" positionX="550" positionY="0" height="700px" color="bg-blueFlow" />
            <SequenceActor id="acquirer" label=":Acquirer" positionX="750" positionY="0" height="700px" color="bg-orangeFlow" />
            <SequenceActor id="issuer" label=":Issuer" positionX="950" positionY="0" height="700px" color="bg-orangeFlow" />

            <Line id="lineStart" label="Start" positionX="-50" positionY="35" width="1050px" />

            <SequenceAction
                id="selectCardAndSendOrder"
                from="customer"
                to="checkout"
                message="1. Select PAN/Tokenized Card and send order"
                positionX="75"
                positionY="70"
            />

            <SequenceAction
                id="requestCollect"
                from="checkout"
                to="core"
                message="2. Request collect"
                positionX="250"
                positionY="110"
            />

            <SequenceAction
                id="requestCryptogram"
                from="core"
                to="vts"
                message="3. Request cryptogram (token ID, payment information)"
                positionX="450"
                positionY="150"
            />

            <SequenceAction
                id="createCryptogram"
                from="vts"
                to="acquirer"
                message="4. Create Cryptogram"
                positionX="650"
                positionY="190"
            />

            <SequenceAction
                id="returnCryptogramInfo"
                from="acquirer"
                to="vts"
                message="5. Return cryptogram information"
                positionX="638"
                positionY="230"
            />

            <SequenceAction
                id="cryptogramResponse"
                from="vts"
                to="core"
                message="6. Cryptogram generation response"
                positionX="438"
                positionY="270"
            />

            <SequenceAction
                id="detailPaymentAuth"
                from="core"
                to="checkout"
                message="7. Detail payment and authorization process"
                positionX="238"
                positionY="310"
            />

            <SequenceAction
                id="sendAuthTransaction"
                from="checkout"
                to="acquirer"
                message="8. Send transaction for authorization"
                positionX="650"
                positionY="350"
            />

            <SequenceAction
                id="sendToBrandProcessor"
                from="acquirer"
                to="issuer"
                message="9. Send transaction to the brand network and processor"
                positionX="850"
                positionY="390"
            />

            <SequenceAction
                id="returnAuthResponseIssuer"
                from="issuer"
                to="acquirer"
                message="10. Return approved/rejected transaction"
                positionX="838"
                positionY="430"
            />

            <SequenceAction
                id="returnAuthResponseAdq"
                from="acquirer"
                to="vts"
                message="11. Return approved/rejected transaction"
                positionX="638"
                positionY="470"
            />

            <SequenceAction
                id="returnAuthResponseVts"
                from="vts"
                to="core"
                message="12. Return approved/rejected transaction"
                positionX="438"
                positionY="510"
            />

            <SequenceAction
                id="notifyTransactionStatus"
                from="core"
                to="customer"
                message="13. Notify transaction status"
                positionX="75"
                positionY="550"
            />
        </SequenceDiagram>
    );
}