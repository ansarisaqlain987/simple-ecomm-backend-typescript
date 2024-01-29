import { ProductModel } from '../models/products.model'
import { Document, IProduct } from '../types'

export const createProduct = async (data: IProduct): Promise<Document> => {
  const product = await ProductModel.create({
    name: data?.name,
    description: data?.description,
    images: data?.images,
    price: data?.price,
  })
  product.save()
  return product
}

export const updateProductDetails = (
  id: string,
  data: Partial<IProduct>,
): Promise<Document<IProduct> | null> => {
  return ProductModel.findOneAndUpdate({ _id: id }, data, { new: true })
}

export const getProductById = (
  id: string,
  projection?: string | string[] | Record<string, number | boolean | object>,
): Promise<Document<IProduct> | null> => {
  if (projection) {
    return ProductModel.findById(id, projection).exec()
  }
  return ProductModel.findById(id).exec()
}

export const getProductByIds = (
  ids: string[],
): Promise<Document<IProduct>[]> => {
  return ProductModel.find({ _id: { $in: ids } }).exec()
}

export const getProductList = (
  projection?: string | string[] | Record<string, number | boolean | object>,
) => {
  if (projection) {
    return ProductModel.find({}, projection)
  }
  return ProductModel.find({})
}
