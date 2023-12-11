import { LOG } from "./consoleOutput";
import { openConnection } from "./dbConnection";

export async function commitExample() {
  const db = await openConnection();
  // Open readwrite transaction
  const txn = db.transaction(["name-store", "address-store"], "readwrite");

  // Request name-store objectStore
  const nameStore: IDBObjectStore = txn.objectStore("name-store");

  const idbRequest: IDBRequest = nameStore.add({
    name: "Alice",
    lastName: "Smith",
    citizenship: ["USA", "UK"],
  });

  // nameStore got new record Alice Smith
  idbRequest.onsuccess = (e) => {
    LOG`idb request success ${e}`;
    txn.commit(); // Commits the current transaction
  };

  txn.oncomplete = (e) => {
    LOG`idb transaction is done ${e}`;
  };

  txn.onabort = (e) => {
    LOG`idb transaction is aborted ${e}`;
  };
}
