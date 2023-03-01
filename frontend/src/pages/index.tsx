import styles from '@src/styles/Home.module.scss'

import Link from 'next/link'

import { FormEvent, useContext, useState } from 'react'

import { LoadingButton } from '@src/components/Button'
import { Input } from '@src/components/Input'
import Logo from '@src/components/Logo'
import Page from '@src/components/Page'
import ToggleTheme from '@src/components/ToggleTheme'
import { AuthContext } from '@src/contexts/AuthContext'
import { GuestGuard } from '@src/utils/GuestGuard'
import { toast } from 'react-toastify'

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
				<div className={styles.toggleTheme}>
					<ToggleTheme />
				</div>
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
							<LoadingButton loading={loading} type='submit'>
								Acessar
							</LoadingButton>
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

export const getServerSideProps = GuestGuard(async (context) => {
	return {
		props: {}
	}
})

