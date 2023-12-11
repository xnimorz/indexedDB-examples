import { TEST_DB_NAME } from "./common";
import { LOG } from "./consoleOutput";

let db: IDBDatabase | null = null;

export function maybeDB() {
  return db;
}

export function setDBoutsideFromExample(newDb: IDBDatabase) {
  db = newDb;
}

export function openConnection(): Promise<IDBDatabase> {
  if (db != null) {
    if (db.version != 2) {
      db.close();
    } else {
      return Promise.resolve(db);
    }
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(TEST_DB_NAME, 2);

    request.onupgradeneeded = function (event) {
      LOG`Version change transaction`;
      // The result is stored in event.target.value and in IDBRequest.result
      const db = request.result;

      // @ts-expect-error
      const transaction: IDBTransaction = event.currentTarget.transaction;

      if (!db.objectStoreNames.contains("name-store")) {
        db.createObjectStore("name-store", {
          keyPath: "id",
          // We can create auto-increment primary key
          autoIncrement: true,
        });
      }
      const nameStore = transaction.objectStore("name-store");

      if (!nameStore.indexNames.contains("index[name]")) {
        nameStore.createIndex("index[name]", "name", { unique: false });
      }

      if (!nameStore.indexNames.contains("index[name + lastName]")) {
        nameStore.createIndex("index[name + lastName]", ["name", "lastName"], {
          unique: false,
        });
      }

      if (!nameStore.indexNames.contains("index[citizenship]")) {
        nameStore.createIndex("index[citizenship]", "citizenship", {
          multiEntry: true,
        });
      }

      if (!db.objectStoreNames.contains("address-store")) {
        db.createObjectStore("address-store", {
          // Complex keypath based on 6 keys:
          // NOTE: don't do keypath based on address, use it as index for production ;)
          keyPath: ["country", "city", "street", "house", "flat", "zip"],
        });
      }
    };

    request.onsuccess = () => {
      LOG`DB: ${TEST_DB_NAME} connection is established`;
      resolve(request.result);
    };
    request.onerror = (e) => {
      LOG`DB: ${TEST_DB_NAME} cannot be created: ${e}`;
      reject();
    };
    request.onblocked = (e) => {
      LOG`DB: ${TEST_DB_NAME} is blocked: ${e}`;
      reject();
    };
  });
}
