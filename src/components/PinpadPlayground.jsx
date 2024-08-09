import React, { useEffect, useRef, useState } from 'react'
import { Switch } from '@headlessui/react'
import { useLocale } from './LocaleProvider'
import { twJoin, twMerge } from 'tailwind-merge'

const MODE_PINPAD_OPTIONS = {
  es: [
    { value: 'static', label: 'Estático' },
    { value: 'float', label: 'Flotante' },
    { value: 'modal', label: 'Modal' },
  ],
  en: [
    { value: 'static', label: 'Static' },
    { value: 'float', label: 'Float' },
    { value: 'modal', label: 'Modal' },
  ],
}

const LOCALE_OPTIONS = {
  es: [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'Inglés' },
  ],
  en: [
    { value: 'es', label: 'Spanish' },
    { value: 'en', label: 'English' },
  ],
}

function Toggle({ value, onChange, label }) {
  return (
    <div className="flex flex-col">
      <span className="ml-1">{label}:</span>
      <Switch
        checked={value}
        onChange={onChange}
        className={twMerge(
          'group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
          value && 'bg-indigo-600'
        )}
      >
        <span className="sr-only">{label}</span>
        <span
          className={twJoin(
            'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            value && 'translate-x-5'
          )}
        >
          <span
            aria-hidden="true"
            className={twMerge(
              'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in',
              value && 'opacity-0 duration-100 ease-out'
            )}
          >
            <svg
              fill="none"
              viewBox="0 0 12 12"
              className="h-3 w-3 text-gray-400"
            >
              <path
                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            aria-hidden="true"
            className={twMerge(
              'absolute inset-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out',
              value && 'opacity-100 duration-200 ease-in'
            )}
          >
            <svg
              fill="currentColor"
              viewBox="0 0 12 12"
              className="h-3 w-3 text-indigo-600"
            >
              <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
            </svg>
          </span>
        </span>
      </Switch>
    </div>
  )
}

const Select = ({ id, value, onChange, options }) => (
  <select
    id={id}
    className="rounded-md border border-gray-200 p-2 text-base outline-none"
    value={value}
    onChange={onChange}
  >
    {options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
)

export const PinpadPlayground = () => {
  const { locale } = useLocale()

  const pinpadContainerRef = useRef()
  const [config, setConfig] = useState({
    mode: 'static',
    mask: true,
    maskChar: '*',
    locale: locale,
  })

  const handleChange = (e) => {
    setConfig({
      ...config,
      mode: e.target.value,
    })
  }

  const handleMaskChange = () => {
    setConfig((state) => ({ ...state, mask: !state.mask, maskChar: '*' }))
  }

  const handleThemingChange = (e) => {
    setConfig((state) => ({
      ...state,
      customTheming: !state.customTheming,
      theming: {
        inputBorderColorFocus: '#000000',
        inputOutlineColorFocus: '#000000',
      },
    }))
  }

  const onLoad = (configValues) => {
    if (!window.PinPadSDK) {
      console.error('PinPadSDK not found')
      return;
    }
    const pinpad = new PinPadSDK.PinPad({
      mode: configValues.mode,
      mask: configValues.mask ? configValues.maskChar : false,
      locale: configValues.locale,
      theming: configValues.customTheming ? configValues.theming : undefined,
    })

    pinpad.render('#pinpad-container', '1,2,3,4,5,6,7,8,9,0')
  }

  useEffect(() => {
    const src =
      'https://unpkg.com/@placetopay/pinpad-sdk@2/dist/pinpad-sdk.umd.js'
    const container = pinpadContainerRef.current

    if (document.querySelector(`script[src="${src}"]`)) {
      onLoad(config)
      return () => {
        container.innerHTML = ''
      }
    }

    const script = document.createElement('script')
    script.src = src
    script.async = true

    script.onload = () => onLoad(config)

    document.head.appendChild(script);

    return () => {
      container.innerHTML = ''
    }
  }, [config])

  return (
    <div className="rounded-xl border border-gray-300 dark:border-gray-700">
      <div className="flex min-h-[24rem] w-full divide-x divide-gray-300 dark:divide-gray-700">
        <div className="w-1/3 px-3 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="ml-1" htmlFor="pinpad-playground-mode">
                Mode:
              </label>
              <Select
                id="pinpad-playground-mode"
                value={config.mode}
                onChange={handleChange}
                options={MODE_PINPAD_OPTIONS[locale]}
              />
            </div>

            <div className="flex flex-col">
              <label className="ml-1" htmlFor="pinpad-playground-locale">
                Locale:
              </label>
              <Select
                id="pinpad-playground-locale"
                value={config.locale}
                onChange={(e) =>
                  setConfig((state) => ({ ...state, locale: e.target.value }))
                }
                options={LOCALE_OPTIONS[locale]}
              />
            </div>

            <Toggle
              value={!!config.mask}
              onChange={handleMaskChange}
              label="Mask"
            />

            {config.mask && (
              <div className="flex flex-col">
                <label
                  className="ml-1"
                  htmlFor="pinpad-playground-mask-character"
                >
                  Mask character:
                </label>
                <input
                  id="pinpad-playground-mask-character"
                  type="text"
                  value={config.maskChar}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      maskChar: e.target.value.slice(0, 1),
                    })
                  }
                  className="rounded-md border border-gray-200 px-2 py-1 text-base outline-none"
                />
              </div>
            )}

            <Toggle
              value={!!config.customTheming}
              onChange={handleThemingChange}
              label="Custom theming"
            />

            {config.customTheming && (
              <>
                <div className="flex flex-col">
                  <label
                    className="ml-1"
                    htmlFor="pinpad-playground-input-border-focus"
                  >
                    Border color focus:
                  </label>
                  <input
                    id="pinpad-playground-input-border-focus"
                    type="color"
                    value={config.theming.inputBorderColorFocus}
                    onChange={(e) =>
                      setConfig((state) => ({
                        ...state,
                        theming: {
                          ...state.theming,
                          inputBorderColorFocus: e.target.value,
                        },
                      }))
                    }
                    className="h-10 w-full rounded-md border border-gray-200 px-2 py-1 text-base outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="ml-1"
                    htmlFor="pinpad-playground-input-outline-focus"
                  >
                    Outline color focus:
                  </label>
                  <input
                    id="pinpad-playground-input-outline-focus"
                    type="color"
                    value={config.theming.inputOutlineColorFocus}
                    onChange={(e) =>
                      setConfig((state) => ({
                        ...state,
                        theming: {
                          ...state.theming,
                          inputOutlineColorFocus: e.target.value,
                        },
                      }))
                    }
                    className="h-10 w-full rounded-md border border-gray-200 px-2 py-1 text-base outline-none"
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="w-2/3 px-6 py-6">
          <div ref={pinpadContainerRef} id="pinpad-container"></div>
        </div>
      </div>
    </div>
  )
}
