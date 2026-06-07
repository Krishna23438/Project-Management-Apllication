
import User  from '../models/User.js'

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const generateToken = (id) => 
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields required' });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already registered' });

  const user = await User.create({ name, email, password });
  res.status(201).json({ token: generateToken(user._id), name: user.name });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'All fields required' });

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  res.json({ token: generateToken(user._id), name: user.name });
};

// API to get user data 
export const getUser = async (req, res) =>{
  try {
    const user = req.user;
    return res.json({success:true, user})

  } catch (error) {
      return res.json({success: false, message: error.message})  
  }
}