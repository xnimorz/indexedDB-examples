// Function to generate a random string
function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to create an object store with a specified object depth
function createObjectStore(db, objectDepth) {
  const transaction = db.transaction(["testStore"], "readwrite");
  const objectStore = transaction.objectStore("testStore");

  // Generate a sample object with the specified depth
  const sampleObject = generateSampleObject(objectDepth);

  // Add the object to the object store
  const request = objectStore.add(sampleObject);

  request.onsuccess = function (event) {
    console.log(`Object with depth ${objectDepth} added to the object store`);
  };

  request.onerror = function (event) {
    console.error("Error adding object to the object store");
  };
}

// Function to generate a sample object with the specified depth
function generateSampleObject(depth) {
  if (depth === 1) {
    return generateRandomString(10);
  } else {
    const nestedObject = generateSampleObject(depth - 1);
    return { data: nestedObject };
  }
}

// Function to perform the performance test
function runPerformanceTest(objectDepth) {
  const dbName = "testDB";
  const request = indexedDB.open(dbName, 1);

  request.onupgradeneeded = function (event) {
    const db = event.target.result;

    // Create an object store with the name 'testStore'
    const objectStore = db.createObjectStore("testStore", {
      keyPath: "id",
      autoIncrement: true,
    });

    // Uncomment the following line to create an index on a specific property
    // objectStore.createIndex('indexName', 'propertyName', { unique: false });
  };

  request.onsuccess = function (event) {
    const db = event.target.result;

    // Run the performance test for the specified object depth
    createObjectStore(db, objectDepth);
  };

  request.onerror = function (event) {
    console.error("Error opening the database");
  };
}

// Specify the object depth for the test
const objectDepth = 3;

// Run the performance test
runPerformanceTest(objectDepth);
