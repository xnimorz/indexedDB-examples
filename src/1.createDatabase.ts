import { TEST_DB_NAME } from "./common";
import { LOG } from "./consoleOutput";

export function createDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(TEST_DB_NAME, 1);

    // Version change transaction
    request.onupgradeneeded = function (event) {
      // The result is stored in event.target.value and in IDBRequest.result
      const db = request.result;

      const namesObjectStore = db.createObjectStore("name-store", {
        keyPath: "id",
        // We can create auto-increment primary key
        autoIncrement: true,
      });
      namesObjectStore.createIndex("index[name]", "name", { unique: false });
    };

    request.onsuccess = () => {
      LOG`DB: ${TEST_DB_NAME} created`;
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
