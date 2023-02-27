import styles from '@src/styles/Home.module.scss'

import Head from 'next/head'
import Link from 'next/link'

import { FormEvent, useContext, useState } from 'react'

import { Button } from '@src/components/Button'
import { Input } from '@src/components/Input'
import Logo from '@src/components/Logo'
import { AuthContext } from '@src/contexts/AuthContext'
import { onlyGuests } from '@src/utils/onlyGuests'
import { toast } from 'react-toastify'
import Page from '@src/components/Page'

export default function Home() {
	const { signIn } = useContext(AuthContext)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		if (email === '' || password === '') {
			toast.warn('Por favor, preencha todos os campos.')
			return
		}

		setLoading(true)
		await signIn({ email, password })
		setLoading(false)
	}

	return (
		<>
			<Page title='Faça seu login'>
				<div className={styles.container}>
					<Logo />
					<div className={styles.login}>
						<form onSubmit={handleSubmit}>
							<Input
								placeholder='Digite seu e-mail'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type='email'
							/>
							<Input
								id='password'
								placeholder='Digite sua senha'
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Button loading={loading} type='submit'>
								Acessar
							</Button>
						</form>
						<Link href='/signup' className={styles.text}>
							Não possui uma conta? <span>Cadastre-se</span>
						</Link>
					</div>
				</div>
			</Page>
		</>
	)
}

export const getServerSideProps = onlyGuests(async (context) => {
	return {
		props: {}
	}
})

