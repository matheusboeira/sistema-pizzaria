import Head from 'next/head'
import Link from 'next/link'

import { Button } from '@src/components/Button'
import { Input } from '@src/components/Input'
import { AuthContext } from '@src/contexts/AuthContext'
import { FormEvent, useContext, useState } from 'react'

import styles from '@src/styles/Home.module.scss'
import Logo from '@src/components/Logo'

export default function Home() {
	const { signIn } = useContext(AuthContext)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setLoading(true)
		await signIn({ email, password })
		setLoading(false)
	}

	return (
		<>
			<Head>
				<title>SujeitoPizza - Faça seu login</title>
			</Head>
			<div className={styles.container}>
				<Logo />
				<div className={styles.login}>
					<form onSubmit={handleSubmit}>
						<Input
							placeholder='Digite seu e-mail'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type='email'
							required
						/>
						<Input
							placeholder='Digite sua senha'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<Button loading={loading}>Acessar</Button>
					</form>
					<Link href='/signup' className={styles.text}>
						Não possui uma conta? <span>Cadastre-se</span>
					</Link>
				</div>
			</div>
		</>
	)
}

