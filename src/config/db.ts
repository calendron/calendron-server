import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions,
    );
    console.log(
      `👋 Connected successfully to ${conn.connection.name} database`,
    );
  } catch (error: any) {
    console.error('DB Connection Failed!');
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default { connectDB };
