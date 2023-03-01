import Header from '@src/components/Header'
import Head from 'next/head'
import { AuthGuard } from '../../utils/AuthGuard'

const Dashboard = () => {
	return (
		<>
			<Head>
				<title>Painel - SujeitoPizzaria</title>
			</Head>
			<div>
				<Header />
			</div>
		</>
	)
}

export default Dashboard

export const getServerSideProps = AuthGuard(async (context) => {
	return {
		props: {}
	}
})
