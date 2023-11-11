import { Collection, MongoClient, MongoClientOptions } from "mongodb";

export function getCollection(collectionName: string): Promise<Collection> {
  const url = "mongodb://localhost:27017";
  const dbName = "db_op_main_01";

  const options: MongoClientOptions = {}; // Opciones iniciales vacías

  // Modificar las opciones, incluyendo useUnifiedTopology
  Object.assign(options, {});

  return new Promise(async (resolve, reject) => {
    try {
      const client = new MongoClient(url, options);
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      resolve(collection);
    } catch (error) {
      reject(error);
    }
  });
}
