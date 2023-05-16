import mongoose from "mongoose";
let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("connectToDB: MongoDB already connected...");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "promptopia",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("connectToDB: MongoDB now connected...");
  } catch (error) {
    console.log(`connectToDB: ${error}`);
  }
};
