import prisma from '../../prisma'

interface ProductRequest {
	categoryId: string
}

class ListByCategoryService {
	async execute({ categoryId }: ProductRequest) {
    const findByCategory = await prisma.product.findMany({
      where: {
        categoryId
      }
    })
    return findByCategory
  }
}

export { ListByCategoryService }
