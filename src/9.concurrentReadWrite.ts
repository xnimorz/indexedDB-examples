import { LOG } from "./consoleOutput";
import { openConnection } from "./dbConnection";

export async function concurrentReadWrite() {
  const db = await openConnection();

  // 1st txn
  const txn = db.transaction(["name-store", "address-store"], "readonly");

  // 2nd txn
  const txn2 = db.transaction(["name-store", "address-store"], "readwrite");

  const nameStore2: IDBObjectStore = txn2.objectStore("name-store");
  const nameStore: IDBObjectStore = txn.objectStore("name-store");

  const request2 = nameStore2.add({
    name: "Alice 2",
    lastName: "Smith",
    citizenship: ["USA", "UK"],
  });

  const request = nameStore.getAll();

  txn2.oncomplete = (e) => {
    LOG`The 2nd transaction is done`;
    LOG`${request2.result}`;
    LOG`First request state: ${request.readyState}`;
  };

  txn2.onabort = (e) => {
    LOG`idb transaction is aborted`;
  };

  txn.oncomplete = (e) => {
    LOG`The 1st transaction is done`;
    LOG`${request.result}`;
    LOG`Second request state: ${request2.readyState}`;
  };

  txn.onabort = (e) => {
    LOG`idb transaction is aborted`;
  };
}
