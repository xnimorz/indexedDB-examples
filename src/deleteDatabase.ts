import { TEST_DB_NAME } from "./common";
import { LOG } from "./consoleOutput";

export function deleteDatabase(db: IDBDatabase | null) {
  if (db) {
    db.close();
  }
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase("Understanding_IndexedDB");
    request.onsuccess = () => {
      LOG`DB: ${TEST_DB_NAME} removed`;
      resolve(null);
    };
    request.onerror = (e) => {
      LOG`DB: ${TEST_DB_NAME} cannot be removed: ${e}`;
      reject();
    };
    request.onblocked = (e) => {
      LOG`DB: ${TEST_DB_NAME} is blocked: ${e}`;
      reject();
    };
  });
}
