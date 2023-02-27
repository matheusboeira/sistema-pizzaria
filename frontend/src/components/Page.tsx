import Head from 'next/head'
import { ReactNode } from 'react'

interface PageProps {
	title: string
	meta?: ReactNode
	children: ReactNode
}

const Page = ({ title = '', meta, children }: PageProps) => {
	return (
		<>
			<Head>
				<title>{`${title} | SujeitoPizzaria`}</title>
				{meta}
			</Head>
			<div>{children}</div>
		</>
	)
}

export default Page
