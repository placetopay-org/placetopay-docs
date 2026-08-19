import { create } from 'zustand'

let nextId = 0

const ROLE_BY_TITLE = {
  solicitud: 'request',
  request: 'request',
  respuesta: 'response',
  response: 'response',
}

export const getCodeRole = (title = '') =>
  ROLE_BY_TITLE[String(title).trim().toLowerCase()] ?? null

export const getPairMap = (entries) => {
  const pairMap = new Map()
  let pending = null

  for (const entry of entries) {
    if (entry.role === 'request') {
      pending = entry.id
    } else if (entry.role === 'response' && pending != null) {
      pairMap.set(pending, entry.id)
      pending = null
    }
  }

  return pairMap
}

export const useCodePairingStore = create((set) => ({
  entries: [],
  register: (entry) => {
    const id = ++nextId
    set((state) => ({ entries: [...state.entries, { ...entry, id }] }))
    return id
  },
  updateEntry: (id, patch) =>
    set((state) => ({
      entries: state.entries.map((entry) =>
        entry.id === id ? { ...entry, ...patch } : entry
      ),
    })),
  unregister: (id) =>
    set((state) => ({
      entries: state.entries.filter((entry) => entry.id !== id),
    })),
}))
