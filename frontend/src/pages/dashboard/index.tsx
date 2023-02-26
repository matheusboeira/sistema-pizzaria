import Header from '@src/components/Header'
import Head from 'next/head'
import { onlyAuth } from '../../utils/onlyAuth'

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

export const getServerSideProps = onlyAuth(async (context) => {
	return {
		props: {}
	}
})
