import { createDatabase } from "./1.createDatabase";
import { concurrentWriteDifferentObjectStores } from "./10.concurrentWriteDifferentObjectStores";
import { keepTransactionAliveNonBlocking } from "./11.keepTransactionAliveNonBlocking";
import { keepTransactionAliveWithPromiseLoop } from "./12.keepTransactionAliveWithPromiseLoop";
import { performRequestInSetTimeout } from "./13.performRequestInSetTimeout";
import { durabilityCompare } from "./14.durabilityCompare";
import { orderExample } from "./15.orderExample";
import { cursorExample } from "./16.cursorExample";
import { upgradeDatabase } from "./2.upgradeDatabase";
import { fillIDBTxn } from "./3.fillDb";
import { multiEntryIndex } from "./4.multiEntryIndex";
import { commitExample } from "./5.commitTransaction";
import { abortExample } from "./6.abortTransaction";
import { concurrentWrites } from "./7.concurrentWrites";
import { concurrentRead } from "./8.concurrentReads";
import { concurrentReadWrite } from "./9.concurrentReadWrite";
import { attempt } from "./attempt";
import { maybeDB, setDBoutsideFromExample } from "./dbConnection";
import { deleteDatabase } from "./deleteDatabase";
import "./style.css";

document.getElementById("create-db")?.addEventListener("click", async () => {
  await attempt(deleteDatabase(maybeDB()));
  const db = await attempt(createDatabase());
  setDBoutsideFromExample(db);
});

document
  .getElementById("add-addresses")
  ?.addEventListener("click", async () => {
    await attempt(upgradeDatabase());
  });

document.getElementById("fill-db")?.addEventListener("click", async () => {
  await attempt(fillIDBTxn());
});

document.getElementById("multi-entry")?.addEventListener("click", async () => {
  await attempt(multiEntryIndex());
});

document
  .getElementById("commit-example")
  ?.addEventListener("click", async () => {
    await commitExample();
  });

document
  .getElementById("abort-example")
  ?.addEventListener("click", async () => {
    await abortExample();
  });

document
  .getElementById("concurrentWrite")
  ?.addEventListener("click", async () => {
    await concurrentWrites();
  });

document
  .getElementById("concurrentRead")
  ?.addEventListener("click", async () => {
    await concurrentRead();
  });

document
  .getElementById("concurrentReadWrite")
  ?.addEventListener("click", async () => {
    await concurrentReadWrite();
  });

document
  .getElementById("concurrentWriteDifferentObjectStores")
  ?.addEventListener("click", async () => {
    await concurrentWriteDifferentObjectStores();
  });

document
  .getElementById("keepTransactionAlive5sec")
  ?.addEventListener("click", async () => {
    await keepTransactionAliveNonBlocking();
  });

document
  .getElementById("keepTransactionAliveWithPromiseLoop")
  ?.addEventListener("click", async () => {
    await keepTransactionAliveWithPromiseLoop();
  });

document
  .getElementById("performRequestInSetTimeout")
  ?.addEventListener("click", async () => {
    await performRequestInSetTimeout();
  });

document
  .getElementById("durabilityCompare")
  ?.addEventListener("click", async () => {
    await durabilityCompare();
  });

document.getElementById("orderExample")?.addEventListener("click", async () => {
  await orderExample();
});

document
  .getElementById("cursorExample")
  ?.addEventListener("click", async () => {
    await cursorExample();
  });
