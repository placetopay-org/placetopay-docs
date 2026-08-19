let current = null

export const setScopeEndpoint = (tag, label) => {
  current = { tag, label }
}

export const getScopeEndpoint = () => current