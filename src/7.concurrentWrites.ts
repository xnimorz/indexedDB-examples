import { LOG } from "./consoleOutput";
import { openConnection } from "./dbConnection";

export async function concurrentWrites() {
  const db = await openConnection();

  // 1st txn
  const txn = db.transaction(["name-store", "address-store"], "readwrite");

  // 2nd txn
  const txn2 = db.transaction(["name-store", "address-store"], "readwrite");

  const nameStore2: IDBObjectStore = txn2.objectStore("name-store");
  const nameStore: IDBObjectStore = txn.objectStore("name-store");

  nameStore2.add({
    name: "Alice 2",
    lastName: "Smith",
    citizenship: ["USA", "UK"],
  });

  nameStore.add({
    name: "Alice",
    lastName: "Smith",
    citizenship: ["USA", "UK"],
  });

  txn2.oncomplete = (e) => {
    LOG`The 2nd transaction is done`;
  };

  txn2.onabort = (e) => {
    LOG`idb transaction is aborted`;
  };

  txn.oncomplete = (e) => {
    LOG`The 1st transaction is done`;
  };

  txn.onabort = (e) => {
    LOG`idb transaction is aborted`;
  };
}
