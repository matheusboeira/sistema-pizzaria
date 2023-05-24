import styles from './Product.module.scss'

import Image from 'next/image'
import { ChangeEvent, FormEvent, useState } from 'react'
import { FiUpload } from 'react-icons/fi'

import { Button } from '@src/components/Button'
import Header from '@src/components/Header'
import { Input } from '@src/components/Input'
import Page from '@src/components/Page'

import { api, setupAPI } from '@src/services/api'
import { AuthGuard } from '@src/utils/AuthGuard'
import { toast } from 'react-toastify'

interface ItemProps {
	id: string
	name: string
}

interface CategoryProps {
	categoryList: ItemProps[]
}

interface ProductProps {
	name: string
	price: string
	description: string
}

const initialProductState = {
	name: '',
	price: '',
	description: ''
}

const Product = ({ categoryList }: CategoryProps) => {
	const [product, setProduct] = useState<ProductProps>(initialProductState)
	const [categories] = useState(categoryList)
	const [categorySelected, setCategorySelected] = useState(0)
	const [image, setImage] = useState<File | null>(null)
	const [imageUrl, setImageUrl] = useState('')

	const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
		const image = e.target.files

		if (!image || !image[0]) {
			return
		}

		if (image[0].type === 'image/png' || image[0].type === 'image/jpeg') {
			setImage(image[0])
			setImageUrl(URL.createObjectURL(image[0]))
		}
	}

	const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
		setCategorySelected(+e.target.value)
	}

	const handleChange = (fieldName: keyof ProductProps, value: string) => {
		setProduct({ ...product, [fieldName]: value })
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		try {
			if (
				product.name === '' ||
				product.price === '' ||
				product.description === '' ||
				image === null
			) {
				toast.error('Por favor, preencha todos os campos.')
				return
			}
			const data = new FormData()

			data.append('name', product.name)
			data.append('price', product.price)
			data.append('description', product.description)
			data.append('categoryId', categories[categorySelected].id)
			data.append('file', image)

			await api.post('/product', data)

			toast.success('Produto cadastrado com sucesso!')
		} catch (err) {
			toast.error('Opss! Erro ao cadastrar.')
		}
		setProduct(initialProductState)
		setImage(null)
		setImageUrl('')
	}

	return (
		<Page title='Novo produto'>
			<div>
				<Header />
				<main className={styles.container}>
					<h1 className='text-2xl mb-4'>Novo Produto</h1>
					<label className={styles.avatar}>
						<span>
							<FiUpload size={30} color='#fff' />
						</span>
						<input
							type='file'
							accept='image/png, image/jpeg'
							onChange={handleFile}
						/>
						{image && (
							<Image
								className={styles.preview}
								src={imageUrl}
								alt={'Foto do produto'}
								width={250}
								height={250}
							/>
						)}
					</label>
					<form onSubmit={handleSubmit}>
						<select value={categorySelected} onChange={handleChangeCategory}>
							{categories.map((category, index) => (
								<option key={category.id} value={index}>
									{category.name}
								</option>
							))}
						</select>
						<Input
							value={product.name}
							onChange={(e) => handleChange('name', e.target.value)}
							placeholder='Digite o nome do produto'
						/>
						<Input
							type='number'
							value={product.price}
							onChange={(e) => handleChange('price', e.target.value)}
							placeholder='Preço do produto'
						/>
						<Input
							value={product.description}
							onChange={(e) => handleChange('description', e.target.value)}
							className='mt-4'
							placeholder='Descreva seu produto...'
						/>
						<Button type='submit' variant='secondary'>
							Cadastrar
						</Button>
					</form>
				</main>
			</div>
		</Page>
	)
}

export default Product

export const getServerSideProps = AuthGuard(async (ctx) => {
	const api = setupAPI(ctx)
	const response = await api.get('/categories')

	return {
		props: {
			categoryList: response.data
		}
	}
})
