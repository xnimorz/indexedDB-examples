import { LOG } from "./consoleOutput";
import { openConnection } from "./dbConnection";

export async function durabilityCompare() {
  const idb = await openConnection();

  function txn(durability: "strict" | "relaxed"): Promise<void> {
    return new Promise((resolve) => {
      const txn = idb.transaction(["name-store"], "readwrite", {
        durability,
      });

      const nameStore = txn.objectStore("name-store");
      nameStore.add({
        name: `Name #${Math.trunc(Math.random() * 1000)}`,
      });
      txn.oncomplete = () => {
        resolve();
      };
    });
  }

  LOG`Strict durability, 100 runs`;
  let startTime = performance.now();
  await Promise.all(Array.from({ length: 100 }).map(() => txn("strict")));
  LOG`Strict: ${performance.now() - startTime} ms`;
  LOG`Relaxed durability, 100 runs`;
  startTime = performance.now();
  await Promise.all(Array.from({ length: 100 }).map(() => txn("relaxed")));
  LOG`Relaxed: ${performance.now() - startTime} ms`;
}
