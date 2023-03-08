import Head from 'next/head'
import Link from 'next/link'

import { Input } from '@src/components/Input'
import styles from '@src/styles/Home.module.scss'

import Logo from '@src/components/Logo'
import { AuthContext } from '@src/contexts/AuthContext'
import { FormEvent, useContext, useState } from 'react'

import { toast } from 'react-toastify'
import { GuestGuard } from '../../utils/GuestGuard'
import { LoadingButton } from '@src/components/Button'

type SignUpUser = {
	name: string
	email: string
	password: string
	confirmPassword: string
}

export default function SignUp() {
	const { signUp } = useContext(AuthContext)

	const [loading, setLoading] = useState(false)
	const [user, setUser] = useState<SignUpUser>({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	})

	const handleChange = (fieldName: keyof SignUpUser, value: string) => {
		setUser({ ...user, [fieldName]: value })
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		if (user.password !== user.confirmPassword) {
			toast.error('As senhas não coincidem.')
			return
		}

		if (Object.values(user).some((value) => value === '')) {
			toast.warn('Por favor, preencha todos os campos.')
			return
		}
		setLoading(true)

		await signUp({
			name: user.name,
			email: user.email,
			password: user.password
		})
		setLoading(false)
	}

	return (
		<>
			<Head>
				<title>SujeitoPizza - Faça seu cadastro</title>
			</Head>
			<div className={styles.container}>
				<Logo />
				<div className={styles.login}>
					<h1>Cadastro de Conta</h1>
					<form onSubmit={handleSubmit}>
						<Input
							placeholder='Digite seu nome'
							value={user.name}
							onChange={(e) => handleChange('name', e.target.value)}
						/>
						<Input
							placeholder='Digite seu e-mail'
							value={user.email}
							onChange={(e) => handleChange('email', e.target.value)}
							type='email'
						/>
						<Input
							placeholder='Digite sua senha'
							type='password'
							value={user.password}
							onChange={(e) => handleChange('password', e.target.value)}
						/>
						<Input
							placeholder='Confirme sua senha'
							type='password'
							value={user.confirmPassword}
							onChange={(e) => handleChange('confirmPassword', e.target.value)}
						/>
						<LoadingButton loading={loading} type='submit'>
							Acessar
						</LoadingButton>
					</form>
					<Link href='/' className={styles.text}>
						Já possui uma conta? <span>Faça login!</span>
					</Link>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps = GuestGuard(async (context) => {
	return {
		props: {}
	}
})
