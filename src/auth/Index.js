export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false
  }

  if (localStorage.getItem('token')) {
    return JSON.parse(localStorage.getItem('token'))
  } else {
    return false
  }
}

export const authenticate = (token, callback) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', JSON.stringify(token))
    callback()
  }
}

export const logout = (next) => {
    if (typeof window !== 'undefined') localStorage.removeItem('token')
    next()
  }