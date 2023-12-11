import { addAddresses } from "./addAddresses";
import { LOG } from "./consoleOutput";
import { openConnection } from "./dbConnection";

export async function concurrentWriteDifferentObjectStores() {
  const db = await openConnection();
  // 1st txn
  const txn = db.transaction(["address-store"], "readwrite");

  // 2nd txn
  const txn2 = db.transaction(["name-store"], "readwrite");

  const addressStore: IDBObjectStore = txn.objectStore("address-store");
  const nameStore2: IDBObjectStore = txn2.objectStore("name-store");

  nameStore2.add({
    name: "Alice 2",
    lastName: "Smith",
    citizenship: ["USA", "UK"],
  });

  const clearRequest = addressStore.clear();
  clearRequest.onsuccess = () => {
    addAddresses(addressStore);
  };

  txn2.oncomplete = (e) => {
    LOG`name-store, 2nd transaction is done`;
  };

  txn2.onabort = (e) => {
    LOG`idb transaction is aborted`;
  };

  txn.oncomplete = (e) => {
    LOG`address-store, 1st transaction is done`;
  };

  txn.onabort = (e) => {
    LOG`idb transaction is aborted`;
  };
}
