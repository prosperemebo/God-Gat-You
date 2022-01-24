class Post {
  id = this.id;
  post_id = this.post_id;
  alt_name = this.alt_name;
  body = this.body;
  image = this.image;
  likes = this.likes;
  commentNum = this.commentNum;
  comments = this.comments;
  liked = this.liked;
  commenter = this.commenter;
  comment = this.comment;
  date = this.date;
  error = this.error;

  async fetchPost() {
    var resu = JSON.parse(localStorage.getItem("resu"));
    var sData = {
      post: this.post_id,
    };

    if (resu === null || resu === "" || resu === " ") {
      sData.id = null;
    } else {
      sData.id = resu.second;
    }

    try {
      var res = await fetch("/api/v1/post/read-single.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(sData),
      });

      var data = await res.json();
      this.error = false;
      return data;
    } catch (err) {
      this.error = true;
    }
  }

  async viewPost() {
    var resu = JSON.parse(localStorage.getItem("resu"));
    var sData = {
      post: this.post_id,
    };

    if (resu === null || resu === "" || resu === " ") {
      sData.id = null;
    } else {
      sData.id = resu.second;

      try {
        var res = await fetch("/api/v1/post/view.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(sData),
        });

        var data = await res.json();
        this.error = false;
        return data;
      } catch (err) {
        this.error = true;
      }
    }
  }

  async likePost() {
    var resu = JSON.parse(localStorage.getItem("resu"));
    var sData = {
      post: this.post_id,
    };

    if (resu === null || resu === "" || resu === " ") {
      sData.id = null;
    } else {
      sData.id = resu.second;

      try {
        var res = await fetch("/api/v1/post/like.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(sData),
        });

        var data = await res.json();
        this.error = false;
        return data;
      } catch (err) {
        this.error = true;
      }
    }
  }

  loadPost() {
    var markup = `
        <div class="blog__post--header">
        <img
            src="/assets/uploads/blog/blog${this.image}"
            alt="${this.alt_name}"
        />
        <div class="overlay"></div>
        <a href="/blog/"><span class="lnr lnr-chevron-left"></span></a>
        </div>
        <div class="blog__post--stats">
        <div class="blog__post--stats--el">
            <small>
            <span class="lnr lnr-calendar-full"></span>
            <p class="datePostPost">${this.date}</p>
            </small>
            <small>
            <span class="lnr lnr-eye"></span>
            <p>${this.views}</p>
            </small>
            <small>
            <span class="lnr lnr-bubble"></span>
            <p id="cmt_num">${this.commentNum}</p>
            </small>
            <small id="shbtn" style="cursor: pointer">
            <i class="fas fa-share"></i>
            <p id="cmt_num">share</p>
            </small>
        </div>
        <div class="blog__post--stats--lk">
            <small style="cursor: pointer" id="likePost">
                <p style="cursor: pointer">${this.likes}</p>
            </small>
        </div>
        </div>
        <div class="blog__post--content">
        <h1>${this.title}</h1>
        <p>${this.body}</p>
        </div>

        <!-- COMMENT SECTION -->
        <div class="blog__post--comments">
            <form
                class="blog__post--comments--post"
                action=""
            >
                <input type="text" id="comment-field" name="comment" autocomplete="off" placeholder="Add a comment" />
                <button type="submit" name="commentSubmit" id="commentOnPost" class="btn btn--sm disabled">Post</button>
            </form>
            <h1>Comments</h1>
            <div id="commentSec"></div>
        </div>
    `;

    document
      .querySelector(".blog__post")
      .insertAdjacentHTML("beforeend", markup);
  }

  loadError() {
    var markup = ` 
        <div class="sizedbox"></div>
        <div class="sizedbox"></div>
        <div class="sizedbox"></div>

        <a href="/blog/" class="err-back"
        ><span class="lnr lnr-chevron-left"></span
        ></a>
        <p
        style="
            font-size: 2.5rem;
            text-align: center;
            margin-top: 4rem;
            color: #c5c5c5;
            padding: 1rem;
            font-family: sans-serif;
        "
        >
        <em
            >Oops! this post cannot be found, it must have been moved or
            deleted!</em
        >
        </p>
    `;

    document
      .querySelector(".blog__post")
      .insertAdjacentHTML("beforeend", markup);
  }

  loadComments() {
    var markup = `
        <div class="blog__post--comments--comment">
            <h2>${this.commenter}</h2>
            <p>${this.comment}</p>
            <small class="datePostPost">${this.date}</small>
        </div>
    `;

    document
      .querySelector("#commentSec")
      .insertAdjacentHTML("beforeend", markup);
  }

  loadCommentError() {
    var markup = `
        <p
        style="
            font-size: 1.7rem;
            text-align: center;
            margin-top: 4rem;
            color: #c5c5c5;
            font-family: sans-serif;
        "
        >
        <em>There are no comments yet!</em>
        </p>
        <div class="sizedbox"></div>
        <div class="sizedbox"></div>
        <div class="sizedbox"></div>
    `;

    document
      .querySelector("#commentSec")
      .insertAdjacentHTML("beforeend", markup);
  }
}

// Declaring Variables
var post = new Post();

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

async function loadPost() {
  var url = new URL(window.location.href);
  var id = new URLSearchParams(url.search);
  post.post_id = id.get("post");
  post.viewPost();
  var data = await post.fetchPost();
  console.log("From Network", data);

  if (data.status) {
    var singlePost = data.data;

    post.image = singlePost.image;
    post.alt_name = singlePost.alt_name;
    post.date = formatDate(singlePost.date);
    post.views = singlePost.views;
    post.commentNum = singlePost.commentNum;
    post.likes = singlePost.likes;
    post.title = singlePost.title;
    post.body = singlePost.body;

    post.loadPost();

    var shbtn = document.querySelector("#shbtn");

    if (shbtn) {
      shbtn.addEventListener("click", function (ev) {
        if (singlePost) {
          var pgTitle = `${singlePost.title} || God Gat You Post`;
          var pgUrl = window.document.location.href;
          var text = `Check out '${singlePost.title}' post on God Gat You!`;
          sharePost(pgTitle, pgUrl, text);
        }
      });
    }

    if (singlePost.liked) {
      var markup = `
                <i class="fa-heart likeIcon fas liked"></i>
          `;

      document
        .getElementById("likePost")
        .insertAdjacentHTML("afterbegin", markup);
    } else {
      var markup = `
                <i class="fa-heart likeIcon far"></i>
          `;

      document
        .getElementById("likePost")
        .insertAdjacentHTML("afterbegin", markup);
    }

    if (singlePost.comments.length > 0) {
      var orderedData = [];

      [...singlePost.comments]
        .sort(function (a, b) {
          return b.id - a.id;
        })
        .forEach(function (e) {
          orderedData.push(e);
        });

      orderedData.forEach(function (comment) {
        post.commenter = comment.commenter;
        post.date = formatDate(comment.date);
        post.comment = comment.description;

        post.loadComments();
      });
    } else {
      post.loadCommentError();
    }
  } else {
    post.loadError();
  }
}

function commentt(comment) {
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
  var url = new URL(window.location.href);
  var id = new URLSearchParams(url.search);
  var post = id.get("post");
  var resu = JSON.parse(localStorage.getItem("resu"));
  var scc = comment;

  fetch("/api/v1/post/comment.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      id: new Date().toISOString(),
      post: post,
      commenter: resu.first,
      user: resu.second,
      comment: comment,
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

        document.querySelector("#commentSec").innerHTML = "";
        document.querySelector("#cmt_num").innerHTML = data.comments.length;

        var post = new Post();

        orderedData.forEach(function (comment) {
          post.commenter = comment.commenter;
          post.date = formatDate(comment.date);
          post.comment = comment.description;

          post.loadComments();
        });
      } else {
        post.loadCommentError();
      }
    })
    .catch(function (err) {
      console.log(err);
      if ("serviceWorker" in navigator && "SyncManager" in window) {
        navigator.serviceWorker.ready.then(function (sw) {
          var comment = {
            id: new Date().toISOString(),
            post: post,
            commenter: resu.first,
            user: resu.second,
            comment: scc,
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
      }
    });
}

function events() {
  document.querySelector("body").addEventListener("click", function (event) {
    if (event.target.matches("#likePost, #likePost *")) {
      var resu = JSON.parse(localStorage.getItem("resu"));

      function likePost() {
        // Get post id and resu
        var url = new URL(window.location.href);
        var id = new URLSearchParams(url.search);
        var postId = id.get("post");
        var resu = JSON.parse(localStorage.getItem("resu"));

        // Url
        var url = "/api/v1/post/like.php";

        // data
        var pData = {
          id: resu.second,
          post: postId,
        };

        if (!document.querySelector(".likeIcon").classList.contains("liked")) {
          var val = +document.querySelector("#likePost p").innerHTML;
          val = val + 1;
          document.querySelector("#likePost p").textContent = val;
          document.querySelector(".likeIcon").classList.remove("far");
          document.querySelector(".likeIcon").classList.add("fas");
          document.querySelector(".likeIcon").classList.add("liked");
        } else {
          var val = +document.querySelector("#likePost p").innerHTML;
          val = val - 1;
          document.querySelector("#likePost p").textContent = val;
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
            document.querySelector("#likePost p").textContent = data.likes;

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
        var data = {
          first: "GODGATYOUUSER",
          second: "",
        };

        localStorage.setItem("resu", JSON.stringify(data));
      }

      resu = JSON.parse(localStorage.getItem("resu")).second;

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

    if (event.target.matches("#commentOnPost, #commentOnPost *")) {
      event.preventDefault();
      var comment = document.getElementById("comment-field").value;

      comment = comment.trimStart();
      if (comment.length >= 3) {
        var resu = JSON.parse(localStorage.getItem("resu"));

        if (resu === null || resu === "" || resu === " ") {
          var data = {
            first: "GODGATYOUUSER",
            second: "",
          };

          localStorage.setItem("resu", JSON.stringify(data));
        }

        resu = JSON.parse(localStorage.getItem("resu")).second;

        if (resu === null || resu === "" || resu === " ") {
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
          console.log(comment);
          commentt(comment);
          document.querySelector(".blog__post--comments--post").reset();
        }
      } else {
        errorSubMsg("Please add a comment!", 500, "add", "#1b1b1b");
        errorSubMsg("Please add a comment!", 3000, "remove", "#1b1b1b");
        document.getElementById("comment-field").focus();
        return;
      }
    }
  });

  document.querySelector(" body").addEventListener("keyup", function (event) {
    if (event.target.matches("#comment-field, #comment-field")) {
      var inputValue = event.target.value;
      inputValue = inputValue.trimStart();
      if (inputValue.length >= 3) {
        document.querySelector("#commentOnPost").classList.remove("disabled");
      } else {
        document.querySelector("#commentOnPost").classList.add("disabled");
      }
    }
  });
}

function app() {
  loadPost();
  events();
}

app();
