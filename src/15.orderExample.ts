import { openConnection } from "./dbConnection";

export async function orderExample() {
  const idb = await openConnection();

  const txn = idb.transaction(["name-store"], "readwrite");

  const nameStore = txn.objectStore("name-store");
  // We call method sequentially,
  // but IDBRequest are planned without
  // awaiting the end of previous one:
  nameStore.clear();
  nameStore.add({
    name: `Mark`,
    lastName: `Smith`,
  });
  nameStore.count().onsuccess = (e) => {
    // You can find that TS typing is not the best for IndexedDB
    // @ts-expect-error
    LOG`1st Count is: ${e.target.result}`;
  };
  nameStore.put({ name: "Alice" });
  nameStore.count().onsuccess = (e) => {
    // @ts-expect-error
    LOG`2st Count is: ${e.target.result}`;
  };
  nameStore.clear();
  nameStore.count().onsuccess = (e) => {
    // @ts-expect-error
    LOG`3st Count is: ${e.target.result}`;
  };
}
