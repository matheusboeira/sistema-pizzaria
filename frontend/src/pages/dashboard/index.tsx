import styles from './Dashboard.module.scss'

import Header from '@src/components/Header'
import Head from 'next/head'
import { FiRefreshCcw } from 'react-icons/fi'
import { AuthGuard } from '../../utils/AuthGuard'
import { setupAPI } from '@src/services/api'
import { useState } from 'react'

interface OrderProps {
	id: string
	table: number
	status: boolean
	draft: boolean
	name: string | null
}

const Dashboard = ({ orders }: { orders: OrderProps[] }) => {
	const [orderList, setOrderList] = useState(orders)

	const handleModalView = (id: string) => {
		console.log('id', id)
	}

	return (
		<>
			<Head>
				<title>Painel - SujeitoPizzaria</title>
			</Head>
			<Header />
			<main className={styles.container}>
				<div className={styles.containerHeader}>
					<h1 className='text-2xl'>Últimos Pedidos</h1>
					<button>
						<FiRefreshCcw size={25} color='#3fffa3' />
					</button>
				</div>
				<article className={styles.listOrders}>
					{orderList.map((order) => (
						<section
							key={order.id}
							className={styles.orderItem}
							onClick={() => handleModalView(order.id)}
						>
							<button>
								<div className={styles.tag} />
								<span>Mesa {order.table}</span>
							</button>
						</section>
					))}
				</article>
			</main>
		</>
	)
}

export default Dashboard

export const getServerSideProps = AuthGuard(async (context) => {
	const api = setupAPI(context)
	const response = await api.get('/orders')

	return {
		props: {
			orders: response.data
		}
	}
})
