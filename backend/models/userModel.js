import mongoose from 'mongoose';

// 定义用户模式
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false },
); // `minimize` 选项控制是否最小化空的子文档

// 创建模型
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
