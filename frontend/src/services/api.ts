import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'
import { signOut } from '@src/contexts/AuthContext'

const setupAPI = (context = undefined) => {
	let cookies = parseCookies(context)

	const api = axios.create({
		baseURL: 'http://localhost:5000',
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
