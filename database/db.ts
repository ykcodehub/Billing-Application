import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("billing_v2.db");

export default db;