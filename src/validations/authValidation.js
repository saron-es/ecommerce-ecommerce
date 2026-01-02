const validator = require('validator');

const validateRegister = ({ username, email, password }) => {
  const errors = [];

  if (!username || !/^[a-zA-Z0-9]+$/.test(username)) {
    errors.push('Username must be alphanumeric and is required.');
  }

  if (!email || !validator.isEmail(email)) {
    errors.push('Valid email is required.');
  }

  if (
    !password ||
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[!@#$%^&*]/.test(password)
  ) {
    errors.push(
      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
    );
  }

  return errors;
};

module.exports = { validateRegister };
