var map;

function loadSinglePaper() {
  document.querySelector(".appreciation__content").innerHTML = "";

  // Get post id and resu
  var url = new URL(window.location.href);
  var id = new URLSearchParams(url.search);
  var postId = id.get("wallpaper");

  var resu = JSON.parse(localStorage.getItem("resu"));

  // Url
  var url = "/api/v1/wallpaper/read-single.php";
  var shData;

  if (map) {
    var page = map.indexOf(postId);

    if (page === 0) {
      document.querySelector("#prev-btn").style.opacity = 0;
      document.querySelector("#prev-btn").style.pointerEvents = "none";
      document.querySelector("#prev-btn").style.visibility = "hidden";
    } else {
      document.querySelector("#prev-btn").style.opacity = 1;
      document.querySelector("#prev-btn").style.pointerEvents = "all";
      document.querySelector("#prev-btn").style.visibility = "visible";
    }

    if (page === map.length - 1) {
      document.querySelector("#next-btn").style.opacity = 0;
      document.querySelector("#next-btn").style.pointerEvents = "none";
      document.querySelector("#next-btn").style.visibility = "hidden";
    } else {
      document.querySelector("#next-btn").style.opacity = 1;
      document.querySelector("#next-btn").style.pointerEvents = "all";
      document.querySelector("#next-btn").style.visibility = "visible";
    }
  }

  // data
  var pData = {
    wallpaper: postId,
  };

  if (resu === null || resu === "" || resu === " ") {
    pData.id = null;
  } else {
    pData.id = resu.second;
  }

  // New wallpaper
  var wallpaper = new Wallpaper("appreciation__content");
  wallpaper.insertLoader2();

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(pData),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      shData = data.data;
      wallpaper.removeLoader();

      wallpaper.name = data.data.wallpaper_name;
      wallpaper.altName = data.data.alt_name;
      wallpaper.image = data.data.thumbnail;
      wallpaper.description = data.data.body;
      wallpaper.likes = data.data.likes;
      wallpaper.downloads = data.data.downloads;
      wallpaper.createPaper();

      if (data.data.liked) {
        document.querySelector(".likeIcon").classList.remove("far");
        document.querySelector(".likeIcon").classList.add("fas");
        document.querySelector(".likeIcon").classList.add("liked");
      }

      var shbtn = document.querySelector("#shbtn");

      if (shbtn) {
        shbtn.addEventListener("click", function (ev) {
          if (shData) {
            var pgTitle = `${shData.wallpaper_name} || God Gat You Wallpaper`;
            var pgUrl = window.location.href;
            var text = `Check out '${shData.wallpaper_name}' Wallpaper on God Gat You!`;
            sharePost(pgTitle, pgUrl, text);
          }
        });
      }
    })
    .catch(function (err) {
      wallpaper.removeLoader();
      errorSubMsg("Failed to load", 2000, "add", "#1b1b1b");
      errorSubMsg("Failed to load", 7000, "remove", "#1b1b1b");
    });

  document.querySelector(".appreciation").style.display = "block";
  document
    .querySelector(".appreciation")
    .setAttribute("data-wallpaper", postId);
}

document.querySelector("body").addEventListener("click", (e) => {
  if (e.target.matches(".wallpapers__wallpaper, .wallpapers__wallpaper *")) {
    var postId = e.target
      .closest(".wallpapers__wallpaper")
      .getAttribute("data-wallpaper");

    var refresh =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?wallpaper=" +
      postId;
    window.history.pushState({ path: refresh }, "", refresh);

    loadSinglePaper();
  }
});

// On Load
window.addEventListener("load", function () {
  // Get post id and resu
  var url = new URL(window.location.href);
  var id = new URLSearchParams(url.search);
  var postId = id.get("wallpaper");

  if (postId) {
    loadSinglePaper();
  }
});

document.querySelector("#closeModal").addEventListener("click", (e) => {
  var refresh =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname;
  window.history.pushState({ path: refresh }, "", refresh);

  document.querySelector(".appreciation__content").innerHTML = "";
  document.querySelector(".appreciation").style.display = "none";
});

document.querySelector("#Thanks").addEventListener("click", (e) => {
  if (e.target.id == "Thanks") {
    var refresh =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState({ path: refresh }, "", refresh);

    document.querySelector(".appreciation__content").innerHTML = "";
    document.querySelector(".appreciation").style.display = "none";
  }
});

document.querySelectorAll(".post__controls button").forEach(function (e) {
  e.addEventListener("click", function (e) {
    if (e.target.matches("#prev-btn, #prev-btn *")) {
      var url = new URL(window.location.href);
      var id = new URLSearchParams(url.search);
      var postId = id.get("wallpaper");

      if (map) {
        if (postId) {
          var pg = map[map.indexOf(postId) - 1];

          var refresh =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?wallpaper=" +
            pg;
          window.history.pushState({ path: refresh }, "", refresh);

          loadSinglePaper();
        }
      }
    }

    if (e.target.matches("#next-btn, #next-btn *")) {
      var url = new URL(window.location.href);
      var id = new URLSearchParams(url.search);
      var postId = id.get("wallpaper");

      if (map) {
        if (postId) {
          var pg = map[map.indexOf(postId) + 1];

          var refresh =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?wallpaper=" +
            pg;
          window.history.pushState({ path: refresh }, "", refresh);

          loadSinglePaper();
        }
      }
    }
  });
});

document
  .querySelector(".appreciation, .appreciation *")
  .addEventListener("click", function (e) {
    if (e.target.matches(".download_paper, .download_paper *")) {
      var pc = document.querySelector("#pc");
      var tablet = document.querySelector("#tablet");
      var mobile = document.querySelector("#mobile");

      e.preventDefault();

      if (
        pc.checked === true ||
        tablet.checked === true ||
        mobile.checked === true
      ) {
        document.querySelector(".download_paper").classList.remove("disabled");
        errorSubMsg(
          "Your download will start in a while!",
          1000,
          "add",
          "#1b1b1b"
        );
        errorSubMsg(
          "Your download will start in a while!",
          4000,
          "remove",
          "#1b1b1b"
        );

        if (deferredPrompt) {
          deferredPrompt.prompt();

          deferredPrompt.userChoice.then(function (choiceResult) {
            console.log(choiceResult.outcome);

            if (choiceResult.outcome === "dismissed") {
              console.log("User canclled installation!");
            } else {
              console.log("App installed successfully!");
            }
          });
        }

        // Get post id and resu
        var postId = e.target
          .closest(".appreciation")
          .getAttribute("data-wallpaper");
        var resu = JSON.parse(localStorage.getItem("resu"));

        // Url
        var url = "/api/v1/wallpaper/download.php";

        // data
        var pData = {
          wallpaper: postId,
        };

        if (resu === null || resu === "" || resu === " ") {
          pData.id = null;
        } else {
          pData.id = resu.second;
        }

        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(pData),
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            var dData = data.data;

            if (pc.checked) {
              var markup1 = `
            <a href="/assets/uploads/wallpaper/${dData.desktop}" class="downlink" style="display: none;" download=""</a>
          `;

              document
                .querySelector(".downLinks")
                .insertAdjacentHTML("afterbegin", markup1);
            }

            if (tablet.checked) {
              var markup2 = `
            <a href="/assets/uploads/wallpaper/${dData.tablet}" class="downlink" style="display: none;" download=""></a>
          `;

              document
                .querySelector(".downLinks")
                .insertAdjacentHTML("afterbegin", markup2);
            }

            if (mobile.checked) {
              var markup3 = `
            <a href="/assets/uploads/wallpaper/${dData.mobile}" class="downlink" style="display: none;" download=""></a>
          `;

              document
                .querySelector(".downLinks")
                .insertAdjacentHTML("afterbegin", markup3);
            }

            function download() {
              var link = document.querySelectorAll(".downlink");
              link.forEach((e) => {
                e.click();
              });
            }
            download();
            document.querySelector(".download_form").reset();
            document.querySelector(".downLinks").innerHTML = "";
            document.querySelector(".downNum").textContent = data.downloads;
            document.querySelector(".download_paper").classList.add("disabled");
          })
          .catch(function (err) {
            errorSubMsg("oops! Something went wrong!", 5000, "add", "#1b1b1b");
            errorSubMsg(
              "oops! Something went wrong!",
              9000,
              "remove",
              "#1b1b1b"
            );
          });
      } else {
        document.querySelector(".download_paper").classList.add("disabled");
        errorSubMsg("Please select device", 300, "add", "#1b1b1b");
        errorSubMsg("Please select device", 4000, "remove", "#1b1b1b");
      }
    }

    if (e.target.matches("#forminn, #forminn *")) {
      var pc = document.querySelector("#pc");
      var tablet = document.querySelector("#tablet");
      var mobile = document.querySelector("#mobile");

      if (
        pc.checked === true ||
        tablet.checked === true ||
        mobile.checked === true
      ) {
        document.querySelector(".download_paper").classList.remove("disabled");
      } else {
        document.querySelector(".download_paper").classList.add("disabled");
      }
    }

    if (e.target.matches(".like, .like *")) {
      var resu = JSON.parse(localStorage.getItem("resu")).second;

      function likePost() {
        // Get post id and resu
        var postId = e.target
          .closest(".appreciation")
          .getAttribute("data-wallpaper");
        var resu = JSON.parse(localStorage.getItem("resu"));

        // Url
        var url = "/api/v1/wallpaper/like.php";

        // data
        var pData = {
          wallpaper: postId,
        };

        if (resu === null || resu === "" || resu === " ") {
          pData.id = null;
        } else {
          pData.id = resu.second;
        }

        if (!document.querySelector(".likeIcon").classList.contains("liked")) {
          var val = +document.querySelector(".stats .like span").innerHTML;
          val = val + 1;
          document.querySelector(".stats .like span").textContent = val;
          document.querySelector(".likeIcon").classList.remove("far");
          document.querySelector(".likeIcon").classList.add("fas");
          document.querySelector(".likeIcon").classList.add("liked");
        } else {
          var val = +document.querySelector(".stats .like span").innerHTML;
          val = val - 1;
          document.querySelector(".stats .like span").textContent = val;
          document.querySelector(".likeIcon").classList.add("far");
          document.querySelector(".likeIcon").classList.remove("fas");
          document.querySelector(".likeIcon").classList.remove("liked");
        }

        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(pData),
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            document.querySelector(".stats .like span").textContent =
              data.likes;

            if (!data.unliked) {
              document.querySelector(".likeIcon").classList.remove("far");
              document.querySelector(".likeIcon").classList.add("fas");
              document.querySelector(".likeIcon").classList.add("liked");
            } else {
              document.querySelector(".likeIcon").classList.add("far");
              document.querySelector(".likeIcon").classList.remove("fas");
              document.querySelector(".likeIcon").classList.remove("liked");
            }
          })
          .catch(function (err) {
            errorSubMsg("Failed to like", 1000, "add", "#1b1b1b");
            errorSubMsg("Failed to like", 5000, "remove", "#1b1b1b");
          });
      }

      if (resu === null || resu === "" || resu === " ") {
        welcome(300);

        document.querySelector("#body").addEventListener("click", function (e) {
          if (e.target.matches(".btn-close, .btn-close *")) {
            document.querySelector(".welcome").classList.add("closed");

            var data = {
              first: "GODGATYOUUSER",
              second: "",
            };
            localStorage.setItem("resu", JSON.stringify(data));

            errorSubMsg(
              "We need your name for you to like a post!",
              300,
              "add",
              "#1b1b1b"
            );
            errorSubMsg(
              "We need your name for you to like a post!",
              5000,
              "remove",
              "#1b1b1b"
            );
          }

          if (e.target.matches("form .enable")) {
            setTimeout(() => {
              likePost();
            }, 300);
          }
        });
      } else {
        likePost();
      }
    }
  });

var networkDataRecieved = false;
var currentData = false;
var page = 1;
var amount = 15;
var endOfPage = false;
var url = `/api/v1/wallpaper/read-index.php?a=${amount}&p=${page}`;

var wallpapers = new Wallpaper("wallpapers__wallpapers");

// Inserting Loaders
wallpapers.insertLoader();
document.querySelector(".post__controls").style.display = "none";

// Fething wallapers
fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    if (data.map) {
      map = data.map;
    }

    if (map) {
      document.querySelector(".post__controls").style.display = "flex";
    }

    networkDataRecieved = true;
    // Removing Loaders
    wallpapers.removeLoader();
    console.log("From network", data);

    // Clearing wallpapers
    wallpapers.clearCards();

    // Inserting wallpapers into dom
    for (let i = 0; i < data.data.length; i++) {
      var e = data.data[i];
      wallpapers.image = e.thumbnail;
      wallpapers.altName = e.alt_name;
      wallpapers.id = e.id;
      wallpapers.paper_id = e.paper_id;
      wallpapers.name = e.wallpaper_name;
      wallpapers.createRealWallpapers();
    }
    currentData = true;
  });

function fetchMoreWallpapers() {
  if (!endOfPage) {
    document.querySelector(".err").innerHTML = "";

    // Inserting Loaders
    wallpapers.insertLoader3("err");

    // Fething wallapers
    fetch(url)
      .then(
        function (res) {
          return res.json();
        },
        function (err) {
          if (page === 1) {
            page = 1;
          } else {
            page--;
          }

          console.log(err);
          // Removing Loaders
          wallpapers.removeLoader();

          errorSubMsg("Failed to load", 1000, "add", "#1b1b1b");
          errorSubMsg("Failed to load", 5000, "remove", "#1b1b1b");
        }
      )
      .then(function (data) {
        networkDataRecieved = true;
        if (data.map) {
          map = data.map;
        }

        // Removing Loaders
        wallpapers.removeLoader();
        console.log("From network", data);

        if (data.status) {
          // Inserting wallpapers into dom
          for (let i = 0; i < 10; i++) {
            var e = data.data[i];
            wallpapers.image = e.thumbnail;
            wallpapers.altName = e.alt_name;
            wallpapers.id = e.id;
            wallpapers.paper_id = e.paper_id;
            wallpapers.name = e.wallpaper_name;
            wallpapers.createRealWallpapers();
          }
        } else {
          var markup = `<p
                       style="
                         font-size: 1.8rem;
                         text-align: center;
                         color: #b5b5b5;
                         font-family: sans-serif;
                         padding: 2rem;
                          margin-top: 2rem;
                       "
                     >
                       <em
                         >It seems like you've come to the end!</em
                       >
                     </p>`;

          endOfPage = true;

          document.querySelector(".err").innerHTML = "";
          document.querySelector(".err").innerHTML = markup;
        }
        currentData = true;
      });
  }
}

window.addEventListener("scroll", function (e) {
  var scrollTop = document.documentElement.scrollTop;
  var scrollHeight = document.querySelector(".main-body").clientHeight;
  var clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight - 170) {
    page++;
    url = `/api/v1/wallpaper/read-index.php?a=${amount}&p=${page}`;
    if (endOfPage === false && networkDataRecieved === true) {
      fetchMoreWallpapers();
    }
  }
});

if ("indexedDB" in window) {
  readAllData("wallpapers").then(function (data) {
    if (!networkDataRecieved && !currentData) {
      if (data.length > 0) {
        console.log("From cache: ", data);
        document.querySelector(".wallpapers__wallpapers").innerHTML = "";

        var orderedData = [];

        [...data]
          .sort(function (a, b) {
            return b.id - a.id;
          })
          .forEach(function (e) {
            orderedData.push(e);
          });

        console.log(orderedData);

        // Inseting wallpapers into DOM
        // for (let i = 0; i < data.length; i++) {
        //   var e = orderedData[i];
        //   wallpapers.image = e.thumbnail;
        //   wallpapers.altName = e.alt_name;
        //   wallpapers.id = e.id;
        //   wallpapers.paper_id = e.paper_id;
        //   wallpapers.name = e.wallpaper_name;
        //   wallpapers.createRealWallpapers();
        // }

        orderedData.forEach(function (e) {
          wallpapers.image = e.thumbnail;
          wallpapers.altName = e.alt_name;
          wallpapers.id = e.id;
          wallpapers.paper_id = e.paper_id;
          wallpapers.name = e.wallpaper_name;
          wallpapers.createRealWallpapers();
        });

        wallpapers.removeLoader();
      } else {
        var markup = `<p
                       style="
                         font-size: 2.3rem;
                         text-align: center;
                         color: #b5b5b5;
                         font-family: sans-serif;
                         padding: 2rem;
                        
                       "
                     >
                       <em
                         >Sorry wallpapers are not avaliable for the moment. Please check internet connection and try again!</em
                       >
                     </p>`;
        wallpapers.removeLoader();

        document
          .querySelector(".wallpapers__wallpapers")
          .insertAdjacentHTML("afterbegin", markup);
      }

      window.addEventListener(
        "online",
        function (e) {
          if (currentData === false && networkDataRecieved === false) {
            page = 1;
            amount = 15;
            endOfPage = false;
            url = `/api/v1/wallpaper/read-index.php?a=${amount}&p=${page}`;
            fetch(url)
              .then(function (res) {
                return res.json();
              })
              .then(function (data) {
                if (data.map) {
                  map = data.map;
                }

                if (map) {
                  document.querySelector(".post__controls").style.display =
                    "flex";
                }

                networkDataRecieved = true;
                console.log("From network", data);

                // Clearing wallpapers
                wallpapers.clearCards();

                // Inserting wallpapers into dom
                // for (let i = 0; i < 10; i++) {
                //   var e = data.data[i];
                //   wallpapers.image = e.thumbnail;
                //   wallpapers.altName = e.alt_name;
                //   wallpapers.id = e.id;
                //   wallpapers.paper_id = e.paper_id;
                //   wallpapers.name = e.wallpaper_name;
                //   wallpapers.createRealWallpapers();
                // }

                data.data.forEach(function (e) {
                  wallpapers.image = e.thumbnail;
                  wallpapers.altName = e.alt_name;
                  wallpapers.id = e.id;
                  wallpapers.paper_id = e.paper_id;
                  wallpapers.name = e.wallpaper_name;
                  wallpapers.createRealWallpapers();
                });

                currentData = true;

                // Removing Loaders
                wallpapers.removeLoader();
              });
          }
        },
        false
      );
    }
  });
}
