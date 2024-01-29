import { UserModel } from '../models/user.model'
import { Document, IUser } from '../types'

export const createUser = async (data: IUser): Promise<Document<IUser>> => {
  const user = await UserModel.create({
    email: data?.email?.toLowerCase(),
    password: data?.password,
    firstName: data?.firstName?.toLowerCase(),
    lastName: data?.lastName?.toLowerCase(),
  })
  user.save()
  return user
}

export const updateUserDetails = (
  id: string,
  data: Partial<IUser>,
): Promise<Document<IUser> | null> => {
  return UserModel.findOneAndUpdate({ _id: id }, data, { new: true })
}

export const getUserByEmail = (
  email: string,
  projection?: string | string[] | Record<string, number | boolean | object>,
): Promise<Document<IUser> | null> => {
  const query = UserModel.findOne({ email: email })
  if (projection) {
    return query?.select(projection).exec()
  }
  return query.exec()
}

export const getUserList = (
  projection?: string | string[] | Record<string, number | boolean | object>,
) => {
  if (projection) {
    return UserModel.find({}, projection)
  }
  return UserModel.find({})
}
