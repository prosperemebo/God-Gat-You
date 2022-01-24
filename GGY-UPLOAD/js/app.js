var resuname = localStorage.getItem("resu");
var deferredPrompt;

function sharePost(title, url, text) {
  document
    .getElementById("facShLnk")
    .setAttribute(
      "href",
      `https://www.facebook.com/sharer/sharer.php?u=${
        window.location.href
      }&amp;quote=${text.split(" ").join("%20")}%20${url}`
    );

  document
    .getElementById("watShLnk")
    .setAttribute(
      "href",
      `https://wa.me/?text=${text.split(" ").join("+")}+${url}`
    );

  document
    .getElementById("twrShLnk")
    .setAttribute(
      "href",
      `https://twitter.com/intent/tweet?text=${text
        .split(" ")
        .join("%20")}%20${url}`
    );

  if (window.matchMedia("(max-width: 1000px)").matches) {
    if (navigator.share) {
      navigator.share({
        title: `${title}`,
        ulr: `${url}`,
        text: `${text}`,
      });
    } else {
      var tar = document.querySelector(".confirmation");

      if (tar) {
        document.querySelector(".confirmation input").value =
          window.location.href;
        tar.classList.add("confirm");
      }
    }
  } else {
    var tar = document.querySelector(".confirmation");

    if (tar) {
      document.querySelector(".confirmation input").value =
        window.location.href;
      tar.classList.add("confirm");
    }
  }
}

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function copyLink() {
  var copyText = document.getElementById("shLnk");

  copyText.select();
  copyText.setSelectionRange(0, 99999);

  document.execCommand("copy");
}

var clShare = document.querySelector("#clSh");
var shBtn = document.querySelector("#cpyLnkBtn");

if (clShare) {
  clShare.addEventListener("click", function () {
    var tar = document.querySelector(".confirmation");

    if (tar) {
      tar.classList.remove("confirm");
    }
  });
}

if (shBtn) {
  shBtn.addEventListener("click", function () {
    copyLink();
    errorSubMsg("Copied link to clipboard!", 300, "add", "#1b1b1b");
    errorSubMsg("Copied link to clipboard!", 3000, "remove", "#1b1b1b");
  });
}

function formatDate(date) {
  var dip = date.split("-");
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  var newOM = +dip[1] - 1;
  var newDate = `${dip[2]} ${months[newOM]}, ${dip[0]}`;
  return newDate;
}

function welcome(time) {
  var data = {
    first: "",
    second: "",
  };

  var markup = `
    <section class="welcome">
      <div class="content">
        <div class="head">
          <div class="btn-close">
            <span class="lnr lnr-cross"></span>
          </div>
          <div class="info">
            <i class="fas fa-info-circle"></i>
            <div class="msg">
              <p>
                We need your name to know who is commenting and liking posts on
                the page
              </p>
            </div>
          </div>
        </div>
        <div class="body">
          <div class="logo">
            <img id="logo" src="/assets/Logo/logo.png" alt="Logo" />
          </div>
          <div class="msg">
            <h2>welcome</h2>
            <p>Let's get to know each other</p>
          </div>
          <form>
            <input id="hi" type="text" placeholder="Your name..." autocomplete="off" />
            <button id="hey">Nice to meet you!</button>
          </form>
        </div>
      </div>
    </section>
  `;

  setTimeout(function () {
    document.querySelector(".main-body").insertAdjacentHTML("afterend", markup);

    var newfirst;

    document.querySelector("#hi").addEventListener("keyup", function (ev) {
      this.value = this.value.trimStart();

      if (this.value.length >= 3) {
        document.querySelector("#hey").classList.add("enable");
      } else {
        document.querySelector("#hey").classList.remove("enable");
      }
    });

    document.querySelector("#hey").addEventListener("click", function (e) {
      e.preventDefault();

      var newfirst = document.querySelector("#hi").value;

      newfirst = newfirst.trimEnd();

      if (newfirst !== null && newfirst.length >= 3) {
        data.first = newfirst;
      }

      fetch(`/api/v1/user/create.php?name=${newfirst}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.first,
        }),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (response) {
          var confirm = response;

          if (confirm.message === "User Created") {
            data.second = confirm.id;
            localStorage.setItem("resu", JSON.stringify(data));
          }
        })
        .catch(function (err) {
          errorSubMsg("oops! Something went wrong!", 1000, "add", "#1b1b1b");
          errorSubMsg("oops! Something went wrong!", 3000, "remove", "#1b1b1b");
        });

      document.querySelector(".welcome").classList.add("closed");
    });
  }, time);
}

if (resuname === null) {
  welcome(10000);
}

// if (window.matchMedia("(max-width: 1000px)").matches) {
//   document.querySelector("body").addEventListener("click", (e) => {
//     if (e.target.matches(".nav__links")) {
//       // document.getElementById("navi").click();
//     }
//   });
// }

document.querySelector("#body").addEventListener("click", function (e) {
  if (e.target.matches(".btn-close, .btn-close *")) {
    document.querySelector(".welcome").classList.add("closed");

    var data = {
      first: "GODGATYOUUSER",
      second: "",
    };
    localStorage.setItem("resu", JSON.stringify(data));
  }
});

window.addEventListener(
  "load",
  function (e) {
    if (navigator.onLine) {
      errorMsg("Back Online 😊", 2500, "remove", "#00d13f");
    } else {
      errorMsg(
        "It seems you are not connected to the internet 😢",
        2000,
        "add",
        "#da1803"
      );
    }
  },
  false
);

function errorMsg(msg, time, type, color) {
  var errCon = document.querySelector("#banner1 .error-msg");
  if (errCon) {
    var banner = document.querySelector("#banner1");
    errCon.textContent = msg;
    banner.style.background = color;

    if (type === "add") {
      setTimeout(() => {
        banner.classList.add("msg");
      }, time);
    } else if (type === "remove") {
      setTimeout(function () {
        banner.classList.remove("msg");
      }, time);
    }
  }
}

function counter() {
  var counters = document.querySelectorAll(".stat-rate");
  if (counters) {
    counters.forEach((counter) => {
      var updateCount = () => {
        var target = +counter.getAttribute("data-target");
        var count = Math.ceil(+counter.innerText);
        var speed = target / 10;

        // Lower inc to slow and higher to slow
        var inc = target / speed;

        // Check if target is reached
        if (count < target) {
          // Add inc to count and output in counter
          counter.innerText = count + inc;
          // Call function every ms
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
  }
}

function errorSubMsg(msg, time, type, color) {
  var errCon = document.querySelector("#banner2 .error-msg");
  if (errCon) {
    var banner = document.querySelector("#banner2");
    errCon.textContent = msg;
    banner.style.background = color;

    if (type === "add") {
      setTimeout(() => {
        banner.classList.add("msg");
      }, time);
    } else if (type === "remove") {
      setTimeout(function () {
        banner.classList.remove("msg");
      }, time);
    }
  }
}

if (!window.Promise) {
  window.Promise = Promise;
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(function () {
      console.log("Service worker registered!");
    })
    .catch(function (err) {
      console.log(err);
    });
}

window.addEventListener("beforeinstallprompt", function (event) {
  console.log("before install fired");
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

function saveToken(currentToken) {
  // $.ajax({
  //   url: "/api/v1/notifications/action.php",
  //   method: "post",
  //   data: "token=" + currentToken,
  // }).done(function (result) {
  //   // console.log(result);
  // });

  fetch("/api/v1/notifications/action.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: "token=" + currentToken,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

messaging.onMessage(function (payLoad) {
  console.log("Message Recieved!");

  if ("serviceWorker" in navigator) {
    var notTitle = payLoad.data.title;
    var options = {
      body: payLoad.data.body,
      icon: payLoad.data.icon,
      image: payLoad.data.img,
      dir: "ltr",
      lang: "en-US", // BCP 47
      vibrate: [100, 50, 100, 50, 100],
      badge: "/assets/images/icons/badge.png",
      tag: "confirm-notification",
      renotify: true,
      click_action: payLoad.data.url,
      actions: [{ action: payLoad.data.url, title: payLoad.data.action }],
    };

    if (navigator.vibrate) {
      navigator.vibrate([100, 100, 100, 100, 100]);
    }

    navigator.serviceWorker.ready.then(function (swreg) {
      swreg.showNotification(notTitle, options);
    });
  }
});

var enableNotificationsButtons = document.querySelectorAll(".enableNot");

// // GET request
// fetch("/api/v1/wallpaper//read.php")
//   .then(function (response) {
//     console.log(response);
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// POST request
// fetch("/api/v1/gallery//comment.php", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
//   body: JSON.stringify({
//     post: "gd89ythhd3mqz77qf44n",
//     commenter: "Koda P",
//     user: "Javascript",
//     comment: "Does This Work!",
//   }),
// })
//   .then(function (response) {
//     console.log(response);
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

window.addEventListener(
  "online",
  function (e) {
    var errCon = document.querySelector(".error-msg");
    if (errCon) {
      var banner = document.querySelector(".banner");
      setTimeout(() => {
        errCon.textContent = "Back Online 😊";
        banner.style.background = "#00d13f";
      }, 1000);
      setTimeout(function () {
        banner.classList.remove("msg");
      }, 2500);
    }
    errorMsg("Back Online 😊", 1000, "add", "#00d13f");
    errorMsg("Back Online 😊", 2500, "remove", "#00d13f");
  },
  false
);

window.addEventListener(
  "offline",
  function (e) {
    errorMsg(
      "It seems you are not connected to the internet 😢",
      3000,
      "add",
      "#da1803"
    );
  },
  false
);

function displayConfirmNotification() {
  if ("serviceWorker" in navigator) {
    var options = {
      body: "You successfully subscribed to God Gat You notification service.",
      icon: "/assets/images/icons/app-icon-96x96.png",
      dir: "ltr",
      lang: "en-US", // BCP 47
      vibrate: [100, 100, 100, 100, 100],
      badge: "/assets/images/icons/badge.png",
      tag: "subscribe-success",
      renotify: true,
    };

    navigator.serviceWorker.ready.then(function (swreg) {
      swreg.showNotification("Successfully Subscribed!", options);
    });

    if (navigator.vibrate) {
      navigator.vibrate([100, 100, 100, 100, 100]);
    }
  }
}

function configurePushSub() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  var reg;
  navigator.serviceWorker.ready
    .then(function (swreg) {
      reg = swreg;
      return swreg.pushManager.getSubscription();
    })
    .then(function (sub) {
      if (sub === null) {
        // Create new subscription
        reg.pushManager.subscribe({
          userVisibleOnly: true,
        });
      } else {
        // We have a subscription
      }
    });
}

// function askForNotificationPermission() {
//   Notification.requestPermission(function (result) {
//     console.log("USER CHOICE:", result);

//     if (result !== "granted") {
//       console.log("NOTIFICATION PERMISSION NOT GRANTED!");
//     } else {
//       configurePushSub();
//       // displayConfirmNotification();

//       // Hide all buttons
//       for (let i = 0; i < enableNotificationsButtons.length; i++) {
//         // enableNotificationsButtons[i].style.display = "none";
//       }
//     }
//   });
// }

if ("Notification" in window && "serviceWorker" in navigator) {
  if (isTokenSentToServer()) {
    console.log("Token already saved.");
    for (let i = 0; i < enableNotificationsButtons.length; i++) {
      enableNotificationsButtons[i].style.display = "none";
    }
  } else {
    for (let i = 0; i < enableNotificationsButtons.length; i++) {
      enableNotificationsButtons[i].style.display = "inline-block";
      enableNotificationsButtons[i].addEventListener(
        "click",
        askForNotificationPermission
      );
    }
  }
}
