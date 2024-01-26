import { AdminModel } from '../models/admin.model'
import { Document, IAdmin } from '../types'

export const createAdmin = async (data: IAdmin): Promise<Document> => {
  const admin = await AdminModel.create({
    email: data?.email?.toLowerCase(),
    password: data?.password,
    firstName: data?.firstName?.toLowerCase(),
    lastName: data?.lastName?.toLowerCase(),
  })
  admin.save()
  return admin
}

export const updateAdminDetails = (
  id: string,
  data: Partial<IAdmin>,
): Promise<Document> => {
  return AdminModel.findOneAndUpdate({ _id: id }, data, { new: true })
}

export const getAdminByEmail = (
  email: string,
  projection?: string | string[] | Record<string, number | boolean | object>,
): Promise<Document<IAdmin> | null> => {
  const query = AdminModel.findOne({ email: email })
  if (projection) {
    return query?.select(projection).exec()
  }
  return query.exec()
}
