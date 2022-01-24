class Gallery {
  id = this.id;
  image = this.image;
  image_id = this.image_id;
  name = this.name;
  alt_name = this.alt_name;
  body = this.body;
  likes = this.likes;
  comments = this.comments;
  date = this.date;
  comment_id = this.comment_id;
  commenter = this.commenter;
  comment_body = this.comment_body;
  comment_date = this.comment_date;

  constructor(parent) {
    this.parent = parent;
  }

  createPosts() {
    var markup = `
            <figure class="wallpapers__wallpaper star" id="${this.id}" data-gallery="${this.image_id}" data-aos="fade-up" style="background-image: url(/assets/images/ggy_dummy_img.jpg); background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 3px;">
                <div>
                    <img src="/assets/uploads/gallery/gallery${this.image}" draggable="false" alt="${this.alt_name}">
                </div>
                <div class="stats">
                    <div class="wrap">
                        <div class="likes ss">
                            <span class="lnr lnr-heart"></span>
                            <p>${this.likes}<p>
                        </div>
                        <div class="views ss">
                            <span class="lnr lnr-bubble"></span>
                            <p>${this.comments}</p>
                        </div>
                    </div>
                </div>
            </figure>
        `;

    document
      .querySelector(`.${this.parent}`)
      .insertAdjacentHTML("beforeend", markup);
  }

  loadPost() {
    var dip = this.date.split("-");
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
    this.date = newDate;

    var markup = `
            
            <figure class="overview overview__gall">
              <img
                id="${this.id}"
                src="/assets/uploads/gallery/gallery${this.image}"
                draggable="false"
                alt="${this.alt_name}"
              />
              <figcaption>
                <div class="sts">
                  <div class="like">
                    <i class="far fa-heart likeIcon"></i>
                    <span>${this.likes}</span>
                  </div>
                  <div class="comments">
                    <span class="lnr lnr-bubble"></span>
                    <span id="cmt_num">${this.commentNum}</span>
                  </div>
                  <div class="comments" id="shbtn" style="cursor: pointer; padding: .5rem">
                    <i class="fas fa-share"></i>
                    <span id="cmt_num">share</span>
                  </div>
                </div>
              </figcaption>
            </figure>
            <div class="gall_desc">
              <div class="origin">
                <p>
                  ${this.body}
                </p>
                <small>${this.date}</small>
              </div>
              <form class="gall_form" id="post_comment">
                <input
                  type="text"
                  class="comment"
                  id="comment_cmt"
                  placeholder="Drop a comment..."
                  autocomplete="off"
                />
                <button class="gall_btn disabled" id="post-cmt-btn" type="submit">
                  Post<i class="fas fa-paper-plane"></i>
                </button>
              </form>
              <ul id="gall-cmt">

              </ul>
              
            </div>
        `;

    if (
      document
        .querySelector(`.${this.parent}`)
        .insertAdjacentHTML("beforeend", markup)
    ) {
      return true;
    } else {
      return false;
    }
  }

  loadComments() {
    var dip = this.comment_date.split("-");
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
    this.comment_date = newDate;

    var markup = `
            <li data-comment-id="${this.comment_id}">
                <h3>${this.commenter}</h3>
                <p>
                    ${this.comment_body}
                </p>
                <small>${this.comment_date}</small>
            </li>
        `;

    document.querySelector("#gall-cmt").insertAdjacentHTML("beforeend", markup);
  }

  insertLoader() {
    var markup = `
            <div class="loader" style="display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 3rem"
            >
                <img draggable="false" alt="loader" src="/assets/images/icons/app-icon-96x96.png">
            </div>
        `;

    document
      .querySelector(`.${this.parent}`)
      .insertAdjacentHTML("afterend", markup);
  }

  insertLoader2() {
    var markup = `
            <div class="loader" style="display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 3rem;"
            >
                <img draggable="false" alt="loader" src="/assets/images/icons/app-icon-96x96.png">
            </div>
        `;

    document
      .querySelector(`.${this.parent}`)
      .insertAdjacentHTML("beforeend", markup);
  }

  insertLoader3(pp) {
    var markup = `
            <div class="loader" style="display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 3rem"
            >
                <img draggable="false" alt="loader" src="/assets/images/icons/app-icon-96x96.png">
            </div>
        `;

    document.querySelector(`.${pp}`).insertAdjacentHTML("beforeend", markup);
  }

  removeLoader() {
    var loader = document.querySelector(".loader");
    if (loader)
      document.querySelector(".loader").parentElement.removeChild(loader);
  }

  clearCards() {
    while (document.querySelector(`.${this.parent}`).hasChildNodes()) {
      document
        .querySelector(`.${this.parent}`)
        .removeChild(document.querySelector(`.${this.parent}`).lastChild);
    }
  }

  clearCards() {
    while (document.querySelector(`.${this.parent}`).hasChildNodes()) {
      document
        .querySelector(`.${this.parent}`)
        .removeChild(document.querySelector(`.${this.parent}`).lastChild);
    }
  }
}

var map;

var galleryContainer = document.querySelector(".wallpapers__wallpapers");
var shData;

function loadCon(imageId, resu) {
  document.querySelector(".appreciation__content").innerHTML = "";

  // Url
  var url = "/api/v1/gallery/read-single.php";
  var urll = new URL(window.location.href);
  var id = new URLSearchParams(urll.search);
  var imageId = id.get("gallery");

  if (map) {
    var urll = new URL(window.location.href);
    var id = new URLSearchParams(urll.search);
    var imageId = id.get("gallery");

    var page = map.indexOf(imageId);

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
  // var pData = {
  //   gallery: imageId,
  //   id: resu.second,
  // };

  // data
  var pData = {
    gallery: imageId,
  };

  if (resu === null || resu === "" || resu === " ") {
    pData.id = null;
  } else {
    pData.id = resu.second;
  }

  var gallery = new Gallery("appreciation__content");
  gallery.insertLoader2();

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
      gallery.removeLoader();

      shData = data.data;

      gallery.id = data.data.id;
      gallery.alt_name = data.data.alt_name;
      gallery.image = data.data.image;
      gallery.likes = data.data.likes;
      gallery.commentNum = data.data.commentNum;
      gallery.body = data.data.body;
      gallery.date = data.data.date;

      gallery.loadPost();

      if (data.data.liked) {
        document.querySelector(".likeIcon").classList.remove("far");
        document.querySelector(".likeIcon").classList.add("fas");
        document.querySelector(".likeIcon").classList.add("liked");
      }

      if (data.data.comments.length > 0) {
        var orderedData = [];

        [...data.data.comments]
          .sort(function (a, b) {
            return b.id - a.id;
          })
          .forEach(function (e) {
            orderedData.push(e);
          });

        orderedData.forEach((e) => {
          gallery.comment_id = e.id;
          gallery.commenter = e.commenter;
          gallery.comment_body = e.description;
          gallery.comment_date = e.date;
          gallery.loadComments();
        });
      } else {
        var markup = `
                    <p
                       style="
                         font-size: 1.5rem;
                         text-align: center;
                         color: #b5b5b5;
                         font-family: sans-serif;
                         padding: 2rem;
                          margin-top: 2rem;
                       "
                     >
                       <em
                         >There are no comments yet!</em
                       >
                     </p>
                  `;
        document
          .querySelector("#gall-cmt")
          .insertAdjacentHTML("beforeend", markup);
      }

      var shbtn = document.querySelector("#shbtn");

      if (shbtn) {
        shbtn.addEventListener("click", function (ev) {
          if (shData) {
            var pgTitle = `${shData.name} || God Gat You Gallery`;
            var pgUrl = window.document.location.href;
            var text = `Check out '${shData.name}' post on God Gat You!`;
            sharePost(pgTitle, pgUrl, text);
          }
        });
      }

      var comment_form = document.querySelector("#post_comment");
      var comment_text = document.querySelector("#comment_cmt");

      comment_form.addEventListener("submit", function (event) {
        event.preventDefault();

        function sendComment(post, resu, resuId, comments_text) {
          if (deferredPrompt) {
            deferredPrompt.prompt();

            deferredPrompt.userChoice.then(function (choiceResult) {
              if (choiceResult.outcome === "dismissed") {
                console.log("User canclled installation!");
              } else {
                console.log("App installed successfully!");
              }
            });
          }

          fetch("/api/v1/gallery/comment.php", {
            method: "POST",
            headers: {
              "Content/Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              post: post,
              commenter: resu,
              user: resuId,
              comment: comments_text,
            }),
          })
            .then(
              function (res) {
                return res.json();
              },
              function (err) {
                errorSubMsg("Failed to comment!", 300, "add", "#1b1b1b");
                errorSubMsg("Failed to comment!", 5000, "remove", "#1b1b1b");
              }
            )
            .then(function (data) {
              if (data.data.comments.length > 0) {
                var orderedData = [];

                [...data.comments]
                  .sort(function (a, b) {
                    return b.id - a.id;
                  })
                  .forEach(function (e) {
                    orderedData.push(e);
                  });

                orderedData.forEach((e) => {
                  gallery.comment_id = e.id;
                  gallery.commenter = e.commenter;
                  gallery.comment_body = e.description;
                  gallery.comment_date = e.date;
                  gallery.loadComments();
                });
              } else {
                var markup = `
                    <p
                       style="
                         font-size: 1.5rem;
                         text-align: center;
                         color: #b5b5b5;
                         font-family: sans-serif;
                         padding: 2rem;
                          margin-top: 2rem;
                       "
                     >
                       <em
                         >There are no comments yet!</em
                       >
                     </p>
                  `;
                document
                  .querySelector("#gall-cmt")
                  .insertAdjacentHTML("beforeend", markup);
              }
            });
        }

        function comment(post, resu, resuId, comments_text) {
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

          fetch("/api/v1/gallery/comment.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              id: new Date().toISOString(),
              post: post,
              commenter: resu,
              user: resuId,
              comment: comments_text,
            }),
          })
            .then(function (res) {
              return res.json();
            })
            .then(function (data) {
              console.log(data);
              if (data.comments.length > 0) {
                var orderedData = [];

                [...data.comments]
                  .sort(function (a, b) {
                    return b.id - a.id;
                  })
                  .forEach(function (e) {
                    orderedData.push(e);
                  });

                document.querySelector("#gall-cmt").innerHTML = "";
                document.querySelector("#cmt_num").innerHTML =
                  data.comments.length;

                var gallery = new Gallery("appreciation__content");

                orderedData.forEach((e) => {
                  gallery.comment_id = e.id;
                  gallery.commenter = e.commenter;
                  gallery.comment_body = e.description;
                  gallery.comment_date = e.date;
                  gallery.loadComments();
                });
              } else {
                var markup = `
                    <p
                       style="
                         font-size: 1.5rem;
                         text-align: center;
                         color: #b5b5b5;
                         font-family: sans-serif;
                         padding: 2rem;
                          margin-top: 2rem;
                       "
                     >
                       <em
                         >There are no comments yet!</em
                       >
                     </p>
                  `;
                document
                  .querySelector("#gall-cmt")
                  .insertAdjacentHTML("beforeend", markup);
              }
            })
            .catch(function (err) {
              console.log(err);
              if ("serviceWorker" in navigator && "SyncManager" in window) {
                navigator.serviceWorker.ready.then(function (sw) {
                  var comment = {
                    id: new Date().toISOString(),
                    post: post,
                    commenter: resu,
                    user: resuId,
                    comment: comments_text,
                  };
                  writeData("sync-comments", comment)
                    .then(function () {
                      return sw.sync.register("sync-new-comment");
                    })
                    .then(function () {
                      errorSubMsg(
                        "Your comment was saved for syncing!",
                        1000,
                        "add",
                        "#1b1b1b"
                      );
                      errorSubMsg(
                        "Your comment was saved for syncing!",
                        5000,
                        "remove",
                        "#1b1b1b"
                      );
                    })
                    .catch(function (err) {
                      console.log(err);
                    });
                });
              } else {
                sendComment(post, resu, resuId, comments_text);
              }
            });
        }

        if (comment_text.value.trim() === "") {
          errorSubMsg("Please add a comment!", 1000, "add", "#1b1b1b");
          errorSubMsg("Please add a comment!", 5000, "remove", "#1b1b1b");
          document.getElementById("comment_cmt").focus();
          return;
        }

        // Get post id and resu
        var postId = document
          .querySelector("#Thanks")
          .getAttribute("data-gallery");
        var resu = JSON.parse(localStorage.getItem("resu"));

        if (
          resu.second.trim() === null ||
          resu.second.trim() === "" ||
          resu.second.trim() === " "
        ) {
          welcome(300);

          document
            .querySelector("#body")
            .addEventListener("click", function (e) {
              if (e.target.matches(".btn-close, .btn-close *")) {
                document.querySelector(".welcome").classList.add("closed");

                var data = {
                  first: "GODGATYOUUSER",
                  second: "",
                };
                localStorage.setItem("resu", JSON.stringify(data));

                errorSubMsg(
                  "We need your name for you to comment!",
                  300,
                  "add",
                  "#1b1b1b"
                );
                errorSubMsg(
                  "We need your name for you to comment!",
                  5000,
                  "remove",
                  "#1b1b1b"
                );

                return false;
              }

              if (e.target.matches("form .enable#hey")) {
                setTimeout(() => {
                  errorSubMsg(
                    "oops! i guess you'll try that again!",
                    300,
                    "add",
                    "#1b1b1b"
                  );
                  errorSubMsg(
                    "oops! i guess you'll try that again!",
                    2000,
                    "remove",
                    "#1b1b1b"
                  );
                }, 300);
              }
            });
        } else {
          if (
            resu.second.trim() !== null ||
            resu.second.trim() !== "" ||
            resu.second.trim() !== " " ||
            resu.first.trim() !== null ||
            resu.first.trim() !== "" ||
            resu.first.trim() !== " " ||
            resu.first.trim() !== "GODGATYOUUSER"
          ) {
            comment(postId, resu.first, resu.second, comment_text.value);
            comment_form.reset();
          }
        }
      });

      document
        .querySelector("#comment_cmt")
        .addEventListener("keyup", function (ev) {
          this.value = this.value.trimStart();

          if (this.value.length >= 3) {
            document.querySelector("#post-cmt-btn").classList.add("enable");
          } else {
            document.querySelector("#post-cmt-btn").classList.remove("enable");
          }
        });
    })
    .catch(function (err) {
      gallery.removeLoader();
      errorSubMsg("Failed to load", 2000, "add", "#1b1b1b");
      errorSubMsg("Failed to load", 7000, "remove", "#1b1b1b");
    });

  document.querySelector(".appreciation").style.display = "block";
  document.querySelector(".appreciation").setAttribute("data-gallery", imageId);
}

galleryContainer.addEventListener("click", function (e) {
  if (e.target.matches(".star, .star *")) {
    var imageId = e.target.closest(".star").getAttribute("data-gallery");
    var resu = JSON.parse(localStorage.getItem("resu"));

    var refresh =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?gallery=" +
      imageId;

    window.history.pushState({ path: refresh }, "", refresh);

    loadCon(imageId, resu);
  }
});

window.addEventListener("load", function () {
  var imageId = window.location.hash.replace("#", "");
  var resu = JSON.parse(localStorage.getItem("resu"));

  var url = new URL(window.location.href);
  var id = new URLSearchParams(url.search);
  var imageId = id.get("gallery");

  if (imageId) {
    loadCon(imageId, resu);
  }
});

document.querySelectorAll(".post__controls button").forEach(function (e) {
  e.addEventListener("click", function (e) {
    if (e.target.matches("#prev-btn, #prev-btn *")) {
      var url = new URL(window.location.href);
      var id = new URLSearchParams(url.search);
      var postId = id.get("gallery");

      if (map) {
        if (postId) {
          var pg = map[map.indexOf(postId) - 1];

          var refresh =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?gallery=" +
            pg;
          window.history.pushState({ path: refresh }, "", refresh);

          var resu = JSON.parse(localStorage.getItem("resu"));

          if (pg) {
            loadCon(pg, resu);
          }
        }
      }
    }

    if (e.target.matches("#next-btn, #next-btn *")) {
      var url = new URL(window.location.href);
      var id = new URLSearchParams(url.search);
      var postId = id.get("gallery");

      if (map) {
        if (postId) {
          var pg = map[map.indexOf(postId) + 1];

          var refresh =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?gallery=" +
            pg;
          window.history.pushState({ path: refresh }, "", refresh);

          var resu = JSON.parse(localStorage.getItem("resu"));

          if (pg) {
            loadCon(pg, resu);
          }
        }
      }
    }
  });
});

document
  .querySelector(".appreciation, .appreciation *")
  .addEventListener("click", function (e) {
    if (e.target.matches(".like, .like *")) {
      var resu = JSON.parse(localStorage.getItem("resu"));

      function likePost() {
        // Get post id and resu
        var postId = e.target
          .closest(".appreciation")
          .getAttribute("data-gallery");
        var resu = JSON.parse(localStorage.getItem("resu")).second;

        // Url
        var url = "/api/v1/gallery/like.php";

        // data
        var pData = {
          id: resu,
          gallery: postId,
        };

        if (!document.querySelector(".likeIcon").classList.contains("liked")) {
          var val = +document.querySelector(".sts .like span").innerHTML;
          val = val + 1;
          document.querySelector(".sts .like span").textContent = val;
          document.querySelector(".likeIcon").classList.remove("far");
          document.querySelector(".likeIcon").classList.add("fas");
          document.querySelector(".likeIcon").classList.add("liked");
        } else {
          var val = +document.querySelector(".sts .like span").innerHTML;
          val = val - 1;
          document.querySelector(".sts .like span").textContent = val;
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
            document.querySelector(".sts .like span").textContent = data.likes;

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
        });
      } else {
        likePost();
      }
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

// Fetching wallpapers
var networkDataRecieved = false;
var currentData = false;
var page = 1;
var amount = 15;
var endOfPage = false;
var url = `/api/v1/gallery/read-index.php?a=${amount}&p=${page}`;

var gallery = new Gallery("wallpapers__wallpapers");

// Inserting Loaders
gallery.insertLoader();

fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log("From network: ", data);
    networkDataRecieved = true;

    if (data.map) {
      map = data.map;
    }

    // Removing Loaders
    gallery.removeLoader();

    gallery.clearCards();

    data.data.forEach((e) => {
      gallery.id = e.id;
      gallery.image_id = e.image_id;
      gallery.image = e.image;
      gallery.alt_name = e.alt_name;
      gallery.likes = e.likes;
      gallery.comments = e.comments;
      gallery.createPosts();
    });

    currentData = true;
  });

function fetchMorePosts() {
  if (!endOfPage) {
    document.querySelector(".err").innerHTML = "";

    // Inserting Loaders
    gallery.insertLoader3("err");

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
          gallery.removeLoader();

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
        gallery.removeLoader();
        console.log("From network", data);

        if (data.status) {
          // Inserting gallery into dom
          data.data.forEach((e) => {
            gallery.id = e.id;
            gallery.image_id = e.image_id;
            gallery.image = e.image;
            gallery.alt_name = e.alt_name;
            gallery.likes = e.likes;
            gallery.comments = e.comments;
            gallery.createPosts();
          });
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
    url = `/api/v1/gallery/read-index.php?a=${amount}&p=${page}`;
    if (endOfPage === false && networkDataRecieved === true) {
      fetchMorePosts();
    }
  }
});

if ("indexedDB" in window) {
  readAllData("gallery").then(function (data) {
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

        // Inseting wallpapers into DOM
        for (var i = 0; i < data.length; i++) {
          var e = orderedData[i];
          gallery.id = e.id;
          gallery.image_id = e.image_id;
          gallery.image = e.image;
          gallery.alt_name = e.alt_name;
          gallery.likes = e.likes;
          gallery.comments = e.comments;
          gallery.createPosts();
        }

        gallery.removeLoader();
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
                         >Sorry photos are not avaliable for the moment. Please check internet connection and try again!</em
                       >
                     </p>`;
        gallery.removeLoader();

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
            url = `/api/v1/gallery/read-index.php?a=${amount}&p=${page}`;
            fetch(url)
              .then(function (res) {
                return res.json();
              })
              .then(function (data) {
                networkDataRecieved = true;
                console.log("From network", data);

                if (data.map) {
                  map = data.map;
                }

                // Clearing Images
                gallery.clearCards();

                // Inserting wallpapers into dom
                for (var i = 0; i < 10; i++) {
                  var e = data.data[i];
                  gallery.id = e.id;
                  gallery.image_id = e.image_id;
                  gallery.image = e.image;
                  gallery.alt_name = e.alt_name;
                  gallery.likes = e.likes;
                  gallery.comments = e.comments;
                  gallery.createPosts();
                }
                currentData = true;

                // Removing Loaders
                gallery.removeLoader();
              });
          }
        },
        false
      );
    }
  });
}
