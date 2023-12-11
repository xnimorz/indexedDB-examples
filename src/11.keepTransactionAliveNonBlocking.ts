import { LOG } from "./consoleOutput";
import { openConnection } from "./dbConnection";

export async function keepTransactionAliveNonBlocking() {
  const db = await openConnection();
  const txn = db.transaction(["name-store"], "readwrite");
  LOG`Try to click other commands, like fillDb! This transaction keeps readwrite lock`;

  const nameStore: IDBObjectStore = txn.objectStore("name-store");

  let endTransaction = false;
  const startTime = Date.now();
  setTimeout(() => (endTransaction = true), 5000);
  let idbRequestCycles = 0;

  function cycleIdbRequest() {
    if (endTransaction) {
      txn.commit();
      return;
    }
    idbRequestCycles++;
    // request non-existing item
    const idbRequest = nameStore.get(Infinity);
    idbRequest.onsuccess = cycleIdbRequest;
  }

  cycleIdbRequest();
  txn.oncomplete = (e) => {
    LOG`Transaction is completed after ${
      (Date.now() - startTime) / 1000
    } sec. In total ${idbRequestCycles} IDBRequests were created`;
  };

  txn.onabort = (e) => {
    LOG`idb transaction is aborted`;
  };
}
