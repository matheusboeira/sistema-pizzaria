import { signOut } from '@src/contexts/AuthContext'
import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'

export const setupAPI = (context: any = undefined) => {
	let cookies = parseCookies(context)

	const api = axios.create({
		baseURL: process.env.NEXT_PUBLIC_BASEURL_API,
		headers: {
			Authorization: `Bearer ${
				cookies[process.env.NEXT_PUBLIC_TOKEN_NAME as string]
			}`
		}
	})

	api.interceptors.response.use(
		(response) => {
			return response
		},
		(error: AxiosError) => {
			if (error.response?.status === 401) {
				if (typeof window !== undefined) {
					signOut()
				} else {
					return Promise.reject(new AuthTokenError())
				}
			}
			return Promise.reject(error)
		}
	)
	return api
}

export const api = setupAPI()
