import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram"
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor"
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction"
import Line from "@/components/react-flow/SequenceDiagram/Line"
import { useLocale } from "@/components/LocaleProvider"

const T = {
  es: {
    server: "Tu servidor",
    onboarding: "Onboarding",
    endpoint: "Tu endpoint",
    acceptance: "Aceptación",
    create: `<span><b>POST</b> /api/merchants<br>con <b>Idempotency-Key</b></span>`,
    validate: `<span>Valida el contenido<br>completo</span>`,
    accepted: `<span><b>202</b> con <b>processId</b><br>y <b>Retry-After</b></span>`,
    query: "Consulta",
    getProcess: `<span><b>GET</b> /api/processes/{processId}</span>`,
    pending: `<span>Responde <b>PENDING</b><br>con <b>Retry-After</b></span>`,
    getProcessAgain: `<span><b>GET</b> /api/processes/{processId}</span>`,
    succeeded: `<span>Responde <b>OK</b> con<br><b>result.merchantId</b>, sin Retry-After</span>`,
    notification: "Notificación",
    deliver: `<span>Notificación firmada<br>con <b>X-Signature</b></span>`,
    ack: `<span>Respondes <b>2xx</b></span>`,
  },
  en: {
    server: "Your server",
    onboarding: "Onboarding",
    endpoint: "Your endpoint",
    acceptance: "Acceptance",
    create: `<span><b>POST</b> /api/merchants<br>with <b>Idempotency-Key</b></span>`,
    validate: `<span>Validates the whole<br>payload</span>`,
    accepted: `<span><b>202</b> with <b>processId</b><br>and <b>Retry-After</b></span>`,
    query: "Query",
    getProcess: `<span><b>GET</b> /api/processes/{processId}</span>`,
    pending: `<span>Returns <b>PENDING</b><br>with <b>Retry-After</b></span>`,
    getProcessAgain: `<span><b>GET</b> /api/processes/{processId}</span>`,
    succeeded: `<span>Returns <b>OK</b> with<br><b>result.merchantId</b>, no Retry-After</span>`,
    notification: "Notification",
    deliver: `<span>Signed notification<br>with <b>X-Signature</b></span>`,
    ack: `<span>You answer <b>2xx</b></span>`,
  },
}

export default function CreateMerchantSequence() {
  const { locale } = useLocale()
  const t = T[locale] ?? T.es

  return (
    <SequenceDiagram customView={{ height: 700, x: 60, y: 27.2727, zoom: 0.68 }}>
      <SequenceActor
        id="server"
        color="bg-blueFlow"
        label={t.server}
        positionX="0"
        positionY="0"
        height="800px"
      />
      <SequenceActor
        id="onboarding"
        color="bg-orangeFlow"
        label={t.onboarding}
        positionX="400"
        positionY="0"
        height="800px"
      />
      <SequenceActor
        id="endpoint"
        label={t.endpoint}
        positionX="770"
        positionY="0"
        height="800px"
      />

      <Line id="lineAcceptance" label={t.acceptance} positionX="-60" positionY="35" width="950px" />
      <SequenceAction
        id="create"
        from="server"
        to="onboarding"
        message={t.create}
        positionX="85"
        positionY="80"
      />
      <SequenceAction
        id="validate"
        from="onboarding"
        to="onboarding"
        message={t.validate}
        positionX="430"
        positionY="150"
        sourcePositionY="118"
        targetPositionY="220"
      />
      <SequenceAction
        id="accepted"
        from="onboarding"
        to="server"
        message={t.accepted}
        positionX="95"
        positionY="240"
      />

      <Line id="lineQuery" label={t.query} positionX="-60" positionY="310" width="950px" />
      <SequenceAction
        id="getProcess"
        from="server"
        to="onboarding"
        message={t.getProcess}
        positionX="70"
        positionY="355"
      />
      <SequenceAction
        id="pending"
        from="onboarding"
        to="server"
        message={t.pending}
        positionX="95"
        positionY="415"
      />
      <SequenceAction
        id="getProcessAgain"
        from="server"
        to="onboarding"
        message={t.getProcessAgain}
        positionX="70"
        positionY="485"
      />
      <SequenceAction
        id="succeeded"
        from="onboarding"
        to="server"
        message={t.succeeded}
        positionX="45"
        positionY="545"
      />

      <Line id="lineNotification" label={t.notification} positionX="-60" positionY="620" width="950px" />
      <SequenceAction
        id="deliver"
        from="onboarding"
        to="endpoint"
        message={t.deliver}
        positionX="450"
        positionY="665"
      />
      <SequenceAction
        id="ack"
        from="endpoint"
        to="onboarding"
        message={t.ack}
        positionX="500"
        positionY="730"
      />
    </SequenceDiagram>
  )
}
