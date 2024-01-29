export const ValidationSchema = {
  admin: {
    addAdmin: {
      email: 'required|email',
      password: 'required|minLength:8',
      firstName: 'string|required',
      lastName: 'string|required',
    },
    updateAdmin: {
      firstName: 'string',
      lastName: 'string',
    },
    resetPassword: {
      currentPassword: 'required|string|minLength:8',
      newPassword: 'required|string|minLength:8',
    },
    login: {
      email: 'required|email',
      password: 'required',
    },
  },
  user: {
    addUser: {
      email: 'required|email',
      password: 'required|minLength:8',
      firstName: 'string|required',
      lastName: 'string|required',
    },
    updateUser: {
      firstName: 'string',
      lastName: 'string',
    },
    resetPassword: {
      currentPassword: 'required|string|minLength:8',
      newPassword: 'required|string|minLength:8',
    },
    login: {
      email: 'required|email',
      password: 'required',
    },
  },
  product: {
    addProduct: {
      name: 'required|string',
      description: 'required|string',
      images: 'required',
      price: 'required|number',
    },
    updateProduct: {
      name: 'required|string',
      description: 'required|string',
      images: 'required',
      price: 'required|number',
    },
    deleteProduct: {
      id: 'required|string',
    },
    getProductDetails: {
      id: 'required|string',
    },
  },
  order: {
    placeOrder: {
      productId: 'required|string',
      quantity: 'required|number|min:1',
    },
  },
}
