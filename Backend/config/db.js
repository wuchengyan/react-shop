import mongoose from 'mongoose';

//连接数据库
const connectDB = async () => {
  try {
    const coon = await mongoose.connect(process.env.MONGO_URI,{
      useUnifiedTopology:true,
      useNewUrlParser:true,
      useCreateIndex:true,
    })
    console.log(`MongoDB已连接:${coon.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(`Error:${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB