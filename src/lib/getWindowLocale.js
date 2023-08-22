export const getWindowLocale = () => {
  let locale = window.location.pathname.split('/')[1]
  return locale.length === 2 ? locale : 'es'
}
