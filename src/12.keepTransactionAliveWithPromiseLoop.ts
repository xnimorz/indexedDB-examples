import { LOG } from "./consoleOutput";
import { openConnection } from "./dbConnection";

export async function keepTransactionAliveWithPromiseLoop() {
  const db = await openConnection();
  const txn = db.transaction(["name-store"], "readwrite");
  LOG`Try to click other commands, like fillDb! This transaction keeps readwrite lock, but uses promise loop`;

  const startTime = Date.now();
  function cyclePromiseLoop(): Promise<void> {
    if (Date.now() - startTime > 2000) {
      txn.objectStore("name-store").count().onsuccess = (event) => {
        // @ts-expect-error
        const result = event.target.result;
        LOG`IDBRequest ended after ${
          (Date.now() - startTime) / 1000
        } sec. Result: ${result}`;
      };
      txn.commit();
      return Promise.resolve();
    }
    return Promise.resolve().then(cyclePromiseLoop);
  }

  await cyclePromiseLoop();
  txn.oncomplete = (e) => {
    LOG`Transaction is completed after ${(Date.now() - startTime) / 1000} sec.`;
  };

  txn.onabort = (e) => {
    LOG`idb transaction is aborted`;
  };
}
