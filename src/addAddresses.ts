export function addAddresses(addressStore: IDBObjectStore) {
  addressStore.add({
    country: "USA",
    city: "New York",
    street: "Broadway",
    house: "123",
    flat: "A",
    zip: "10001",
  });
  addressStore.add({
    country: "Canada",
    city: "Toronto",
    street: "King",
    house: "456",
    flat: "B",
    zip: "M5V 1K4",
  });
  addressStore.add({
    country: "UK",
    city: "London",
    street: "Oxford",
    house: "789",
    flat: "C",
    zip: "SW1A 1AA",
  });
  addressStore.add({
    country: "USA",
    city: "New York",
    street: "Broadway",
    house: "123",
    flat: "B",
    zip: "1000",
  });

  addressStore.add({
    country: "Germany",
    city: "Berlin",
    street: "Brandenburg",
    house: "567",
    flat: "D",
    zip: "10117",
  });

  addressStore.add({
    country: "Australia",
    city: "Sydney",
    street: "George",
    house: "890",
    flat: "E",
    zip: "2000",
  });

  addressStore.add({
    country: "France",
    city: "Paris",
    street: "Champs-Élysées",
    house: "234",
    flat: "F",
    zip: "75008",
  });
}
