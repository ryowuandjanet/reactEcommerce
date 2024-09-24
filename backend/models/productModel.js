import mongoose from 'mongoose';

// 定义产品模式
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: [String], required: true }, // 使用数组来存储图片链接
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: [String], required: true }, // 使用数组来存储尺寸
  bestseller: { type: Boolean, default: false }, // 默认值为 false
  date: { type: Number, required: true },
});

// 创建模型
const productModel =
  mongoose.models.product || mongoose.model('product', productSchema);

export default productModel;
