import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

// This will create an new instance of "MongoMemoryServer" and automatically start it
let mongod: any;

export const connect = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = await mongod.getUri();
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri);

    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

export const closeDatabase = async () => {
  // Deletes the given database, including all collections, documents, and indexes.
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  // The MongoMemoryServer can be stopped again with
  if (mongod) await mongod.stop();
};

export const clearDatabase = async () => {
  //A hash of the collections associated with this connection
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    //Deletes all of the documents that match conditions from the collection.
    await collection.deleteMany({});
  }
};
