import Dexie from "dexie";

const database = new Dexie("AppDB");

database.version(1).stores({
  registros: "++id,tipo,descripcion,hora,fecha,monto",
});

export default database;