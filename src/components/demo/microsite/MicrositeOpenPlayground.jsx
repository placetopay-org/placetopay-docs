import React, { useEffect, useRef } from 'react';

export function MicrositeOpenPlayground() {
  const pinpadContainerRef = useRef();

  useEffect(() => {
    const src = 'https://unpkg.com/@placetopay/pinpad-sdk@latest/dist/pinpad-sdk.umd.js';
    const container = pinpadContainerRef.current;

    if (document.querySelector(`script[src="${src}"]`)) {
      return () => {
        if (container) container.innerHTML = '';
      };
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (container) container.innerHTML = '';
    };
  }, []);

return (

  <div className="xl:max-w-none">
  <div className="mt-8 rounded-xl border border-gray-300 dark:border-gray-700 w-full">
    <div className="mx-auto w-full grow flex">
      <div className="flex-1 h-screen xl:flex overflow-y-auto">
        <div className="mx-auto w-full">
          <div className="card-main h-screen flex flex-col justify-between" name="EGM Demostración - Comercio de Pruebas Test Lina" header="https://placetopay-static-uat-bucket.s3.us-east-2.amazonaws.com/co/test/microsites/images/8V4kVIZ5f9tdiIcNOXmKwxXwkZBTohX6ga7SiGu6.png">
            <div className="p-4 flex-grow">

              <div className="w-full flex justify-center mt-4 mb-8">
                <img src="https://placetopay-static-uat-bucket.s3.us-east-2.amazonaws.com/co/test/microsites/images/8V4kVIZ5f9tdiIcNOXmKwxXwkZBTohX6ga7SiGu6.png" class="h-24 w-auto" alt="EGM Demostración - Comercio de Pruebas Test Lina"/>
              </div>

              <div className="my-4 md:my-6 text-center">
                <p className="font-bold">Comience el proceso de pago, ingresando la siguiente información</p>
              </div>

              <div className="md:mt-6 mb-24 md:mb-12 md:mx-auto flex flex-row w-full lg:w-4/5">
                <form noValidate="" className="p-0 lg:p-0 md:p-2 flex flex-col">
                  <div className="form-layout w-full">
                   
                      <div className="row g-3" id="formFields">
                        <div className="col-md-6">
                          <label htmlFor="field1" className="block mb-1 text-sm font-medium text-gray-700">
                            Referencia <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="text" 
                            className="w-full border border-gray-400 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary-300 rounded-lg" 
                            id="field1"
                          />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="field2" className="block mb-1 text-sm font-medium text-gray-700">
                            Descripción del pago <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="text" 
                            className="w-full border border-gray-400 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary-300 rounded-lg" 
                            id="field2"
                          />
                        </div>
                      

                        <div className="col-md-6">
                          <div className="editable-label">
                            <label htmlFor="currency" className="block mb-1 text-sm font-medium text-gray-700 after:content-['_*']">
                              Moneda
                            </label>
                            <button type="button" className="edit-btn" onClick={() => editLabel('currency')}>
                              <i className="bi bi-pencil"></i>
                            </button>
                          </div>
                          <select
                            id="currency"
                            name="currency"
                            className="w-full border border-gray-400 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary-300 rounded-lg"
                          >
                            <option value="">Selecciona una opción</option>
                            <option value="COP">Peso colombiano</option>
                            <option value="USD">Dólar estadounidense</option>
                          </select>
                        </div>

                        <div className="col-md-6">
                          <div className="editable-label">
                            <label htmlFor="amount" className="block mb-1 text-sm font-medium text-gray-700 after:content-['_*']">
                              Monto
                            </label>
                            <button type="button" className="edit-btn" onClick={() => editLabel('amount')}>
                              <i className="bi bi-pencil"></i>
                            </button>
                          </div>
                          <input
                            type="text"
                            id="amount"
                            className="w-full border border-gray-400 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary-300 rounded-lg"
                          />
                        </div>

                        <div className="col-md-6">
                          <div className="editable-label">
                            <label htmlFor="buyer_id_type" className="form-label">
                              Tipo de documento del comprador
                            </label>
                            <button type="button" className="edit-btn" onClick={() => editLabel('buyer_id_type')}>
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button type="button" className="delete-btn" onClick={() => deleteField('buyer_id_type')}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                          <select id="buyer_id_type" className="w-full border border-gray-400 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary-300 rounded-lg">
                            <option value="">Selecciona una opción</option>
                            <optgroup label="Colombia">
                              <option value="CC">Cédula de ciudadanía</option>
                              <option value="CE">Cédula de extranjería</option>
                              <option value="NIT">NIT</option>
                              <option value="RUT">RUT</option>
                              <option value="TI">Tarjeta identidad</option>
                            </optgroup>
                            <optgroup label="Belize">
                              <option value="BRN">Business Registration Number</option>
                              <option value="BZSSN">Social Security ID</option>
                            </optgroup>
                            <optgroup label="Brazil">
                              <option value="CPF">Cadastro de Pessoas Físicas</option>
                            </optgroup>
                            <optgroup label="Chile">
                              <option value="CLRUT">RUT</option>
                            </optgroup>
                            <optgroup label="Costa Rica">
                              <option value="DIDI">Cédula DIDI</option>
                              <option value="DIMEX">Cédula DIMEX</option>
                              <option value="CRCPF">Persona Física Nacional</option>
                              <option value="CPJ">Persona Jurídica</option>
                            </optgroup>
                            <optgroup label="Ecuador">
                              <option value="CI">Cédula de identidad</option>
                              <option value="RUC">Registro único de contribuyente</option>
                            </optgroup>
                            <optgroup label="Honduras">
                              <option value="HNDR">Documento de residencia</option>
                              <option value="HNDNI">Documento nacional de identificación</option>
                              <option value="RTN">Número de Registro Tributario</option>
                            </optgroup>
                            <optgroup label="International">
                              <option value="LIC">LIC</option>
                              <option value="PPN">Passport</option>
                              <option value="TAX">TAX</option>
                            </optgroup>
                            <optgroup label="Panamá">
                              <option value="CIP">Cédula de identidad personal</option>
                              <option value="PARUC">Registro único de contribuyente</option>
                            </optgroup>
                            <optgroup label="Perú">
                              <option value="DNI">DNI</option>
                              <option value="PERUC">Registro único de contribuyente</option>
                            </optgroup>
                            <optgroup label="Puerto Rico">
                              <option value="EIN">Employer Identification Number</option>
                            </optgroup>
                            <optgroup label="Uruguay">
                              <option value="UYCI">Cédula de Identidad</option>
                              <option value="UYRUT">Registro Único Tributario</option>
                            </optgroup>
                          </select>
                        </div>

                        <div className="col-md-6">
                          <div className="editable-label">
                            <label htmlFor="buyer_id" className="form-label">Documento del comprador</label>
                            <button type="button" className="edit-btn" onClick={() => editLabel('buyer_id')}>
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button type="button" className="delete-btn" onClick={() => deleteField('buyer_id')}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                          <input 
                            type="text" 
                            id="buyer_id" 
                            className="w-full border border-gray-400 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary-300 rounded-lg" 
                          />
                        </div>

                        <div className="col-md-6">
                          <div className="editable-label">
                            <label htmlFor="buyer_name" className="form-label">Nombre del comprador</label>
                            <button type="button" className="edit-btn" onClick={() => editLabel('buyer_name')}>
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button type="button" className="delete-btn" onClick={() => deleteField('buyer_name')}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                          <input 
                            type="text" 
                            id="buyer_name" 
                            className="w-full border border-gray-400 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary-300 rounded-lg" 
                          />
                        </div>

                        <div className="col-md-6">
                          <div className="editable-label">
                            <label htmlFor="buyer_surname" className="form-label">Apellido del comprador</label>
                            <button type="button" className="edit-btn" onClick={() => editLabel('buyer_surname')}>
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button type="button" className="delete-btn" onClick={() => deleteField('buyer_surname')}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                          <input 
                            type="text" 
                            id="buyer_surname" 
                            className="w-full border border-gray-400 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary-300 rounded-lg" 
                          />
                        </div>
                    
                        <div className="col-md-12">
                          <div className="editable-label">
                            <label htmlFor="buyer_email" className="form-label">Correo electrónico</label>
                            <button type="button" className="edit-btn" onClick={() => editLabel('buyer_email')}>
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button type="button" className="delete-btn" onClick={() => deleteField('buyer_email')}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                          <input 
                            type="email" 
                            id="buyer_email" 
                            className="w-full border border-gray-400 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary-300 rounded-lg" 
                          />
                        </div>
                    
                        <div className="mt-6">
                          <p className="text-gray-500 text-sm text-justify">
                            Al continuar, acepto las <span>políticas</span> aplicables para el tratamiento de mis datos personales según la jurisdicción local del responsable y de 
                            <a href="https://www.placetopay.com/web/politicas-de-privacidad/" target="_blank" rel="noopener noreferrer" className="font-bold" tabIndex="-1"> Evertec PlacetoPay</a> en su calidad de encargado.
                          </p>
                        </div>
                      </div>                         
                  </div>                     
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 flex flex-col justify-between relative p-8 w-1/3 z-0">
        <div className="text-black">
          <h2 className="font-bold text-2xl mb-3 md:mb-5">Pagos electrónicos</h2>
          <p className="text-justify">
            Pague de forma segura desde su hogar, oficina o cualquier lugar a través de nuestro sistema de pago. 
            Utilice convenientemente nuestro servicio las 24 horas del día, los 7 días de la semana.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-wrap justify-between mx-8 items-center">
            <div className="flex flex-row items-center">
              <div className="text-xs font-semibold text-gray-500 p-2">Hecho por</div>
              <div className="p-4">
                <img src="https://static.placetopay.com/placetopay-logo.svg" alt="Logo" className="h-24 w-24" />
              </div>
            </div>
            <div className="relative">
              <div className="flex flex-row items-center cursor-pointer">
                <div className="text-gray-500 h-5 w-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"></path>
                  </svg>
                </div>
                <div className="text-xs font-semibold text-gray-500 p-2">Español

                </div>
                <div className="text-gray-500 h-5 w-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>  
  );
}
export default MicrositeOpenPlayground;