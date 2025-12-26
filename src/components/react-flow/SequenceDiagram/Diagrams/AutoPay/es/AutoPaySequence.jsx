import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram"
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor"
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction"
import Line from "@/components/react-flow/SequenceDiagram/Line"

export default function AutoPaySequence() {
  return (
      <SequenceDiagram customView={{ height: 750, x: 100, y: 0 }}>
        {/* Actores */}
        <SequenceActor
            id="user"
            label="Usuario"
            positionX="0"
            positionY="0"
            height="850px"
        />
        <SequenceActor
            id="server"
            label="Tu Servidor"
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

        {/* Fase 1: Setup */}
        <Line id="lineSetup" label="Fase 1: Setup" positionX="-80" positionY="40" width="900px" />

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
            message="Retorna processUrl"
            positionX="220"
            positionY="130"
            isDotted
        />

        {/* Fase 2: Captura */}
        <Line id="lineCapture" label="Fase 2: Captura" positionX="-80" positionY="190" width="900px" />

        <SequenceAction
            id="redirect_user"
            from="server"
            to="user"
            message="Redirección a WebCheckout"
            positionX="20"
            positionY="220"
        />
        <SequenceAction
            id="user_interact"
            from="user"
            to="webcheckout"
            message="Ingresa Datos / Acepta"
            positionX="20"
            positionY="280"
            sourcePositionY="280"
            targetPositionY="350"
        />
        <SequenceAction
            id="internal_token"
            from="webcheckout"
            to="gateway"
            message="Tokenización Interna"
            positionX="500"
            positionY="340"
        />

        {/* Fase 3: Confirmación */}
        <Line id="lineConfirm" label="Fase 3: Confirmación" positionX="-80" positionY="420" width="900px" />

        <SequenceAction
            id="return_merchant"
            from="webcheckout"
            to="server"
            message="Retorno a returnUrl"
            positionX="250"
            positionY="460"
        />
        <SequenceAction
            id="query_status"
            from="server"
            to="gateway"
            message="Consulta Estado (requestId)"
            positionX="220"
            positionY="520"
        />
        <SequenceAction
            id="res_status"
            from="gateway"
            to="server"
            message="Estado: APPROVED"
            positionX="220"
            positionY="580"
            isDotted
        />

        {/* Fase 4: Ejecución Futura (Opcional, para mostrar el ciclo completo) */}
        <Line id="lineFuture" label="Fase 4: Ejecución Futura" positionX="-80" positionY="640" width="900px" />

        <SequenceAction
            id="webhook"
            from="gateway"
            to="server"
            message="Webhook: Cobro Ejecutado"
            positionX="220"
            positionY="690"
        />

      </SequenceDiagram>
  )
}