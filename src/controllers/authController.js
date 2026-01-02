const bcrypt = require('bcrypt');
const User = require('../models/User');
const { validateRegister } = require('../validations/authValidation');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    const errors = validateRegister({ username, email, password });
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    // Check for existing user/email
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username already taken', errors: ['Username already exists'] });
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ success: false, message: 'Email already registered', errors: ['Email already exists'] });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Return success
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      object: { id: user.id, username: user.username, email: user.email },
      errors: null,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error', errors: [err.message] });
  }
};

module.exports = { register };
