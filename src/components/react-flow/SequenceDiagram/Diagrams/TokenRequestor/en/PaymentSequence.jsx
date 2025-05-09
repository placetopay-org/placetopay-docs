import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram";
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor";
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction";
import Line from "@/components/react-flow/SequenceDiagram/Line";

export default function PaymentSequenceEn() {
    return (
        <SequenceDiagram customView={{ height: 1100, x: 70, y: 27.2727 }}>
            <SequenceActor
                id="consumer"
                label="Consumer"
                positionX="0"
                positionY="0"
                height="1100px"
            />

            <SequenceActor
                id="checkout"
                label=":Checkout Placetopay"
                positionX="200"
                positionY="0"
                height="1100px"
                color="bg-blueFlow"
            />

            <SequenceActor
                id="core"
                label=":CORE Services Placetopay"
                positionX="400"
                positionY="0"
                height="1100px"
                color="bg-blueFlow"
            />

            <SequenceActor
                id="vts"
                label=":VTS"
                positionX="600"
                positionY="0"
                height="1100px"
                color="bg-blueFlow"
            />

            <SequenceActor
                id="acquirer"
                label=":Acquirer"
                positionX="800"
                positionY="0"
                height="1100px"
                color="bg-orangeFlow"
            />

            <SequenceActor
                id="issuer"
                label=":Issuer"
                positionX="1100"
                positionY="0"
                height="1100px"
                color="bg-orangeFlow"
            />

            <Line
                id="lineStart"
                label="Start"
                positionX="-50"
                positionY="35"
                width="1600px"
            />

            <SequenceAction
                id="selectCardAndSendOrder"
                from="consumer"
                to="checkout"
                message="1. Select PAN/Tokenized <br> card and send order"
                positionX="10"
                positionY="80"
            />

            <SequenceAction
                id="requestCollect"
                from="checkout"
                to="core"
                message="2. Request collect"
                positionX="250"
                positionY="180"
            />

            <SequenceAction
                id="requestCryptogram"
                from="core"
                to="vts"
                message="3. Request cryptogram"
                positionX="610"
                positionY="260"
            />

            <SequenceAction
                id="createCryptogram"
                from="vts"
                to="acquirer"
                message="4. Create Cryptogram"
                positionX="800"
                positionY="340"
            />

            <SequenceAction
                id="returnCryptogramInfo"
                from="acquirer"
                to="vts"
                message="5. Return cryptogram <br> information"
                positionX="630"
                positionY="420"
            />

            <SequenceAction
                id="cryptogramResponse"
                from="vts"
                to="core"
                message="6. Cryptogram generation <br> response"
                positionX="400"
                positionY="500"
            />

            <SequenceAction
                id="detailPaymentAuth"
                from="core"
                to="checkout"
                message="7. Detail payment and <br> authorization process"
                positionX="230"
                positionY="580"
            />

            <SequenceAction
                id="sendAuthTransaction"
                from="checkout"
                to="acquirer"
                message="8. Send transaction <br> for authorization"
                positionX="610"
                positionY="660"
            />

            <SequenceAction
                id="sendToBrandProcessor"
                from="acquirer"
                to="issuer"
                message="9. Send transaction to brand <br> network and processor"
                positionX="850"
                positionY="740"
            />

            <SequenceAction
                id="returnAuthResponseIssuer"
                from="issuer"
                to="acquirer"
                message="10. Return approved/rejected <br> transaction"
                positionX="850"
                positionY="850"
            />

            <SequenceAction
                id="returnAuthResponseAdq"
                from="acquirer"
                to="vts"
                message="11. Return status <br> transaction"
                positionX="650"
                positionY="950"
            />

            <SequenceAction
                id="returnAuthResponseVts"
                from="vts"
                to="core"
                message="12. Return status <br> transaction"
                positionX="450"
                positionY="1000"
            />

            <SequenceAction
                id="notifyTransactionStatus"
                from="core"
                to="consumer"
                message="13. Notify transaction status"
                positionX="150"
                positionY="1060"
            />
        </SequenceDiagram>
    );
}