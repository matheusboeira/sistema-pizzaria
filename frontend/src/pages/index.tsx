import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@src/components/Button'
import { Input } from '@src/components/Input'
import styles from '@src/styles/Home.module.scss'

import logoImg from '@public/logo.svg'

export default function Home() {
	return (
		<>
			<Head>
				<title>SujeitoPizza - Faça seu login</title>
			</Head>
			<div className={styles.container}>
				<Image src={logoImg} alt='Logo Sujeito Pizzaria' />
				<div className={styles.login}>
					<form>
						<Input placeholder='Digite seu e-mail' />
						<Input placeholder='Digite sua senha' type='password' />
						<Button>Acessar</Button>
					</form>
					<Link href='/signup' className={styles.text}>
						Não possui uma conta? <span>Cadastre-se</span>
					</Link>
				</div>
			</div>
		</>
	)
}

