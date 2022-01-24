importScripts("/js/idb.js");
importScripts("/js/utility.js");

var CACHE_STATIC_NAME = "static-v9";
var CACHE_DYNAMIC_NAME = "dynamic-v1";
var STATIC_FILES = [
  "/",
  "/about/",
  "/wallpaper/",
  "/gallery/",
  "/store/",
  "/blog/",
  "/offline.html",
  "/js/about.js",
  "/js/aos.js",
  "/js/app.js",
  "/js/blog.js",
  "/js/cart.js",
  "/js/fetch.js",
  "/js/gallery.js",
  "/js/idb.js",
  "/js/index.js",
  "/js/mode.js",
  "/js/post.js",
  "/js/promise.js",
  "/js/recentSlider.js",
  "/js/scroll.js",
  "/js/slider.js",
  "/js/store.js",
  "/js/wallpaper.js",
  "/js/wallpaperModel.js",
  "/js/utility.js",
  "/assets/images/aboutBG.jpg",
  "/css/main.css",
  "/assets/Logo/logo.png",
  "/assets/fonts/Lato-Light.ttf",
  "/assets/fonts/Lato-Regular.ttf",
  "/assets/fonts/PromeshRegular.ttf",
  "/assets/images/about2.jpg",
  "/assets/images/about1.jpg",
  "/assets/images/about4.jpg",
  "/css/aos.css",
  "/assets/images/ggy_dummy_img.jpg",
  "/assets/images/slide1.jpg",
  "/assets/images/slide2.jpg",
  "/assets/images/slide3.jpg",
  "/assets/images/slide4.jpg",
  "/assets/images/slide5.jpg",
  "/assets/images/icons/app-icon-96x96.png",
  "/assets/Logo/favicon.png",
  "https://cdn.linearicons.com/free/1.0.0/icon-font.min.css",
];

function trimCache(cacheName, maxItems) {
  caches.open(cacheName).then(function (cache) {
    return cache.keys().then(function (keys) {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(trimCache(cacheName, maxItems));
      }
    });
  });
}

function cutCache(cacheName) {
  caches.open(cacheName).then(function (cache) {
    return cache.keys().then(function (keys) {
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].url.includes(".php")) {
          // console.log(
          //   "This paricular key is not supposed to be chched. removing...",
          //   keys[i]
          // );
          cache.delete(keys[i]);
        }

        if (keys[i].url.includes("/includes")) {
          // console.log(
          //   "This paricular key is not supposed to be chched. removing...",
          //   keys[i]
          // );
          cache.delete(keys[i]);
        }
      }
    });
  });
}
self.addEventListener("install", function (event) {
  console.log("[Service Worker]: Installing service worker", event);
  event.waitUntil(
    STATIC_FILES.forEach(function (e) {
      fetch(e).then(function (res) {
        console.log("[Service Worker] Precaching app shell.");
        return caches.open(CACHE_STATIC_NAME).then(function (cache) {
          cache.put(e, res.clone());
          return res;
        });
      });
    })
  );
});
self.addEventListener("activate", function (event) {
  console.log("[Service Worker]: Activating service worker...", event);
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log("[Service Worker] Removing old cache...", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});
function isInArray(string, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === string) {
      return true;
    }
  }
  return false;
}
self.addEventListener("fetch", function (event) {
  var url1 = "/api/v1/wallpaper/read.php";
  var url2 = "/api/v1/wallpaper/read-index.php";
  var url3 = "/api/v1/gallery/read-index.php";
  var url4 = "/api/v1/gallery/read.php";
  var url5 = "/api/v1/products/read-index.php";
  var url6 = "/api/v1/post/read-index.php";

  if (
    event.request.url.indexOf(url1) > -1 ||
    event.request.url.indexOf(url2) > -1
  ) {
    event.respondWith(
      fetch(event.request).then(function (res) {
        var clonedRes = res.clone();
        clearAllData("wallpapers")
          .then(function () {
            return clonedRes.json();
          })
          .then(function (data) {
            if (data.data) {
              data.data.forEach((e, i) => {
                if (i < 5) {
                  writeData("wallpapers", e);
                }
              });
            }
          });
        return res;
      })
    );
  } else if (
    event.request.url.indexOf(url3) > -1 ||
    event.request.url.indexOf(url4) > -1
  ) {
    event.respondWith(
      fetch(event.request).then(function (res) {
        var clonedRes = res.clone();
        clearAllData("gallery")
          .then(function () {
            return clonedRes.json();
          })
          .then(function (data) {
            if (data.data) {
              data.data.forEach((e, i) => {
                if (i < 5) {
                  writeData("gallery", e);
                }
              });
            }
          });
        return res;
      })
    );
  } else if (event.request.url.indexOf(url5) > -1) {
    event.respondWith(
      fetch(event.request).then(function (res) {
        var clonedRes = res.clone();
        clearAllData("store")
          .then(function () {
            return clonedRes.json();
          })
          .then(function (data) {
            if (data.data) {
              data.data.forEach((e, i) => {
                if (i < 5) {
                  writeData("store", e);
                }
              });
            }
          });
        return res;
      })
    );
  } else if (event.request.url.indexOf(url6) > -1) {
    event.respondWith(
      fetch(event.request).then(function (res) {
        var clonedRes = res.clone();
        clearAllData("posts")
          .then(function () {
            return clonedRes.json();
          })
          .then(function (data) {
            if (data.data) {
              data.data.forEach((e, i) => {
                if (i < 5) {
                  writeData("posts", e);
                }
              });
            }
          });
        return res;
      })
    );
  } else if (isInArray(event.request.url, STATIC_FILES)) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function (res) {
              return caches.open(CACHE_STATIC_NAME).then(function (cache) {
                cache.put(event.request.url, res.clone());
                return res;
              });
            })
            .catch(function (err) {
              return caches.open(CACHE_STATIC_NAME).then(function (cache) {
                if (event.request.url.includes("/includes")) {
                } else if (
                  event.request.url.includes(".jpg") ||
                  event.request.url.includes(".jpeg") ||
                  event.request.url.includes(".gif") ||
                  event.request.url.includes(".png")
                ) {
                  console.log(event);
                  return cache.match("/assets/images/ggy_dummy_img.jpg");
                } else {
                  return cache.match("/offline.html");
                }
              });
            });
        }
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function (res) {
              return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
                cache.put(event.request.url, res.clone());
                trimCache(CACHE_DYNAMIC_NAME, 60);
                cutCache(CACHE_DYNAMIC_NAME);
                return res;
              });
            })
            .catch(function (err) {
              return caches.open(CACHE_STATIC_NAME).then(function (cache) {
                if (event.request.url.includes("/includes")) {
                } else if (
                  event.request.url.includes(".jpg") ||
                  event.request.url.includes(".jpeg") ||
                  event.request.url.includes(".gif") ||
                  event.request.url.includes(".png")
                ) {
                  console.log(event);
                  return cache.match("/assets/images/ggy_dummy_img.jpg");
                } else {
                  return cache.match("/offline.html");
                }
              });
            });
        }
      })
    );
  }
});

self.addEventListener("sync", function (event) {
  console.log("[Service Worker] Background syncing", event);
  if (event.tag === "sync-new-comment") {
    console.log("[Service Worker] Syncing new Comment");
    event.waitUntil(
      readAllData("sync-comments").then(function (data) {
        for (var dt of data) {
          var canDel = false;

          fetch("/api/v1/gallery/comment.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              id: dt.id,
              post: dt.post,
              commenter: dt.commenter,
              user: dt.user,
              comment: dt.comment,
            }),
          })
            .then(function (res) {
              if (res.ok) {
                canDel = true;
              }
              return res.json();
            })
            .then(function (data) {
              if (canDel) {
                deleteItemFromData("sync-comments", data.id);
              }
            })
            .catch(function (err) {
              console.log("Error while sending data", err);
            });
        }
      })
    );
  }
});

// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       if (response) {
//         return response;
//       } else {
//         return fetch(event.request)
//           .then(function (res) {
//             return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
//               cache.put(event.request.url, res.clone());
//               return res;
//             });
//           })
//           .catch(function (err) {
//             return caches.open(CACHE_STATIC_NAME).then(function (cache) {
//               if (event.request.url.includes("/includes")) {
//               } else {
//                 return cache.match("./offline.html");
//               }
//             });
//           });
//       }
//     })
//   );
// })
