importScripts("https://www.gstatic.com/firebasejs/7.17.2/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.17.2/firebase-messaging.js"
);

var firebaseConfig = {
  apiKey: "AIzaSyAX67-PvlNvYlHuXBBFmeJJklBddDMbI5k",
  authDomain: "godgatyou-e6b2b.firebaseapp.com",
  databaseURL: "https://godgatyou-e6b2b.firebaseio.com",
  projectId: "godgatyou-e6b2b",
  storageBucket: "godgatyou-e6b2b.appspot.com",
  messagingSenderId: "1004052559188",
  appId: "1:1004052559188:web:f353493a9e57f226e8c4c1",
  measurementId: "G-Z88TFZBBW7",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
let url;

messaging.setBackgroundMessageHandler(function (payload) {
  url = payload.data.url;
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.data.title;
  var notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
    image: payload.data.img,
    dir: "ltr",
    lang: "en-US", // BCP 47
    vibrate: [100, 50, 100, 50, 100],
    badge: "/assets/images/icons/badge.png",
    tag: "confirm-notification",
    renotify: true,
    click_action: payload.data.url,
    actions: [{ action: payload.data.url, title: payload.data.action }],
  };

  if (navigator.vibrate) {
    navigator.vibrate([100, 100, 100, 100, 100]);
  }

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener("notificationclick", function (event) {
  var notification = event.notification;
  var action = event.action;

  event.waitUntil(
    clients.matchAll().then(function (clis) {
      var client = clis.find(function (c) {
        return c.visibilityState === "visible";
      });

      if (client !== undefined) {
        if (url) {
          client.navigate(url);
        } else {
          client.navigate("https://www.godgatyou.com");
        }

        client.focus();
      } else {
        if (url) {
          clients.openWindow("https://www.godgatyou.com");
        } else {
          clients.openWindow("https://www.godgatyou.com");
        }
      }
      notification.close();
    })
  );
});
