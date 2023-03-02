import styles from './Category.module.scss'

import Head from 'next/head'
import { FormEvent, useState, useEffect } from 'react'

import Header from '@src/components/Header'
import { Button } from '@src/components/Button'
import { Input } from '@src/components/Input'

import { api } from '@src/services/api'
import { toast } from 'react-toastify'
import { AuthGuard } from '@src/utils/AuthGuard'
import { setupAPI } from '../../services/api';

interface ItemProps {
	id: string
	name: string
}

interface CategoryProps {
	categories: ItemProps[]
}

const Category = ({ categories }: CategoryProps) => {
	const [name, setName] = useState('')
	const [category, setCategory] = useState(categories || [])

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		if (name === '') {
			toast.error('Por favor, preencha o nome.')
			return
		}

		await api.post('/category', { name: name })

		toast.success('Categoria cadastrada com sucesso!', {
			position: 'bottom-right'
		})
		setName('')
	}

	return (
		<>
			<Head>
				<title>Nova Categoria - SujeitoPizzaria</title>
			</Head>
			<Header />
			<main className={styles.container}>
				<h1 className='text-2xl'>Cadastrar Categoria</h1>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Input
						className={styles.input}
						placeholder='Digite o nome da categoria'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Button variant='secondary'>Cadastrar</Button>
				</form>
				<div className={styles.list}>
					<h2 className='text-2xl mb-3'>Categorias Cadastradas</h2>
					<table className='w-full text-sm text-left text-gray-500 table-fixed'>
						<thead className='text-xs uppercase bg-gray-700 text-gray-400'>
							<tr>
								<th scope='col' className='px-6 py-3'>
									Nome
								</th>
								<th scope='col' className='hidden sm:block px-6 py-3 '>
									ID da Categoria
								</th>
							</tr>
						</thead>
						<tbody>
							{category.map((c) => (
								<tr
									className='border-b bg-gray-800 border-gray-700 hover:bg-gray-500 hover:text-black'
									key={c.id}
								>
									<th
										scope='row'
										className='px-6 py-4 font-medium whitespace-nowrap text-white'
									>
										{c.name}
									</th>
									<td className='hidden sm:block px-6 py-4'>{c.id}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</main>
		</>
	)
}

export default Category

export const getServerSideProps = AuthGuard(async (context) => {
	const api = setupAPI(context)
	const response = await api.get('categories')

	return {
		props: {
			categories: response.data
		}
	}
})
