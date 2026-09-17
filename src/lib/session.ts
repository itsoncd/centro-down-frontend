import { useUserStore } from '@/store/user.store'

// "AUTH_TOKEN" and "token" are leftovers from the JWT era and are only removed.
const LEGACY_KEYS = ['rol', 'roles', 'AUTH_TOKEN', 'token']

export const clearClientSession = () => {
  useUserStore.getState().clearUser()
  LEGACY_KEYS.forEach((key) => localStorage.removeItem(key))
}

export const redirectToLogin = () => {
  if (window.location.pathname !== '/login') window.location.assign('/login')
}
