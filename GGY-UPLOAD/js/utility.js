var dbPromise = idb.open("Godgatyou-store", 1, function (db) {
  if (!db.objectStoreNames.contains("sync-comments")) {
    db.createObjectStore("sync-comments", { keyPath: "id" });
  }
  if (!db.objectStoreNames.contains("wallpapers")) {
    db.createObjectStore("wallpapers", { keyPath: "id" });
  }
  if (!db.objectStoreNames.contains("gallery")) {
    db.createObjectStore("gallery", { keyPath: "id" });
  }
  if (!db.objectStoreNames.contains("store")) {
    db.createObjectStore("store", { keyPath: "id" });
  }
  if (!db.objectStoreNames.contains("posts")) {
    db.createObjectStore("posts", { keyPath: "id" });
  }
});

function writeData(st, data) {
  return dbPromise.then(function (db) {
    var tx = db.transaction(st, "readwrite");
    var store = tx.objectStore(st);
    store.put(data);
    return tx.complete;
  });
}

function readAllData(st) {
  return dbPromise.then(function (db) {
    var tx = db.transaction(st, "readonly");
    var store = tx.objectStore(st);
    return store.getAll();
  });
}

function clearAllData(st) {
  return dbPromise.then(function (db) {
    var tx = db.transaction(st, "readwrite");
    var store = tx.objectStore(st);
    store.clear();
    return tx.complete;
  });
}

function deleteItemFromData(st, id) {
  return dbPromise
    .then(function (db) {
      var tx = db.transaction(st, "readwrite");
      var store = tx.objectStore(st);
      store.delete(id);
      return tx.complete;
    })
    .then(function () {
      console.log("Item Deleted!");
    });
}
