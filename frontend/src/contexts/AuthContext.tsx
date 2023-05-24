import Router from 'next/router'

import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { createContext, useEffect, useState } from 'react'

import { api } from '@src/services/api'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

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
  } catch (err) {
    toast.error('Erro ao deslogar.')
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

      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        html: 'Login efetuado com sucesso.',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true
      })

      Router.push('/dashboard')
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        timer: 3000,
        timerProgressBar: true,
        html: err.response.data.message ?? 'Unknown error'
      })
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
