export const ValidationSchema = {
  admin: {
    addAdmin: {
      email: 'required|email',
      password: 'required|minLength:8',
      firstName: 'string',
      lastName: 'string',
    },
    updateAdmin: {
      email: 'required|email',
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
};
