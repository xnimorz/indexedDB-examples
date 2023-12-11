import { addAddresses } from "./addAddresses";
import { TEST_DB_NAME } from "./common";
import { LOG } from "./consoleOutput";
import { openConnection } from "./dbConnection";

export async function fillIDBTxn() {
  const db = await openConnection();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      ["name-store", "address-store"],
      "readwrite"
    );

    const nameStore = transaction.objectStore("name-store");

    nameStore.add({ name: "John", lastName: "Doe", citizenship: ["USA"] });
    nameStore.add({
      name: "Alice",
      lastName: "Smith",
      citizenship: ["USA", "UK"],
    });
    nameStore.add({
      name: "Bob",
      lastName: "Johnson",
      citizenship: ["USA", "Germany"],
    });
    nameStore.add({
      name: "Eva",
      lastName: "Anderson",
      citizenship: ["Greece"],
    });
    nameStore.add({
      name: "Charlie",
      lastName: "Williams",
      citizenship: ["UK", "France"],
    });
    nameStore.add({ name: "Grace", lastName: "Miller", citizenship: ["USA"] });
    nameStore.add({
      name: "David",
      lastName: "Taylor",
      citizenship: ["USA", "Egypt"],
    });
    nameStore.add({
      name: "Sophia",
      lastName: "Brown",
      citizenship: ["China"],
    });
    nameStore.add({ name: "Mason", lastName: "Jones", citizenship: ["USA"] });
    nameStore.add({ name: "Olivia", lastName: "Davis", citizenship: ["USA"] });
    nameStore.add({ name: "Ethan", lastName: "Moore", citizenship: ["USA"] });
    nameStore.add({
      name: "Ava",
      lastName: "Fork",
      citizenship: ["UK", "Canada"],
    });
    nameStore.add({ name: "Liam", lastName: "Wilson", citizenship: ["USA"] });
    nameStore.add({ name: "Emma", lastName: "Martinez", citizenship: ["USA"] });
    nameStore.add({
      name: "Noah",
      lastName: "Garcia",
      citizenship: ["Finland"],
    });
    nameStore.add({
      name: "Olivia",
      lastName: "Lopez",
      citizenship: ["USA", "UK"],
    });
    nameStore.add({
      name: "Isabella",
      lastName: "Lee",
      citizenship: ["Italy"],
    });
    nameStore.add({
      name: "Jackson",
      lastName: "Hernandez",
      citizenship: ["Italy"],
    });
    nameStore.add({ name: "Sophia", lastName: "Wang", citizenship: ["Spain"] });
    nameStore.add({ name: "Lucas", lastName: "Kim", citizenship: ["UK"] });
    nameStore.add({
      name: "Ava",
      lastName: "Nguyen",
      citizenship: ["Spain", "Italy"],
    });
    nameStore.add({ name: "Mia", lastName: "Gomez", citizenship: ["USA"] });
    nameStore.add({ name: "Elijah", lastName: "Rivera", citizenship: ["USA"] });
    nameStore.add({
      name: "Grayson",
      lastName: "Wright",
      citizenship: ["USA"],
    });
    nameStore.add({ name: "Aiden", lastName: "Turner" });
    nameStore.add({ name: "Harper", lastName: "Cooper" });
    nameStore.add({ name: "Daniel", lastName: "Chen" });
    nameStore.add({ name: "Evelyn", lastName: "Patel" });
    nameStore.add({ name: "Logan", lastName: "Taylor" });
    nameStore.add({ name: "Avery", lastName: "Hill" });
    nameStore.add({ name: "Sofia", lastName: "Ng" });
    nameStore.add({ name: "Henry", lastName: "Baker" });

    const addressStore = transaction.objectStore("address-store");
    addressStore.clear();
    addAddresses(addressStore);

    transaction.oncomplete = () => {
      LOG`DB: ${TEST_DB_NAME} filled`;
      resolve(null);
    };
    transaction.onerror = (e) => {
      LOG`DB: ${TEST_DB_NAME} cannot perform transaction: ${e}`;
      reject();
    };
  });
}
