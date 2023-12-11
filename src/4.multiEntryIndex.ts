import { LOG } from "./consoleOutput";
import { openConnection } from "./dbConnection";

export async function multiEntryIndex() {
  const db = await openConnection();
  return new Promise(async (resolve, reject) => {
    const tranasaction = db.transaction("name-store", "readonly");
    const citizenshipIndex = tranasaction
      .objectStore("name-store")
      .index("index[citizenship]");
    const query = citizenshipIndex.openCursor(IDBKeyRange.only("UK"));
    const people: Array<any> = [];
    query.onsuccess = function (event) {
      const cursor = query.result;
      if (!cursor) return;
      people.push(cursor.value);
      cursor.continue();
    };

    tranasaction.oncomplete = function () {
      LOG`People: ${people}`;
      resolve(null);
    };
  });
}
