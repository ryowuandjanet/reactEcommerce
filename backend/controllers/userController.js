import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 查找用户
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User doesn't exist" });
    }

    // 验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // 创建 JWT 令牌
      const token = createToken(user._id);
      return res.json({ success: true, token });
    } else {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 用户注册路由
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 检查用户是否已经存在
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: 'User already exists' });
    }

    // 验证电子邮件格式
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: 'Please enter a valid email',
      });
    }

    // 验证密码强度
    if (password.length < 8) {
      return res.json({
        success: false,
        message: 'Please enter a strong password',
      });
    }

    // 哈希用户密码
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 创建新用户
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // 保存用户并生成令牌
    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// 管理员登录路由
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body; // Destructure email and password from req.body

    // Check if the email and password match the environment variables
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET); // Sign the token with email
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ success: false, message: error.message });
  }
};

// 导出路由处理函数
export { loginUser, registerUser, adminLogin };
