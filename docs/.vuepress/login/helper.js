export const STORAGE_KEY = 'note_leichu'
export const name = 'leichu'
export const pwd = '39d85e0321db86c5225eaa7b89edb075'

export function checkAuth () {
  const auth = JSON.parse(sessionStorage.getItem(STORAGE_KEY))
  return auth && Object.keys(auth).length && auth['name'] == name && auth['pwd'] == pwd
}