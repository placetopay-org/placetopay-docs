import SequenceDiagram from "@/components/react-flow/SequenceDiagram/SequenceDiagram"
import SequenceActor from "@/components/react-flow/SequenceDiagram/SequenceActor"
import SequenceAction from "@/components/react-flow/SequenceDiagram/SequenceAction"
import Line from "@/components/react-flow/SequenceDiagram/Line"

export default function IntegrationSequence() {
  return (
    <SequenceDiagram customView={{ height:600, x:120, y:27.2727 }}>
    <SequenceActor 
    id="site" 
    color="bg-blueFlow"
    label="Tu sitio" 
    positionX="0" 
    positionY="0" 
    height="700px" 
    />
    <Line id="line" label="Inicio" positionX="-100" positionY="35" width="800px" />
    <SequenceActor id="server" label="Tu servidor" positionX="220" positionY="0" height="700px" />
    <SequenceActor id="webcheckout" color="bg-orangeFlow" label="Webcheckout" positionX="550" positionY="0" height="700px" />
    <SequenceAction 
        id="process"
        from="site" 
        to="server" 
        message="Iniciar proceso" 
        positionX="50" 
        positionY="70" 
    />
    <SequenceAction 
        id="session"  
        from="server" 
        to="webcheckout" 
        message="Crear sesión de pago" 
        positionX="300" 
        positionY="70" 
    />
    <SequenceAction 
        id="return"
        from="webcheckout" 
        to="server" 
        positionX="300" 
        positionY="160"
        message={`<span>Retornar <b>requestId</b><br> de pago y <b>processUrl</b></span>`} 
    />
    <SequenceAction 
        id="return_user"
        from="server" 
        to="webcheckout" 
        positionX="260" 
        positionY="230"
        message={`<span>Redireccionar usuario a <b>ProcessUrl</b></span>`} 
    />
    <SequenceAction 
        id="complete"
        from="webcheckout" 
        to="webcheckout"
        positionX="550" 
        positionY="310" 
        sourcePositionY="219"
        targetPositionY="400"
        message={`<span>Usuario completa<br> el proceso</span>`} 
    />
    <SequenceAction 
        id="return2"
        from="webcheckout" 
        to="server" 
        positionX="270" 
        positionY="400"
        message={`<span>Retornar a la <b>returnUrl</b> enviada<br> en el <b>CreateSessionRequest</b></span>`} 
    />
    <Line id="lineConsulta" label="Consulta" positionX="-100" positionY="460" width="800px" />
    <SequenceAction 
        id="checkSession"  
        from="server" 
        to="webcheckout" 
        message="Consultar sesión de pago" 
        positionX="290" 
        positionY="500" 
    />
    <SequenceAction 
        id="statusSession"  
        from="webcheckout" 
        to="server" 
        message="Retornar estado de la sesión" 
        positionX="280" 
        positionY="560" 
    />
    <SequenceAction 
        id="detail"  
        from="server" 
        to="site" 
        message="Detalle del proceso" 
        positionX="35" 
        positionY="560" 
    />
    <Line id="lineNotificacion" label="Notificación" positionX="-100" positionY="618" width="800px" />
    <SequenceAction 
        id="notification"
        from="webcheckout" 
        to="server" 
        message="Notificación webhook"
        positionX="300" 
        positionY="660" 
    />
    </SequenceDiagram>
  )
}