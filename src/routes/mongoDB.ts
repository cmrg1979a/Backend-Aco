import { Collection, MongoClient, MongoClientOptions } from "mongodb";

export function getCollection(collectionName: string): Promise<Collection> {
  // const url = "67.205.129.62";
  const dbName = "db_op_main_01";
  let url = "mongodb://localhost:27017";
  if (global.esProduccion) {
    url =
      "mongodb+srv://doadmin:2jS0z6g47it9s15D@db-mongodb-nyc1-68607-8b7bd198.mongo.ondigitalocean.com/admin?retryWrites=true&w=majority&tls=true";
  }

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
      console.error("❌ Error al conectar a MongoDB:", error.message);
      reject(error);
      reject(error);
    }
  });
}
