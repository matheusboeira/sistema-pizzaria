import styles from './Category.module.scss'

import Head from 'next/head'
import { FormEvent, useState, useEffect } from 'react'

import Header from '@src/components/Header'
import { Button } from '@src/components/Button'
import { Input } from '@src/components/Input'

import { api } from '@src/services/api'
import { toast } from 'react-toastify'
import { onlyAuth } from '@src/utils/onlyAuth'

type CategoryProps = {
	id?: string
	name?: string
}

const Category = () => {
	const [name, setName] = useState('')
	const [category, setCategory] = useState<CategoryProps[]>([])

	useEffect(() => {
		const fetchCategories = async () => {
			let categories = await api.get('categories')
			setCategory(categories.data)
		}

		fetchCategories().catch(console.error)
	}, [category])

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		if (name === '') {
			toast.error('Por favor, preencha o nome.')
			return
		}

		await api.post('/category', { name })
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
					<Button className={styles.button}>Cadastrar</Button>
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

export const getServerSideProps = onlyAuth(async (context) => {
	return {
		props: {}
	}
})