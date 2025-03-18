const mongoose = require('mongoose');
const slugify = require('slugify')
const Product = require('./product.model.js'); // Import model

require('dotenv').config()
const mongo_uri = process.env.MONGO_URI

// Kết nối MongoDB
mongoose.connect(mongo_uri);

async function updateSlugs() {
  try {
    // Lấy tất cả sản phẩm chưa có slug
    const products = await Product.find({ slug: { $exists: false } });

    for (let product of products) {
      product.slug = slugify(product.title, { lower: true, strict: true });
      await product.save();
      console.log(`Updated slug for: ${product.title}`);
    }

    console.log('✅ Cập nhật slug hoàn tất!');
    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Lỗi cập nhật slug:', error);
  }
}

updateSlugs();
