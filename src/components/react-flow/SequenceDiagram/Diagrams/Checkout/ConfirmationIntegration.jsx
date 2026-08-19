import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram"
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor"
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction"
import Line from "@/components/react-flow/SequenceDiagram/Line"
import { useLocale } from "@/components/LocaleProvider"

const T = {
  es: {
    site: "Tu sitio",
    server: "Tu servidor",
    start: "Inicio",
    initProcess: "Iniciar proceso",
    createSession: `<span>Crear sesión con<br><b>requiresConfirmation: true</b></span>`,
    returnSession: `<span>Retorna <b>requestId</b><br> y <b>processUrl</b></span>`,
    redirect: `<span>Redireccionar usuario a <b>processUrl</b></span>`,
    complete: `<span>Usuario completa<br> el proceso</span>`,
    returnUrl: `<span>Retorna a url enviada en <br> <b>CreateSessionRequest.returnUrl</b></span>`,
    query: "Consulta",
    querySession: "Consultar sesión",
    queryStatus: `<span>Retorna sesión <b>PENDING</b> <br>con transacción <b>PENDING_CONFIRMATION</b></span>`,
    confirm: "Confirmar o Cancelar",
    confirmAction: "Confirmar o cancelar transacción",
    finalStatus: "Retornar estado final",
    detail: "Detalle del proceso",
  },
  en: {
    site: "Your site",
    server: "Your server",
    start: "Start",
    initProcess: "Start process",
    createSession: `<span>Create session with<br><b>requiresConfirmation: true</b></span>`,
    returnSession: `<span>Returns <b>requestId</b><br> and <b>processUrl</b></span>`,
    redirect: `<span>Redirect user to <b>processUrl</b></span>`,
    complete: `<span>User completes<br> process</span>`,
    returnUrl: `<span>Returns to url sent as <br> <b>CreateSessionRequest.returnUrl</b></span>`,
    query: "Query",
    querySession: "Query session",
    queryStatus: `<span>Return session <b>PENDING</b> <br>with <b>PENDING_CONFIRMATION</b> transaction</span>`,
    confirm: "Confirm or Cancel",
    confirmAction: "Confirm or cancel transaction",
    finalStatus: "Return final status",
    detail: "Process detail",
  },
}

export default function ConfirmationIntegration() {
  const { locale } = useLocale()
  const t = T[locale] ?? T.es

  return (
    <SequenceDiagram customView={{ height:730, x:120, y:27.2727 }}>
    <SequenceActor 
    id="site" 
    color="bg-blueFlow"
    label={t.site} 
    positionX="0" 
    positionY="0" 
    height="780px" 
    />
    <Line id="lineInit" label={t.start} positionX="-100" positionY="35" width="800px" />
    <SequenceActor id="server" label={t.server} positionX="220" positionY="0" height="780px" />
    <SequenceActor id="webcheckout" color="bg-orangeFlow" label="Webcheckout" positionX="600" positionY="0" height="780px" />
    <SequenceAction 
        id="process"
        from="site" 
        to="server" 
        message={t.initProcess}
        positionX="50" 
        positionY="70" 
    />
    <SequenceAction 
        id="session"  
        from="server" 
        to="webcheckout" 
        message={t.createSession}
        positionX="300" 
        positionY="70" 
    />
    <SequenceAction 
        id="returnSesion"
        from="webcheckout" 
        to="server" 
        positionX="330"
        positionY="130"
        message={t.returnSession}
    />
    <SequenceAction 
        id="redirect"
        from="server" 
        to="webcheckout" 
        positionX="280"
        positionY="250"
        message={t.redirect}
    />
    <SequenceAction 
        id="complete"
        from="webcheckout" 
        to="webcheckout"
        positionX="630"
        positionY="310" 
        sourcePositionY="238"
        targetPositionY="388"
        message={t.complete}
    />
    <SequenceAction 
        id="return2"
        from="webcheckout" 
        to="server" 
        positionX="320"
        positionY="400"
        message={t.returnUrl}
    />
    <Line id="lineQuery" label={t.query} positionX="-100" positionY="470" width="800px" />
    <SequenceAction 
        id="checkSession"  
        from="server" 
        to="webcheckout" 
        message={t.querySession}
        positionX="320"
        positionY="520" 
    />
    <SequenceAction 
        id="statusSession"  
        from="webcheckout" 
        to="server" 
        message={t.queryStatus}
        positionX="270"
        positionY="570" 
    />
    <Line id="lineConfirm" label={t.confirm} positionX="-150" positionY="630" width="800px" />
    <SequenceAction 
        id="confirm"  
        from="server" 
        to="webcheckout" 
        message={t.confirmAction}
        positionX="300" 
        positionY="670" 
    />
    <SequenceAction 
        id="finalStatus"  
        from="webcheckout" 
        to="server" 
        message={t.finalStatus}
        positionX="330"
        positionY="730" 
    />
    <SequenceAction 
        id="detail"  
        from="server" 
        to="site" 
        message={t.detail}
        positionX="35" 
        positionY="730" 
    />
    </SequenceDiagram>
  )
}
