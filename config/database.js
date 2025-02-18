const mongoose = require('mongoose')
require('dotenv').config()
const mongo_uri = process.env.MONGO_URI
module.exports.connect = async () => {
  try {
    await mongoose.connect(mongo_uri)
    console.log('kết nối thành công')
  } catch {
    console.log('kết nối thất bại')
  }
}


