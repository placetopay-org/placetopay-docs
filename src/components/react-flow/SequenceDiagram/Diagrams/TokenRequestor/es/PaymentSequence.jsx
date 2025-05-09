import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram";
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor";
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction";
import Line from "@/components/react-flow/SequenceDiagram/Line";

export default function PaymentSequenceEs() {
    return (
        <SequenceDiagram customView={{ height: 1100, x: 70, y: 27.2727 }}>
            <SequenceActor
                id="consumer"
                label="Consumidor"
                positionX="0"
                positionY="0"
                height="900px"
            />

            <SequenceActor
                id="checkout"
                label=":Checkout Placetopay"
                positionX="180"
                positionY="0"
                height="1100px"
                color="bg-blueFlow"
            />

            <SequenceActor
                id="core"
                label=":Servicios CORE Placetopay"
                positionX="380"
                positionY="0"
                height="1100px"
                color="bg-blueFlow"
            />

            <SequenceActor
                id="vts"
                label=":VTS"
                positionX="580"
                positionY="0"
                height="1100px"
                color="bg-blueFlow"
            />

            <SequenceActor
                id="acquirer"
                label=":Adquirente"
                positionX="780"
                positionY="0"
                height="1100px"
                color="bg-orangeFlow"
            />

            <SequenceActor
                id="issuer"
                label=":Emisor"
                positionX="950"
                positionY="0"
                height="1000px"
                color="bg-orangeFlow"
            />

            <Line
                id="lineStart"
                label="Inicio"
                positionX="-50"
                positionY="35"
                width="1100px"
            />

            <SequenceAction
                id="selectCardAndSendOrder"
                from="consumer"
                to="checkout"
                message="1. Selecciona <br> PAN/Tokenizada"
                positionX="20"
                positionY="70"
            />

            <SequenceAction
                id="requestCollect"
                from="checkout"
                to="core"
                message="2. Solicita cobro"
                positionX="230"
                positionY="180"
            />

            <SequenceAction
                id="requestCryptogram"
                from="core"
                to="vts"
                message="3. Solicita criptograma"
                positionX="600"
                positionY="260"
            />

            <SequenceAction
                id="createCryptogram"
                from="vts"
                to="acquirer"
                message="4. Crea <br> criptograma"
                positionX="830"
                positionY="340"
            />

            <SequenceAction
                id="returnCryptogramInfo"
                from="acquirer"
                to="vts"
                message="5. Retorna <br> criptograma"
                positionX="620"
                positionY="420"
            />

            <SequenceAction
                id="cryptogramResponse"
                from="vts"
                to="core"
                message="5. Retorna <br> criptograma"
                positionX="420"
                positionY="500"
            />

            <SequenceAction
                id="detailPaymentAuth"
                from="core"
                to="checkout"
                message="7. Detalla proceso de <br> pago y autorización"
                positionX="210"
                positionY="580"
            />

            <SequenceAction
                id="sendAuthTransaction"
                from="checkout"
                to="acquirer"
                message="8. Envía transacción <br> para autorización"
                positionX="610"
                positionY="660"
            />

            <SequenceAction
                id="sendToBrandProcessor"
                from="acquirer"
                to="issuer"
                message="9. Envía transacción <br>a la red"
                positionX="800"
                positionY="740"
            />

            <SequenceAction
                id="returnAuthResponseIssuer"
                from="issuer"
                to="acquirer"
                message="10. Retorna  estado"
                positionX="800"
                positionY="850"
            />

            <SequenceAction
                id="returnAuthResponseAdq"
                from="acquirer"
                to="vts"
                message="11. Retorna estado <br> de la transacción"
                positionX="610"
                positionY="950"
            />

            <SequenceAction
                id="returnAuthResponseVts"
                from="vts"
                to="core"
                message="12. Retorna estado <br> de la transacción"
                positionX="410"
                positionY="1000"
            />

            <Line
                id="loopEnd"
                positionX="0"
                positionY="1100"
                width="1080px"
            />

            <SequenceAction
                id="notifyTransactionStatus"
                from="core"
                to="consumer"
                message="13. Notifica estado de la transacción"
                positionX="100"
                positionY="1160"
            />
        </SequenceDiagram>
    );
}