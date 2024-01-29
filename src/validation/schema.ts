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
      password: 'required|string|minLength:8',
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
      password: 'required|string|minLength:8',
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
      price: 'required|decimal',
    },
    updateProduct: {
      name: 'required|string',
      description: 'required|string',
      images: 'required',
      price: 'required|decimal',
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
      quantity: 'required|decimal|min:1',
    },
  },
  review: {
    addReview: {
      product: 'string|required',
      rating: 'required|decimal|min:-1|max:5',
      comment: 'required|string',
    },
  },
}
