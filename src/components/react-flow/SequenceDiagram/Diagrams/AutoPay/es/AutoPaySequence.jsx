import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram"
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor"
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction"
import Line from "@/components/react-flow/SequenceDiagram/Line"

export default function AutoPaySequence() {
        return (
            <SequenceDiagram customView={{ height: 600, x: 0, y: 0 }}>
                    <SequenceActor
                        id="user"
                        label="Usuario"
                        positionX="100"
                        positionY="0"
                        height="650px"
                    />
                    <SequenceActor
                        id="server"
                        label="Tu Servidor"
                        positionX="350"
                        positionY="0"
                        height="650px"
                    />
                    <SequenceActor
                        id="gateway"
                        color="bg-orangeFlow"
                        label="Gateway"
                        positionX="600"
                        positionY="0"
                        height="650px"
                    />
                    <SequenceActor
                        id="webcheckout"
                        color="bg-blueFlow"
                        label="WebCheckout"
                        positionX="850"
                        positionY="0"
                        height="650px"
                    />

                    <Line id="lineSetup" label="Fase 1: Setup" positionX="0" positionY="40" width="950px" />

                    <SequenceAction
                        id="req_session"
                        from="server"
                        to="gateway"
                        message="POST /autopay/session"
                        positionX="370"
                        positionY="70"
                    />
                    <SequenceAction
                        id="res_session"
                        from="gateway"
                        to="server"
                        message="Retorna processUrl"
                        positionX="370"
                        positionY="120"
                        isDotted
                    />

                    <Line id="lineCapture" label="Fase 2: Captura" positionX="0" positionY="170" width="950px" />

                    <SequenceAction
                        id="redirect_user"
                        from="server"
                        to="user"
                        message="Redirección a WebCheckout"
                        positionX="150"
                        positionY="210"
                    />

                    <SequenceAction
                        id="user_interact"
                        from="user"
                        to="webcheckout"
                        message="Ingresa Datos / Acepta"
                        positionX="120"
                        positionY="260"
                        sourcePositionY="260"
                        targetPositionY="330"
                    />

                    <Line id="lineConfirm" label="Fase 3: Confirmación" positionX="0" positionY="380" width="950px" />

                    <SequenceAction
                        id="return_merchant"
                        from="webcheckout"
                        to="server"
                        message="Retorno a returnUrl"
                        positionX="400"
                        positionY="410"
                    />
                    <SequenceAction
                        id="query_status"
                        from="server"
                        to="gateway"
                        message="Consulta Estado (requestId)"
                        positionX="370"
                        positionY="470"
                    />
                    <SequenceAction
                        id="res_status"
                        from="gateway"
                        to="server"
                        message="Estado: APPROVED"
                        positionX="370"
                        positionY="520"
                        isDotted
                    />
            </SequenceDiagram>
        )
}