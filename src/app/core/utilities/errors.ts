export const Erros = {
  email: [
    { type: 'required', message: 'Email is required' },
    { type: 'email', message: 'Enter a valid email' },
  ],
  confirmPassword: [
    { type: 'required', message: 'Confirm password is required' },
    { type: 'notEqual', message: 'Password mismatch' }
  ],
  verifyPassword: [
    { type: 'required', message: 'Please Retype Your new Password' },
    { type: 'notEqual', message: 'Password mismatch' }
  ],
  oldPassword: [
    { type: 'required', message: 'Old password is required' }
  ],
  password: [
    { type: 'required', message: 'Password is required' },
    { type: 'pattern', message: 'Please enter a valid Password.' }
  ],
  newPassword: [
    { type: 'required', message: 'New Password is required' },
    { type: 'pattern', message: 'Please enter a valid Password.' }
  ],
  firstName: [
    { type: 'required', message: 'First Name is required' }
  ],
  lastName: [
    { type: 'required', message: 'Last Name is required' }
  ],
  mobile: [
    { type: 'required', message: 'Mobile Number required' },
    { type: 'pattern', message: 'Enter a valid Mobile number' }
  ],
};
