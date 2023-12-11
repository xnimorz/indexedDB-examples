import { LOG } from "./consoleOutput";
import { openConnection } from "./dbConnection";

export async function cursorExample() {
  const idb = await openConnection();

  const txn = idb.transaction(["name-store"], "readwrite");

  const nameStore = txn.objectStore("name-store");

  LOG`Run relaxed vs strict durability test first, to get more data iterated`;

  let mutatedEntries = 0;
  let deletedEntries = 0;
  let total = 0;
  // Iterate through all the entries
  const request = nameStore.openCursor();
  request.onsuccess = () => {
    const cursor = request.result;
    if (cursor) {
      total++;
      if (cursor.value.name.startsWith("N")) {
        deletedEntries++;
        cursor.delete();
      } else {
        if (!cursor.value.updated) {
          const newValue = { ...cursor.value, updated: true };
          mutatedEntries++;
          cursor.update(newValue);
        }
      }
      cursor.continue();
    }
  };

  txn.oncomplete = () => {
    LOG`Transaction is completed. Deleted: ${deletedEntries}, mutated: ${mutatedEntries}, total: ${total}`;
  };
}
