import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram";
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor";
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction";
import Line from "@/components/react-flow/SequenceDiagram/Line";

export default function PaymentSequenceEs() {
    return (
        <SequenceDiagram customView={{ height: 700, x: 50, y: 27.2727 }}>
            <SequenceActor id="consumidor" label="Consumidor" positionX="0" positionY="0" height="700px" />
            <SequenceActor id="checkout" label=":Checkout Placetopay" positionX="150" positionY="0" height="700px" color="bg-blueFlow" />
            <SequenceActor id="core" label=":CORE Services Placetopay" positionX="350" positionY="0" height="700px" color="bg-blueFlow" />
            <SequenceActor id="vts" label=":VTS" positionX="550" positionY="0" height="700px" color="bg-blueFlow" />
            <SequenceActor id="adquirente" label=":Adquirente" positionX="750" positionY="0" height="700px" color="bg-orangeFlow" />
            <SequenceActor id="issuer" label=":Issuer" positionX="950" positionY="0" height="700px" color="bg-orangeFlow" />

            <Line id="lineStart" label="Start" positionX="-50" positionY="35" width="1050px" />

            <SequenceAction
                id="selectCardAndSendOrder"
                from="consumidor"
                to="checkout"
                message="1. Seleccionar PAN/Tarjeta tokenizada y enviar orden"
                positionX="75"
                positionY="70"
            />

            <SequenceAction
                id="requestCollect"
                from="checkout"
                to="core"
                message="2. Solicitar collect"
                positionX="250"
                positionY="110"
            />

            <SequenceAction
                id="requestCryptogram"
                from="core"
                to="vts"
                message="3. Solicitar criptograma (token ID, información del pago)"
                positionX="450"
                positionY="150"
            />

            <SequenceAction
                id="createCryptogram"
                from="vts"
                to="adquirente"
                message="4. Crear Criptograma"
                positionX="650"
                positionY="190"
            />

            <SequenceAction
                id="returnCryptogramInfo"
                from="adquirente"
                to="vts"
                message="5. Retornar información del criptograma"
                positionX="638"
                positionY="230"
            />

            <SequenceAction
                id="cryptogramResponse"
                from="vts"
                to="core"
                message="6. Respuesta de la generación del criptograma"
                positionX="438"
                positionY="270"
            />

            <SequenceAction
                id="detailPaymentAuth"
                from="core"
                to="checkout"
                message="7. Detallar proceso de pago y autorización"
                positionX="238"
                positionY="310"
            />

            <SequenceAction
                id="sendAuthTransaction"
                from="checkout"
                to="adquirente"
                message="8. Enviar transacción a autorización"
                positionX="650"
                positionY="350"
            />

            <SequenceAction
                id="sendToBrandProcessor"
                from="adquirente"
                to="issuer"
                message="9. Enviar transacción al brand network y al procesador"
                positionX="850"
                positionY="390"
            />

            <SequenceAction
                id="returnAuthResponseIssuer"
                from="issuer"
                to="adquirente"
                message="10. Retornar transacción aprobada/rechazada"
                positionX="838"
                positionY="430"
            />

            <SequenceAction
                id="returnAuthResponseAdq"
                from="adquirente"
                to="vts"
                message="11. Retornar transacción aprobada/rechazada"
                positionX="638"
                positionY="470"
            />

            <SequenceAction
                id="returnAuthResponseVts"
                from="vts"
                to="core"
                message="12. Retornar transacción aprobada/rechazada"
                positionX="438"
                positionY="510"
            />

            <SequenceAction
                id="notifyTransactionStatus"
                from="core"
                to="consumidor"
                message="13. Notificar estado transacción"
                positionX="75"
                positionY="550"
            />
        </SequenceDiagram>
    );
}