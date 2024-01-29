import {
  createProduct,
  getProductById,
  getProductList,
  updateProductDetails,
} from '../services/product.service'
import { Controller, Document, IProduct, Request, Response } from '../types'
import { Logger } from '../utils/logger.util'
import { getErrorResponse } from '../utils/response.util'

export const addProduct: Controller = async (
  request: Request<IProduct>,
  response: Response,
) => {
  try {
    const { name, description, images, price } = request.body
    const record: Document = await createProduct({
      name,
      description,
      images,
      price,
    })

    return response.status(201).send({
      data: {
        name,
        description,
        images,
        price,
        id: record?._id,
      },
      errors: null,
    })
  } catch (err) {
    Logger.error(err)
    return getErrorResponse(response, err)
  }
}

type InputUpdateProduct = Partial<IProduct>
export const updateProduct: Controller = async (
  request: Request<InputUpdateProduct, { id: string }>,
  response: Response,
) => {
  try {
    const { name, description, images, price } = request.body
    const { id } = request.params

    const record = await updateProductDetails(id, {
      name,
      description,
      images,
      price,
    })

    return response.status(200).send({
      data: {
        name,
        description,
        images,
        price,
        id: record?._id,
      },
      errors: null,
    })
  } catch (err) {
    Logger.error(err)
    return getErrorResponse(response, err)
  }
}

export const deleteProduct: Controller = async (
  request: Request<object, { id: string }>,
  response: Response,
) => {
  try {
    const { id } = request.params
    const details = await updateProductDetails(id, { active: false })
    return response.status(200).send({
      data: {
        name: details?.name,
        description: details?.description,
        images: details?.images,
        price: details?.price,
        active: details?.active,
      },
      errors: null,
    })
  } catch (err) {
    Logger.error(err)
    return getErrorResponse(response, err)
  }
}

export const productDetails: Controller = async (
  request: Request<object, { id: string }>,
  response: Response,
) => {
  try {
    const { id } = request.params
    const details = await getProductById(id)
    return response.status(200).send({
      data: {
        name: details?.name,
        description: details?.description,
        images: details?.images,
        price: details?.price,
      },
      errors: null,
    })
  } catch (err) {
    Logger.error(err)
    return getErrorResponse(response, err)
  }
}

export const productList: Controller = async (
  request: Request,
  response: Response,
) => {
  try {
    const details = await getProductList()
    return response.status(200).send({
      data: details,
      errors: null,
    })
  } catch (err) {
    Logger.error(err)
    return getErrorResponse(response, err)
  }
}
