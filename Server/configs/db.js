import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Datebase Connected")
    );
    const connect = await mongoose.connect(
      `${process.env.MONGODB_URI}/quickblog`
    );
    console.log("Connected", connect.connection.host);
  } catch (error) {
    console.error(error.message);
  }
};

export default connectToDB;
