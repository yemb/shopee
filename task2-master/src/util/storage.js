export const setValue = function (key, value) {
  localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value)
}

export const getValue = function (key) {
  if (localStorage.getItem(key) !== undefined) {
    return JSON.parse(localStorage.getItem(key))
  }
  return null
}
export const clear = function () {
  localStorage.clear()
}
