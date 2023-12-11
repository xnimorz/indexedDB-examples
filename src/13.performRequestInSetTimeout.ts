import { LOG } from "./consoleOutput";
import { openConnection } from "./dbConnection";

export async function performRequestInSetTimeout() {
  const db = await openConnection();
  const txn = db.transaction(["name-store"], "readonly");

  setTimeout(() => {
    const nameStore = txn.objectStore("name-store");
    try {
      const read = nameStore.count();
      read.onerror = (e) => {
        LOG`Error performing request: ${e}`;
      };
      read.onsuccess = () => {
        LOG`result: ${read.result}`;
      };
    } catch (e) {
      LOG`Runtime Error performing request: ${e}`;
    }
  }, 0);

  txn.oncomplete = (e) => {
    LOG`Transaction is completed`;
  };

  txn.onabort = (e) => {
    LOG`idb transaction is aborted`;
  };
}
