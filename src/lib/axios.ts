import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { clearClientSession, redirectToLogin } from './session'

const baseURL = import.meta.env.VITE_API_URL
if (!baseURL) throw new Error('VITE_API_URL is not defined')

// The API origin is needed to reach the CSRF endpoint, which lives outside /api
export const API_ORIGIN = new URL(baseURL).origin

// withXSRFToken is required: axios only adds X-XSRF-TOKEN automatically for
// same-origin requests, and the SPA and the API run on different ports.
const sessionConfig = { withCredentials: true, withXSRFToken: true } as const

export const api = axios.create({
  baseURL,
  ...sessionConfig,
  headers: {
    'Content-Type': 'application/json',
  },
})

const csrfClient = axios.create({
  baseURL: API_ORIGIN,
  ...sessionConfig,
})

let csrfRequest: Promise<void> | null = null

export const ensureCsrf = (): Promise<void> =>
  (csrfRequest ??= csrfClient
    .get('/sanctum/csrf-cookie')
    .then(() => undefined)
    .finally(() => {
      csrfRequest = null
    }))

// These endpoints report "not authenticated" as part of their own flow, so they
// must not trigger the global logout redirect.
const AUTH_ENDPOINTS = ['/login', '/auth/user', '/logout']

const isAuthEndpoint = (url?: string) =>
  !!url && AUTH_ENDPOINTS.some((path) => url.endsWith(path))

type RetryableConfig = InternalAxiosRequestConfig & { csrfRetried?: boolean }

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetryableConfig | undefined
    const status = error.response?.status

    if (status === 419 && config && !config.csrfRetried) {
      config.csrfRetried = true
      await ensureCsrf()
      return api.request(config)
    }

    if (status === 401 && !isAuthEndpoint(config?.url)) {
      clearClientSession()
      redirectToLogin()
    }

    return Promise.reject(error)
  }
)
