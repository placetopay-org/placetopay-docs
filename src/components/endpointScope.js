let current = null

export const setScopeEndpoint = (tag, label, id = null) => {
  current = { tag, label, id }
}

export const getScopeEndpoint = () => current