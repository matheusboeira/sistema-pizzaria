import { createContext, useEffect, useState } from 'react'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { api } from '@src/services/api'
import { toast } from 'react-toastify'

type UserProps = {
	id: string
	name: string
	email: string
}

type SignInProps = {
	email: string
	password: string
}

type SignUpProps = {
	name: string
	email: string
	password: string
}

type AuthContextData = {
	user: UserProps | undefined
	isAuthenticated: boolean
	signIn: (credentials: SignInProps) => Promise<void>
	signUp: (credentials: SignUpProps) => Promise<void>
	signOut: () => void
}

type AuthProviderProps = {
	children: React.ReactNode
}

const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME as string

const signOut = () => {
	try {
		destroyCookie(undefined, TOKEN_NAME)
		Router.push('/')
	} catch {
		console.log('Error ao deslogar.')
	}
}

const AuthContext = createContext({} as AuthContextData)

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<UserProps>()
	const isAuthenticated = !!user

	useEffect(() => {
		const { [`${TOKEN_NAME}`]: token } = parseCookies()

		if (token) {
			api
				.get('/details')
				.then((response) => {
					const { id, name, email } = response.data
					setUser({ id, name, email })
				})
				.catch(() => {
					signOut()
				})
		}
	}, [])

	const signIn = async ({ email, password }: SignInProps) => {
		try {
			const response = await api.post('/login', {
				email,
				password
			})

			const { id, name, token } = response.data

			setCookie(undefined, TOKEN_NAME, token, {
				maxAge: 3600 * 24 * 30,
				path: '/'
			})
			setUser({ id, name, email })
			api.defaults.headers['Authorization'] = `Bearer ${token}`

			toast.success('Logado com sucesso!')
			Router.push('/dashboard')
		} catch (err) {
			toast.error('Email ou senha incorretos.')
			console.log(err)
		}
	}

	const signUp = async ({ name, email, password }: SignUpProps) => {
		try {
			await api.post('/signup', {
				name,
				email,
				password
			})
			toast.success('Conta criada com sucesso!')
			Router.push('/')
		} catch (err) {
			toast.error('Erro ao cadastrar.')
			console.log(err)
		}
	}

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, signIn, signOut, signUp }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthProvider, signOut, TOKEN_NAME }
