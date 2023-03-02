import Head from 'next/head'
import { ReactNode } from 'react'
import Header from './Header'

interface PageProps {
	title: string
	meta?: ReactNode
	children: ReactNode
}

const Page = ({ title, meta, children }: PageProps) => {
	return (
		<>
			<Head>
				<title>{`${title} | SujeitoPizzaria`}</title>
				{meta}
			</Head>
			<div>
				{children}
			</div>
		</>
	)
}

export default Page
