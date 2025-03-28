import { MicrositeOpenPlayground } from '@/components/demo/microsite/MicrositeOpenPlayground';
import { MarkdownRenderer } from '@/components/demo/microsite/MarkdownRenderer';

export function PopupContentMicrositeOpen(){
    const markdown = `# Diseño del micrositio \n## Instrucciones \n1. Ten presente que los campos **"Referencia"**, **"Descripción del pago"**, **"Moneda"** y **"Monto"** son obligatorios y no pueden eliminarse. \n2. Usa el botón ✏️ *(editar)* para renombrar el campo y el botón 🗑️ *(eliminar)* si deseas quitarlo. \n3. Cuando agregues un nuevo campo con el botón *(Agregar campo)*, recuerda renombrarlo. \n4. Para personalizar la imagen, presiona el botón 🖼 y carga una imagen en formato **PNG** o **JPEG**. \n5. Si desea cambiar el color del botón de pago o el panel lateral, usa el botón 🎨 y escoge un color manualmente o por su valor hexadecimal. \n6. Una vez termines el diseño del micrositio, presiona el botón *(**Descargar PDF**)* para guardarla y compartirla posteriormente.`;
    return(
        <div>
          <div className='mdxUl'>
            <MarkdownRenderer markdown = {markdown} />
          </div>
          <MicrositeOpenPlayground />
        </div>
    );
};