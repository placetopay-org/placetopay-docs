/* eslint-disable @next/next/no-img-element */
import { createContext, useContext, useRef, useState } from "react"
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { useLocale } from '@/components/LocaleProvider'

const ImageZoomContext = createContext()

const IMAGE_TEXTS = {
  es: { zoomed: 'Vista ampliada', withZoom: 'Imagen con zoom' },
  en: { zoomed: 'Zoomed view', withZoom: 'Image with zoom' },
}

export function ImageZoomProvider(props) {
  const { locale } = useLocale()
  const texts = IMAGE_TEXTS[locale] ?? IMAGE_TEXTS.es
  // Estado para manejar el zoom y la imagen activa
  const [activeImage, setActiveImage] = useState(null)
  const closeRef = useRef(null)

  const isZoomed = Boolean(activeImage)

  // Función para alternar el zoom y establecer la imagen activa
  const toggleZoom = (image) => {
    setActiveImage(image ?? null) // Si no hay imagen, limpiamos el estado
  }

  return (
    <ImageZoomContext.Provider value={{ isZoomed, activeImage, toggleZoom }}>
      <Dialog
        open={isZoomed}
        onClose={() => toggleZoom(null)}
        initialFocus={closeRef}
        aria-label={locale === 'es' ? 'Imagen ampliada' : 'Zoomed image'}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-55 backdrop-blur-md"
          aria-hidden="true"
        />
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          onClick={() => toggleZoom(null)}
        >
          <Dialog.Panel
            className="relative flex items-center justify-center"
            onClick={() => toggleZoom(null)}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => toggleZoom(null)}
              aria-label={locale === 'es' ? 'Cerrar imagen ampliada' : 'Close zoomed image'}
              className="absolute right-2 top-2 z-10 rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80"
            >
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <img
              src={activeImage}
              alt={texts.zoomed}
              className="max-h-[90vh] max-w-full rounded-md shadow-lg sm:max-h-[80vh] sm:max-w-[90%] md:max-h-[75vh] md:max-w-[85%] lg:max-h-[70vh] lg:max-w-[80%]"
            />
          </Dialog.Panel>
        </div>
      </Dialog>
      {props.children}
    </ImageZoomContext.Provider>
  )
}

export function ImageZoom(props) {
  const { toggleZoom } = useContext(ImageZoomContext)
  const { locale } = useLocale()
  const texts = IMAGE_TEXTS[locale] ?? IMAGE_TEXTS.es

  return <img alt={texts.withZoom} {...props} tabIndex={0} onClick={() => toggleZoom(props.src)} />
}
