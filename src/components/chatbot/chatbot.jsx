'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Maximize2,
  Minimize2,
  Check,
  PlusCircle,
  ChevronUp,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/light'
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript'
import json from 'react-syntax-highlighter/dist/cjs/languages/hljs/json'
import php from 'react-syntax-highlighter/dist/cjs/languages/hljs/php'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import ReactMarkdown from 'react-markdown'

SyntaxHighlighter.registerLanguage('javascript', js)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('php', php)

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [specialty, setSpecialty] = useState('')
  const [isSuggestionsExpanded, setIsSuggestionsExpanded] = useState(true)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [hasContext, setHasContext] = useState(false)
  const [indications, setIndications] = useState('')
  const [allPageContents, setAllPageContents] = useState('')
  const [autoScroll, setAutoScroll] = useState(true)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)
  const suggestionsRef = useRef(null)
  const suggestionsContentRef = useRef(null)
  const chatContainerRef = useRef(null)
  const [suggestionsHeight, setSuggestionsHeight] = useState(0)
  const [locale, setLocale] = useState('')
  const [showChatbot, setShowChatbot] = useState(false)

  const importContext = async (specialtyPart) => {
    try {
      if (specialtyPart && hasContext === false) {
        const listResponse = await fetch(`/chatbot/contextConfig.json`)
        if (!listResponse.ok) {
          throw new Error(
            'Error al obtener la lista de configuraciones de contexto'
          )
        }

        const listData = await listResponse.json()

        const files = listData[specialtyPart]

        setShowChatbot(
          files &&
            (files.docs || files.api) &&
            (files['show-chatbot'] === undefined ? true : files['show-chatbot'])
        )

        let docs = null
        let api = null

        if (files && files.docs) {
          const getDocs = files.docs.map(async (filePath) => {
            const file = await import(`!!raw-loader!../../${filePath}`)
            if (!file.default) {
              throw new Error(`Error al obtener el contenido de ${filePath}`)
            }
            return file.default
          })

          const allDocs = await Promise.all(getDocs)
          docs = allDocs.join('\n\n')
        }

        if (files && files.api) {
          const getApiDocs = files.api.map(async (filePath) => {
            const file = await import(`!!raw-loader!../../${filePath}`)
            if (!file.default) {
              throw new Error(`Error al obtener el contenido de ${filePath}`)
            }
            return file.default
          })

          const allApiDocs = await Promise.all(getApiDocs)
          api = allApiDocs.join('\n\n')
        }

        setAllPageContents(docs)
        setIndications(docs)
        setHasContext(true)

        return { docs, api }
      } else {
        setShowChatbot(false)
      }
    } catch (error) {
      console.error('Error:', error)
      setShowChatbot(false)
    }
  }

  const suggestions = [
    '¿Cómo integro PlacetoPay?',
    'Métodos de pago disponibles',
    'Estado de una transacción',
    'Problemas técnicos',
  ]

  const openai = createOpenAI({
    compatibility: 'strict',
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  })

  const AVATAR_URL =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyKQfbFObUQu4wMCYalXLZZ_xilW1J7xriag&s'

  const updateSuggestionsHeight = () => {
    if (suggestionsContentRef.current) {
      const headerHeight = 40 // Height of the suggestions header
      const contentHeight = suggestionsContentRef.current.scrollHeight
      const maxHeight = Math.min(contentHeight + headerHeight, 300) // Limitar la altura máxima a 300px
      setSuggestionsHeight(maxHeight)
    }
  }

  useEffect(() => {
    updateSuggestionsHeight()
    window.addEventListener('resize', updateSuggestionsHeight)

    return () => window.removeEventListener('resize', updateSuggestionsHeight)
  }, [suggestions, messages])

  useEffect(() => {
    let timer
    let clickCount = 0

    const handleClickOutside = (event) => {
      if (
        chatContainerRef.current &&
        !chatContainerRef.current.contains(event.target)
      ) {
        clickCount++
        if (clickCount === 1) {
          timer = setTimeout(() => {
            clickCount = 0
          }, 300) // 300ms para detectar doble clic
        } else if (clickCount === 2) {
          clearTimeout(timer)
          clickCount = 0
          setIsOpen(false)
        }
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
      clearTimeout(timer)
    }
  }, [])

  const initializeMessages = (specialty, docs, api, isGeneral) => {
    const date = new Date()
    let currentDateTime = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`

    let systemPrompt

    if (isGeneral) {
      const pageContent = document.body.innerText
      systemPrompt = `
      You are an AI general advisor and assistant for PlacetoPay called Kike Bot, focused on helping users find the best of our products that suits their situation or goal.
      ${pageContent ? `Actual User View Content: "${pageContent}"` : ''}.
      ${
        docs
          ? `Actual Introduction of Products and services in PlacetoPay: "${docs}"`
          : ''
      }.
      Current Date and Time is ${currentDateTime}.
      Use emojis to complement your responses.
      Use natural expressions to sound more human.
      Please provide a short and concrete answer.
      Importantly, do not invent information. Only base your responses on the provided resources (docs).
      If you are asked something that is not found in the documentation or provided information, kindly respond that the documentation currently does not have this information, but you can inform support to add information about this.`
    } else {
      systemPrompt = `
      You are an AI assistant for PlacetoPay called Kike Bot, specialized in ${
        specialty === 'general'
          ? 'all PlacetoPay products and services'
          : specialty
      }.
      ${docs ? `Actual Docs content: "${docs}"` : ''}
      ${api ? `Actual API Docs content: "${api}"` : ''}
      Use emojis to complement your responses.
      Use natural expressions to sound more human.
      Please provide a short and concrete answer.
      Importantly, do not invent information. Only base your responses on the provided resources (docs).
      If you are asked something that is not found in the documentation or provided information, kindly respond that the documentation currently does not have this information, but you can inform support to add information about this.`
    }

    const systemMessage = {
      role: 'system',
      content: systemPrompt,
      isBot: true,
    }

    const initialMessage = {
      role: 'assistant',
      content: getInitialMessage(specialty),
      isBot: true,
    }

    setMessages([systemMessage, initialMessage])
  }

  const initializeChat = async () => {
    const newSpecialty = extractSpecialtyFromURL()
    const context = await importContext(newSpecialty.specialtyPart)

    let docs = null
    let api = null

    if (context) {
      docs = context.docs
      api = context.api
    }

    await resetChat(newSpecialty.specialty)
    setLocale(window.location.pathname.includes('/en/') ? 'en' : 'es')

    initializeMessages(
      newSpecialty.specialty,
      docs,
      api,
      newSpecialty.specialty === 'general'
    )
  }

  const extractSpecialtyFromURL = () => {
    const path = window.location.pathname
    const parts = path.split('/')
    let specialtyPart = ''

    if (parts[1] === 'en' || parts[1] === 'es') {
      specialtyPart = parts[2]
    } else {
      specialtyPart = parts[1]
    }

    const specialtyMap = {
      payments: 'Payments',
      'payment-links': 'Payment Links',
      checkout: 'Checkout',
      microsites: 'Microsites',
      gateway: 'Gateway',
      core: 'Core',
      sdks: 'SDKs',
      'three-d-s-server': '3D Secure Server',
      ticket: 'Administración de Aerolineas PVA',
      'token-requestor': 'Token Requestor',
      'api-scudo': 'API Scudo',
      acs: 'ACS',
      'account-validator': 'Account Validator',
    }

    return {
      specialty: specialtyMap[specialtyPart] || 'general',
      specialtyPart: specialtyPart || 'general',
    }
  }

  const getInitialMessage = (newSpecialty) => {
    let initialMessage
    const isEnglish = window.location.pathname.includes('/en/')
    if (newSpecialty !== 'general' || newSpecialty !== '') {
      initialMessage = isEnglish
        ? `Hello! I'm your ${newSpecialty} Specialist at PlacetoPay. How can I help you today?`
        : `Hola! Soy tu Especialista en ${newSpecialty} en PlacetoPay. ¿En qué puedo ayudarte hoy?`
    } else {
      initialMessage = isEnglish
        ? `Hello! Welcome to PlacetoPay. Are you looking for a specific product? I'm here to help you find the best solution for you.`
        : `¡Hola! Bienvenido/a a PlacetoPay. ¿Buscas algún producto en particular? Estoy aquí para ayudarte a encontrar la mejor solución para ti.`
    }

    return initialMessage
  }

  const resetChat = async (newSpecialty) => {
    const isEnglish = window.location.pathname.includes('/en/')

    try {
      setInputMessage('')
      setIsTyping(false)
      setShowSuggestions(true)
      setIsSuggestionsExpanded(true)
      setHasContext(false)
    } catch (error) {
      console.error('Error generating initial message:', error)
      setMessages([
        {
          text: isEnglish
            ? "Hello! I'm an AI assistant for PlacetoPay. How can I help you today?"
            : '¡Hola! Soy un asistente de IA para PlacetoPay. ¿Cómo puedo ayudarte hoy?',
          isBot: true,
        },
      ])
    }
  }

  useEffect(() => {
    console.log('Mensajes actualizados:', messages)
  }, [messages])

  const startNewChat = async () => {
    const newSpecialty = extractSpecialtyFromURL()
    await resetChat(newSpecialty.specialty)
    initializeMessages(
      newSpecialty.specialty,
      allPageContents,
      null,
      newSpecialty.specialty === 'general'
    )
  }

  useEffect(() => {
    const handleURLChange = () => {
      const newSpecialty = extractSpecialtyFromURL()
      const newLocale = window.location.pathname.includes('/en/') ? 'en' : 'es'

      const specialtyChanged =
        newSpecialty.specialty !== specialty && specialty !== ''
      const localeChanged = newLocale !== locale

      setSpecialty(newSpecialty.specialty)
      setLocale(newLocale)

      if (specialtyChanged || localeChanged) {
        initializeChat()
      }
    }

    window.addEventListener('popstate', handleURLChange)

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          handleURLChange()
        }
      })
    })

    observer.observe(document, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('popstate', handleURLChange)
      observer.disconnect()
    }
  }, [specialty, locale])

  useEffect(() => {
    initializeChat()
      .then((r) => {})
      .finally(() => {})
  }, [])

  const toggleChat = () => {
    setIsFullscreen(false)
    setIsOpen(!isOpen)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleInputChange = (e) => {
    setInputMessage(e.target.value)
    adjustTextareaHeight()
  }

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`
    }
  }

  const renderers = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          language={match[1]}
          style={atomOneDark}
          customStyle={{
            padding: '1rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            margin: '1rem 0',
          }}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (inputMessage.trim() === '') return

    const newMessage = {
      role: 'user',
      content: inputMessage.replace(/\n$/, ''),
      isBot: false,
    }

    let chatMessages = null

    setMessages((prevMessages) => {
      chatMessages = [...prevMessages, newMessage]
      return chatMessages
    })
    setInputMessage('')
    setShowSuggestions(false)
    setIsSuggestionsExpanded(false)
    setHasContext(true)
    setIsTyping(true)

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    try {
      if (!allPageContents && specialty !== 'General') {
        console.error('Contenido de las páginas aún no está disponible.')
        return
      }

      const { text } = await generateText({
        model: openai('gpt-4o-mini'),
        messages: chatMessages,
      })

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: text, isBot: true },
      ])
    } catch (error) {
      console.error('Error generating response:', error)
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm sorry, I encountered an error while processing your request. Please try again later.",
          isBot: true,
          role: 'assistant',
        },
      ])
    } finally {
      setIsTyping(false)
      setShowSuggestions(true)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion)
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  const handleFeedback = (messageIndex, isPositive) => {
    console.log(
      `Feedback ${
        isPositive ? 'positivo' : 'negativo'
      } para el mensaje ${messageIndex}`
    )
  }

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } =
      messagesEndRef.current.parentElement
    const atBottom = scrollHeight - scrollTop - clientHeight < 10
    setAutoScroll(atBottom)
  }

  useEffect(() => {
    if (autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, autoScroll])

  useEffect(() => {
    const messagesContainer = messagesEndRef.current?.parentElement
    if (messagesContainer) {
      messagesContainer.addEventListener('scroll', handleScroll)
      return () => messagesContainer.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {showChatbot && (
        <div
          className={`fixed ${
            isFullscreen ? 'inset-0' : 'bottom-4 right-4'
          } z-50`}
        >
          <div
            ref={chatContainerRef}
            className={`
              chat-container overflow-hidden rounded-xl border-2 border-primary-200 bg-white shadow-2xl transition-all 
              duration-500 ease-in-out dark:border-primary-800 dark:bg-gray-900
              ${
                isOpen
                  ? 'scale-100 opacity-100'
                  : 'pointer-events-none scale-95 opacity-0'
              }
              ${
                isFullscreen
                  ? 'fixed inset-0 m-0 flex flex-col rounded-none'
                  : 'fixed bottom-4 right-4 h-[32rem] w-full sm:w-96'
              }
            `}
          >
            <div className="flex h-full flex-col">
              <div
                className={`flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 ${
                  isFullscreen ? 'h-20' : ''
                }`}
              >
                <h2
                  className={`flex items-center text-lg font-semibold text-gray-900 dark:text-white ${
                    isFullscreen ? 'text-2xl' : ''
                  }`}
                >
                  <img
                    src={AVATAR_URL}
                    alt="Kike Bot Avatar"
                    width={isFullscreen ? 56 : 40}
                    height={isFullscreen ? 56 : 40}
                    className="mr-4 rounded-full"
                  />
                  Kike Bot
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={startNewChat}
                    className="text-gray-500 transition-colors duration-300 hover:text-primary-500 focus:outline-none dark:text-gray-400 dark:hover:text-primary-400"
                    title="Iniciar nuevo chat"
                    aria-label="Iniciar nuevo chat"
                  >
                    <PlusCircle className="h-5 w-5" />
                  </button>
                  <button
                    onClick={toggleFullscreen}
                    className="text-gray-500 transition-colors duration-300 hover:text-primary-500 focus:outline-none dark:text-gray-400 dark:hover:text-primary-400"
                    title={
                      isFullscreen
                        ? 'Salir de pantalla completa'
                        : 'Pantalla completa'
                    }
                    aria-label={
                      isFullscreen
                        ? 'Salir de pantalla completa'
                        : 'Pantalla completa'
                    }
                  >
                    {isFullscreen ? (
                      <Minimize2 className="h-5 w-5" />
                    ) : (
                      <Maximize2 className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={toggleChat}
                    className="text-gray-500 transition-colors duration-300 hover:text-primary-500 focus:outline-none dark:text-gray-400 dark:hover:text-primary-400"
                    title="Cerrar chat"
                    aria-label="Cerrar chat"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p
                className={`border-b border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 ${
                  isFullscreen ? 'py-3 text-base' : ''
                }`}
              >
                {specialty === 'general'
                  ? 'Asistente General de PlacetoPay'
                  : `Especialista en ${specialty}`}
              </p>
              <div
                className={`relative flex flex-grow flex-col overflow-hidden ${
                  isFullscreen ? 'mx-auto w-full max-w-4xl' : ''
                }`}
              >
                <div
                  className={`flex-grow space-y-4 overflow-y-auto bg-gray-100 px-4 pb-8 pt-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:bg-gray-900 dark:scrollbar-thumb-gray-700 ${
                    isFullscreen ? 'px-6 text-lg' : ''
                  }`}
                  onScroll={handleScroll}
                >
                  {messages
                    .filter((message) => message.role !== 'system')
                    .map((message, index) => (
                      <div
                        key={index}
                        className={`flex 
                        ${message.isBot ? 'justify-start' : 'justify-end'} 
                      `}
                      >
                        <div
                          className={`rounded-lg p-3 ${
                            message.isBot
                              ? 'bg-white text-gray-900 shadow-md dark:bg-gray-700 dark:text-gray-100'
                              : 'bg-primary-500 text-white'
                          } max-w-[75%] transition-all duration-300 ease-out ${
                            index === messages.length - 1
                              ? 'animate-fadeIn'
                              : ''
                          }`}
                        >
                          <ReactMarkdown
                            components={renderers}
                            className="text-sm"
                          >
                            {message.content}
                          </ReactMarkdown>
                          {message.isBot && (
                            <div className="mt-2 flex justify-end space-x-2">
                              <button
                                onClick={() => handleFeedback(index, true)}
                                className="text-gray-400 transition-colors hover:text-green-500"
                                title="Esta respuesta fue útil"
                                aria-label="Esta respuesta fue útil"
                              >
                                <ThumbsUp className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleFeedback(index, false)}
                                className="text-gray-400 transition-colors hover:text-red-500"
                                title="Esta respuesta no fue útil"
                                aria-label="Esta respuesta no fue útil"
                              >
                                <ThumbsDown className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                          {!message.isBot &&
                            index === messages.length - 1 &&
                            !isTyping && (
                              <div className="mt-1 flex justify-end">
                                <Check className="h-4 w-4 text-gray-400" />
                              </div>
                            )}
                        </div>
                      </div>
                    ))}

                  {isTyping && (
                    <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-xs">
                        El asistente está escribiendo...
                      </span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                {showSuggestions && (
                  <div
                    ref={suggestionsRef}
                    className={`absolute ${
                      isFullscreen ? 'bottom-[72px]' : 'bottom-[58px]'
                    } left-0 right-0 z-10 overflow-hidden border-t border-gray-200 bg-gray-100 transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800 ${
                      isFullscreen ? 'mx-auto w-full max-w-4xl' : ''
                    }`}
                    style={{
                      maxHeight: isSuggestionsExpanded
                        ? `${suggestionsHeight}px`
                        : '40px',
                      transform: `translateY(${
                        isSuggestionsExpanded
                          ? '0'
                          : `calc(100% - ${isFullscreen ? '60px' : '40px'})`
                      })`,
                    }}
                  >
                    <div
                      className={`${
                        !isSuggestionsExpanded ? '' : ''
                      } flex h-10 items-center justify-between bg-gray-200 px-4 py-3 dark:bg-gray-700`}
                    >
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Preguntas sugeridas
                      </p>
                      <button
                        onClick={() =>
                          setIsSuggestionsExpanded(!isSuggestionsExpanded)
                        }
                        className="text-gray-600 transition-colors duration-300 hover:text-primary-500 focus:outline-none dark:text-gray-400 dark:hover:text-primary-400"
                        aria-label={
                          isSuggestionsExpanded
                            ? 'Contraer sugerencias'
                            : 'Expandir sugerencias'
                        }
                      >
                        {isSuggestionsExpanded ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <div ref={suggestionsContentRef} className="px-4 py-3">
                      <div
                        className={`${
                          isFullscreen ? 'pb-8' : ''
                        } grid grid-cols-1 gap-3 sm:grid-cols-2`}
                      >
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="truncate rounded-lg bg-white px-3 py-2 text-left text-sm text-gray-700 shadow-sm transition-colors duration-300 hover:bg-primary-100 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-primary-900"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <form
                  onSubmit={handleSendMessage}
                  className={`relative z-20 border-t border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-800 ${
                    isFullscreen ? 'mx-auto w-full max-w-4xl p-4' : ''
                  }`}
                >
                  <div className="flex items-end gap-2">
                    <textarea
                      ref={textareaRef}
                      value={inputMessage}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      className={`flex-grow resize-none overflow-hidden rounded-lg border border-gray-300 bg-gray-100 p-2 text-sm text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-primary-400 ${
                        isFullscreen
                          ? 'max-h-[200px] min-h-[3.5rem] p-3 text-base'
                          : 'max-h-[150px] min-h-[2.5rem]'
                      }`}
                      placeholder="Escribe tu pregunta o código aquí..."
                      rows={1}
                      aria-label="Mensaje"
                    />
                    <button
                      type="submit"
                      className={`transform rounded-lg bg-primary-500 p-2 text-white transition-all duration-300 hover:scale-105 hover:bg-primary-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                        isFullscreen ? 'p-4' : ''
                      }`}
                      disabled={isTyping || inputMessage.trim() === ''}
                      title="Enviar mensaje"
                      aria-label="Enviar mensaje"
                    >
                      <Send
                        className={`${isFullscreen ? 'h-7 w-7' : 'h-5 w-5'}`}
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {showChatbot && (
        <button
          onClick={toggleChat}
          className={`fixed bottom-4 right-4 z-10 transform rounded-full bg-primary-500 p-3
            text-white shadow-lg transition-all 
            duration-300 hover:rotate-3 hover:scale-110 hover:bg-primary-400 focus:outline-none
            ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
          `}
          title="Abrir chat de ayuda"
          aria-label="Abrir chat de ayuda"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </>
  )
}
