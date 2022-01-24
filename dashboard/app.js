var app = new App();

// MANUAL STUFFS
function auth() {
  var accessData = JSON.parse(localStorage.getItem("admin"));

  if (!accessData) {
    app.lock();
  } else {
    var tkn = accessData.token;

    fetch("/api/v1/admin/verify.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token: tkn,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.status) {
          app.access = data.allAccess;
          var dd = JSON.parse(localStorage.getItem("admin"));

          var ndd = {
            name: dd.name,
            token: data.token,
          };

          localStorage.setItem("admin", JSON.stringify(ndd));

          startDashboard();
        } else {
          app.deny();
        }

        console.log(data);
      });
  }
}

async function startDashboard() {
  var dashboard = new Dashboard();
  app.grant();
  dashboard.sectionize();
  dashboardEvents(dashboard);

  var statData = await dashboard.getStats();

  if (statData) {
    var section = localStorage.getItem("section");

    if (section === "adm") {
      if (!statData.access) {
        localStorage.getItem("section", "wal");
        restartDashboard();

        return;
      }
    }

    dashboard.postNum = statData.index;
    dashboard.renderData();
    counter();
    renderPost(statData.data, dashboard);

    var tar = document.getElementById("uploadNow");

    if (section === "wal") {
      tar.setAttribute("action", "/api/v1/wallpaper/upload.php");
    } else if (section === "gal") {
      tar.setAttribute("action", "/api/v1/gallery/upload.php");
    } else if (section === "str") {
      tar.setAttribute("action", "/api/v1/products/upload-product.php");
    } else if (section === "blg") {
      tar.setAttribute("action", "/api/v1/post/upload.php");
    } else if (section === "cat") {
      tar.setAttribute("action", "/api/v1/category/upload-category.php");
    } else if (section === "adm") {
      tar.setAttribute("action", "/api/v1/admin/minister.php");
    }
  } else {
    errorSubMsg(
      "An unknown error occurred during load please try again!",
      1000,
      "add",
      "#1b1b1b"
    );
    errorSubMsg(
      "An unknown error occurred during load please try again!",
      3000,
      "remove",
      "#1b1b1b"
    );

    var section = localStorage.getItem("section");
    var tar = document.getElementById("uploadNow");

    if (section === "wal") {
      tar.setAttribute("action", "/api/v1/wallpaper/upload.php");
    } else if (section === "gal") {
      tar.setAttribute("action", "/api/v1/gallery/upload.php");
    } else if (section === "str") {
      tar.setAttribute("action", "/api/v1/products/upload-product.php");
    } else if (section === "blg") {
      tar.setAttribute("action", "/api/v1/post/upload.php");
    } else if (section === "cat") {
      tar.setAttribute("action", "/api/v1/category/upload-category.php");
    } else if (section === "adm") {
      tar.setAttribute("action", "/api/v1/admin/minister.php");
    }
  }

  if (dashboard.section !== "usr" && dashboard.section !== "pur") {
    var markup = '<button id="upPost">Upload</button>';

    document.querySelector(
      ".dashboard__login--dashboard--main--tags--actions"
    ).innerHTML = "";

    document
      .querySelector(".dashboard__login--dashboard--main--tags--actions")
      .insertAdjacentHTML("beforeend", markup);
  }

  if (dashboard.section === "adm") {
    var markup = '<button id="upPost">Minister</button>';

    document.querySelector(
      ".dashboard__login--dashboard--main--tags--actions"
    ).innerHTML = "";

    document
      .querySelector(".dashboard__login--dashboard--main--tags--actions")
      .insertAdjacentHTML("beforeend", markup);
  }

  if (dashboard.section === "not") {
    var markup = '<button id="upPost">Send</button>';

    document.querySelector(
      ".dashboard__login--dashboard--main--tags--actions"
    ).innerHTML = "";

    document
      .querySelector(".dashboard__login--dashboard--main--tags--actions")
      .insertAdjacentHTML("beforeend", markup);
  }

  var markup2 = '<button id="opnMenu">Menu</button>';
  if (window.matchMedia("(max-width: 1000px)").matches) {
    document
      .querySelector(".dashboard__login--dashboard--main--tags--actions")
      .insertAdjacentHTML("afterbegin", markup2);
  }
}

async function restartDashboard() {
  var dashboard = new Dashboard();
  dashboard.sectionize();

  var statData = await dashboard.getStats();
  if (statData) {
    var section = localStorage.getItem("section");

    if (section === "adm") {
      if (!statData.access) {
        localStorage.getItem("section", "wal");
        restartDashboard();

        return;
      }
    }

    document.querySelector("#confirmDel").innerHTML = "";
    document.querySelector("#uploadNow").innerHTML = "";
    document.querySelector("#infoMain").innerHTML = "";
    document.querySelector(".appreciation__content").innerHTML = "";
    dashboard.postNum = statData.index;
    dashboard.renderData();
    counter();
    renderPost(statData.data, dashboard);

    var tar = document.getElementById("uploadNow");

    if (section === "wal") {
      tar.setAttribute("action", "/api/v1/wallpaper/upload.php");
    } else if (section === "gal") {
      tar.setAttribute("action", "/api/v1/gallery/upload.php");
    } else if (section === "str") {
      tar.setAttribute("action", "/api/v1/products/upload-product.php");
    } else if (section === "blg") {
      tar.setAttribute("action", "/api/v1/post/upload.php");
    } else if (section === "cat") {
      tar.setAttribute("action", "/api/v1/category/upload-category.php");
    } else if (section === "adm") {
      tar.setAttribute("action", "/api/v1/admin/minister.php");
    } else if (section === "not") {
      tar.setAttribute("action", "/api/v1/notifications/send.php");
    }

    if (dashboard.section !== "usr" && dashboard.section !== "pur") {
      var markup = '<button id="upPost">Upload</button>';
      var markup2 = '<button id="opnMenu">Menu</button>';

      document.querySelector(
        ".dashboard__login--dashboard--main--tags--actions"
      ).innerHTML = "";

      document
        .querySelector(".dashboard__login--dashboard--main--tags--actions")
        .insertAdjacentHTML("beforeend", markup);

      if (window.matchMedia("(max-width: 1000px)").matches) {
        document
          .querySelector(".dashboard__login--dashboard--main--tags--actions")
          .insertAdjacentHTML("afterbegin", markup2);
      }

      if (dashboard.section === "adm") {
        var markup = '<button id="upPost">Minister</button>';

        document.querySelector(
          ".dashboard__login--dashboard--main--tags--actions"
        ).innerHTML = "";

        var markup2 = '<button id="opnMenu">Menu</button>';

        if (window.matchMedia("(max-width: 1000px)").matches) {
          document
            .querySelector(".dashboard__login--dashboard--main--tags--actions")
            .insertAdjacentHTML("afterbegin", markup2);
        }

        document
          .querySelector(".dashboard__login--dashboard--main--tags--actions")
          .insertAdjacentHTML("beforeend", markup);
      }

      if (dashboard.section === "not") {
        var markup = '<button id="upPost">Send</button>';

        document.querySelector(
          ".dashboard__login--dashboard--main--tags--actions"
        ).innerHTML = "";

        var markup2 = '<button id="opnMenu">Menu</button>';

        if (window.matchMedia("(max-width: 1000px)").matches) {
          document
            .querySelector(".dashboard__login--dashboard--main--tags--actions")
            .insertAdjacentHTML("afterbegin", markup2);
        }

        document
          .querySelector(".dashboard__login--dashboard--main--tags--actions")
          .insertAdjacentHTML("beforeend", markup);
      }
    } else {
      document.querySelector(
        ".dashboard__login--dashboard--main--tags--actions"
      ).innerHTML = "";
      var markup2 = '<button id="opnMenu">Menu</button>';

      if (window.matchMedia("(max-width: 1000px)").matches) {
        document
          .querySelector(".dashboard__login--dashboard--main--tags--actions")
          .insertAdjacentHTML("afterbegin", markup2);
      }
    }

    return true;
  } else {
    errorSubMsg(
      "An unknown error occurred during load please try again!",
      300,
      "add",
      "#1b1b1b"
    );
    errorSubMsg(
      "An unknown error occurred during load please try again!",
      3000,
      "remove",
      "#1b1b1b"
    );
    var section = localStorage.getItem("section");
    var tar = document.getElementById("uploadNow");

    if (section === "wal") {
      tar.setAttribute("action", "/api/v1/wallpaper/upload.php");
    } else if (section === "gal") {
      tar.setAttribute("action", "/api/v1/gallery/upload.php");
    } else if (section === "str") {
      tar.setAttribute("action", "/api/v1/products/upload-product.php");
    } else if (section === "blg") {
      tar.setAttribute("action", "/api/v1/post/upload.php");
    } else if (section === "cat") {
      tar.setAttribute("action", "/api/v1/category/upload-category.php");
    } else if (section === "adm") {
      tar.setAttribute("action", "/api/v1/admin/minister.php");
    } else if (section === "not") {
      tar.setAttribute("action", "/api/v1/notifications/send.php");
    }

    if (dashboard.section !== "usr" && dashboard.section !== "pur") {
      var markup = '<button id="upPost">Upload</button>';

      document.querySelector(
        ".dashboard__login--dashboard--main--tags--actions"
      ).innerHTML = "";

      document
        .querySelector(".dashboard__login--dashboard--main--tags--actions")
        .insertAdjacentHTML("beforeend", markup);
    } else {
      document.querySelector(
        ".dashboard__login--dashboard--main--tags--actions"
      ).innerHTML = "";
    }

    return false;
  }
}

// AUTHENTIFICATION STUFFS
function login() {
  var username = document.querySelector("#username").value.trim();
  var password = document.querySelector("#password").value.trim();

  var data = {
    username,
    password,
  };

  fetch("/api/v1/admin/auth.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (data.status) {
        var tkn = data.token;
        var lcd = {
          token: tkn,
          name: "admin",
        };
        localStorage.setItem("admin", JSON.stringify(lcd));
        init();
      } else {
        app.deny();
      }
    });
}

async function logOut() {
  var data = JSON.parse(localStorage.getItem("admin"));

  if (data) {
    fetch("/api/v1/admin/exit.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: data.token }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.status) {
          localStorage.removeItem("admin");
          init();
          return true;
        }
      })
      .catch(function (err) {
        errorSubMsg("Failed to logout!", 300, "add", "#1b1b1b");
        errorSubMsg("Failed to logout!", 5000, "remove", "#1b1b1b");
      });
  }
}

// DASHBOARD VIEWS STUFFS
function renderPost(data, dashboard) {
  var section = localStorage.getItem("section");

  if (section) {
    if (section === "wal") {
      if (data) {
        data.forEach(function (post) {
          if (post.wallpaper_name.length >= 22) {
            post.wallpaper_name = `${post.wallpaper_name.slice(0, 22)}...`;
          }

          if (window.matchMedia("(max-width: 420px)").matches) {
            if (post.wallpaper_name.length >= 12) {
              post.wallpaper_name = `${post.wallpaper_name.slice(0, 12)}...`;
            }
          }

          dashboard.id = post.paper_id;
          dashboard.image = post.thumbnail;
          dashboard.alt_name = post.alt_name;
          dashboard.name = post.wallpaper_name;
          dashboard.likes = post.likes;
          dashboard.downloads = post.downloads;

          dashboard.renderPosts();
        });
      }
    }
    if (section === "gal") {
      if (data) {
        data.forEach(function (post) {
          if (post.title.length >= 22) {
            post.title = `${post.title.slice(0, 22)}...`;
          }

          if (window.matchMedia("(max-width: 420px)").matches) {
            if (post.title.length >= 12) {
              post.title = `${post.title.slice(0, 12)}...`;
            }
          }

          dashboard.alt_name = post.alt_name;
          dashboard.comments = post.comments;
          dashboard.id = post.image_id;
          dashboard.image = post.image;
          dashboard.likes = post.likes;
          dashboard.name = post.title;

          dashboard.renderPosts();
        });
      }
    }
    if (section === "str") {
      if (data) {
        data.forEach(function (post) {
          if (post.product_desc.length >= 22) {
            post.product_desc = `${post.product_desc.slice(0, 22)}...`;
          }

          if (window.matchMedia("(max-width: 420px)").matches) {
            if (post.product_desc.length >= 12) {
              post.product_desc = `${post.product_desc.slice(0, 12)}...`;
            }
          }

          dashboard.alt_name = post.alt_name;
          dashboard.id = post.product_id;
          dashboard.image = post.image;
          dashboard.price = numberWithCommas(post.price);
          dashboard.name = post.product_desc;

          dashboard.renderPosts();
        });
      }
    }
    if (section === "blg") {
      if (data) {
        data.forEach(function (post) {
          if (post.post_name.length >= 22) {
            post.post_name = `${post.post_name.slice(0, 22)}...`;
          }

          if (window.matchMedia("(max-width: 420px)").matches) {
            if (post.post_name.length >= 12) {
              post.post_name = `${post.post_name.slice(0, 12)}...`;
            }
          }

          dashboard.alt_name = post.alt_name;
          dashboard.id = post.post_id;
          dashboard.image = post.image;
          dashboard.comments = post.comments;
          dashboard.likes = post.likes;
          dashboard.views = post.views;
          dashboard.name = post.post_name;

          dashboard.renderPosts();
        });
      }
    }
    if (section === "cat") {
      if (data) {
        data.forEach(function (post) {
          if (post.name.length >= 22) {
            post.name = `${post.name.slice(0, 22)}...`;
          }

          if (window.matchMedia("(max-width: 420px)").matches) {
            if (post.name.length >= 22) {
              post.name = `${post.name.slice(0, 22)}...`;
            }
          }

          dashboard.id = post.id;
          dashboard.name = post.name;

          dashboard.renderPosts();
        });
      }
    }
    if (section === "usr") {
      if (data) {
        data.forEach(function (post) {
          if (post.username.length >= 22) {
            post.username = `${post.username.slice(0, 22)}...`;
          }

          if (window.matchMedia("(max-width: 420px)").matches) {
            if (post.username.length >= 12) {
              post.username = `${post.username.slice(0, 12)}...`;
            }
          }

          dashboard.id = post.user_id;
          dashboard.comments = post.comments;
          dashboard.likes = post.likes;
          dashboard.views = post.views;
          dashboard.downloads = post.downloads;
          dashboard.name = post.username;

          dashboard.renderPosts();
        });
      }
    }
    if (section === "adm") {
      if (data) {
        data.forEach(function (post) {
          if (post.username.length >= 22) {
            post.username = `${post.username.slice(0, 22)}...`;
          }

          if (window.matchMedia("(max-width: 420px)").matches) {
            if (post.username.length >= 12) {
              post.username = `${post.username.slice(0, 12)}...`;
            }
          }

          dashboard.id = post.token;
          dashboard.views = +post.status;
          dashboard.name = post.username;

          dashboard.renderPosts();
        });
      }
    }
    if (section === "pur") {
      if (data) {
        data.forEach(function (post) {
          var username = `${post.first_name} ${post.last_name}`;

          if (username.length >= 22) {
            username = `${username.slice(0, 22)}...`;
          }

          if (window.matchMedia("(max-width: 420px)").matches) {
            if (username.length >= 12) {
              username = `${username.slice(0, 12)}...`;
            }
          }

          dashboard.id = post.purchase_id;
          dashboard.iId = post.user_id;
          dashboard.name = username;
          dashboard.views = numberWithCommas(post.amount_paid);
          dashboard.likes = post.status;
          dashboard.comment = post.reference;

          dashboard.renderPosts();
        });
      }
    }
  }
}

async function editPost(dashboard) {
  var section = localStorage.getItem("section");

  if (section) {
    if (section === "wal") {
      var data = await dashboard.getSinglePost();
      dashboard.name = data.data.wallpaper_name;
      dashboard.alt_name = data.data.alt_name;
      dashboard.thumbnail = data.data.thumbnail;
      dashboard.body = data.data.body;

      dashboard.appreciate();
    }

    if (section === "gal") {
      var data = await dashboard.getSinglePost();

      dashboard.date = data.data.date;
      dashboard.name = data.data.name;
      dashboard.alt_name = data.data.alt_name;
      dashboard.date = data.data.date;
      dashboard.image = data.data.image;
      dashboard.body = data.data.body;

      dashboard.date = formatDate(dashboard.date);
      if (dashboard.appreciate()) {
        if (data.data.comments.length > 0) {
          data.data.comments.forEach(function (comment) {
            dashboard.id = comment.id;
            dashboard.cid = comment.comment_id;
            dashboard.commenter = comment.commenter;
            dashboard.comment = comment.description;
            dashboard.date = comment.date;

            dashboard.date = formatDate(dashboard.date);

            dashboard.renderComments();
          });
        } else {
          var markup = `
            <p style="font-size: 1.5rem;text-align: center;color: #b5b5b5;font-family: sans-serif;padding: 2rem;margin-top: 2rem;"><em>There are no comments on this post yet!</em></p>
          `;

          var container = document.getElementById("gall-cmt");

          if (container) {
            container.insertAdjacentHTML("beforeend", markup);
          }
        }
      }
    }

    if (section === "str") {
      var data = await dashboard.getSinglePost();

      dashboard.body = data.data.product_desc;
      dashboard.alt_name = data.data.alt_name;
      dashboard.image = data.data.image;
      dashboard.category = data.data.category_name;
      dashboard.cid = data.data.category_id;
      dashboard.price = numberWithCommas(data.data.price);

      dashboard.appreciate();
    }

    if (section === "blg") {
      var data = await dashboard.getSinglePost();

      dashboard.date = data.data.date;
      dashboard.name = data.data.title;
      dashboard.tags = data.data.tags;
      dashboard.alt_name = data.data.alt_name;
      dashboard.date = data.data.date;
      dashboard.image = data.data.image;
      dashboard.body = data.data.body;

      dashboard.date = formatDate(dashboard.date);
      if (dashboard.appreciate()) {
        if (data.data.comments.length > 0) {
          data.data.comments.forEach(function (comment) {
            dashboard.id = comment.id;
            dashboard.cid = comment.comment_id;
            dashboard.commenter = comment.commenter;
            dashboard.comment = comment.description;
            dashboard.date = comment.date;

            dashboard.date = formatDate(dashboard.date);

            dashboard.renderComments();
          });
        } else {
          var markup = `
            <p style="font-size: 1.5rem;text-align: center;color: #b5b5b5;font-family: sans-serif;padding: 2rem;margin-top: 2rem;"><em>There are no comments on this post yet!</em></p>
          `;

          var container = document.getElementById("gall-cmt");

          if (container) {
            container.insertAdjacentHTML("beforeend", markup);
          }
        }
      }
    }

    if (section === "cat") {
      var data = await dashboard.getSinglePost();

      dashboard.name = data.category;
      dashboard.postNum = data.data.length;

      dashboard.renderCatEdit();
    }

    if (section === "adm") {
      var data = await dashboard.getSinglePost();

      dashboard.name = data.data.username;

      dashboard.renderCatEdit();
    }

    if (section === "pur") {
      var data = await dashboard.getSinglePost();

      dashboard.body = data.data.message;
      dashboard.alt_name = data.data.email;
      dashboard.name = `${data.data.first_name} ${data.data.last_name}`;
      dashboard.date = data.data.mobile_number;
      dashboard.likes = data.data.status;
      dashboard.comment = data.data.reference;
      dashboard.price = numberWithCommas(data.data.amount_paid * 1);

      dashboard.appreciate();
    }
  }
}

async function minister(dashboard) {
  var data = await dashboard.minister();

  console.log(data);

  if (data) {
    errorSubMsg(data.message, 300, "add", "#1b1b1b");
    errorSubMsg(data.message, 5000, "remove", "#1b1b1b");

    if (data.status) {
      document.querySelector(".cta--dashboard").classList.remove("ready");

      setTimeout(function () {
        restartDashboard();
      }, 5100);
    }
  }
}

async function deleteMinister(dashboard) {
  var data = await dashboard.deleteMinister();

  console.log(data);

  if (data) {
    errorSubMsg(data.message, 300, "add", "#1b1b1b");
    errorSubMsg(data.message, 5000, "remove", "#1b1b1b");

    if (data.status) {
      document.querySelector(".cta--dashboard").classList.remove("ready");

      setTimeout(function () {
        document.getElementById("confirmDelDel").classList.remove("confirm");
        restartDashboard();
      }, 2000);
    }
  }
}

async function lockMinister(dashboard) {
  if (dashboard.id) {
    fetch("/api/v1/admin/exit.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: dashboard.id }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.status) {
          errorSubMsg("Admin lock successful!", 300, "add", "#1b1b1b");
          errorSubMsg("Admin lock successful!", 5000, "remove", "#1b1b1b");

          setTimeout(function () {
            document
              .getElementById("confirmDelDel")
              .classList.remove("confirm");
            restartDashboard();
          }, 2000);
          return true;
        } else {
          errorSubMsg("Admin lock unsuccessful!", 300, "add", "#1b1b1b");
          errorSubMsg("Admin lock unsuccessful!", 5000, "remove", "#1b1b1b");
        }
      })
      .catch(function (err) {
        errorSubMsg("Failed to lock minister!", 300, "add", "#1b1b1b");
        errorSubMsg("Failed to lock minister!", 5000, "remove", "#1b1b1b");
      });
  }
}

async function refreshMinister(dashboard) {
  fetch("/api/v1/admin/verify.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      token: dashboard.id,
    }),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (data.status) {
        errorSubMsg(
          "Admin have been successfully refreshed!",
          300,
          "add",
          "#1b1b1b"
        );
        errorSubMsg(
          "Admin have been successfully refreshed!",
          5000,
          "remove",
          "#1b1b1b"
        );

        setTimeout(function () {
          document.getElementById("confirmDelDel").classList.remove("confirm");
          restartDashboard();
        }, 2000);
      } else {
        errorSubMsg("Admin refreshed unsuccessfully!", 300, "add", "#1b1b1b");
        errorSubMsg(
          "Admin refreshed unsuccessfully!",
          5000,
          "remove",
          "#1b1b1b"
        );
      }

      console.log(data);
    });
}

async function deletePost(dashboard) {
  var section = localStorage.getItem("section");

  if (section) {
    if (
      section === "wal" ||
      section === "gal" ||
      section === "str" ||
      section === "blg" ||
      section === "cat" ||
      section === "pur"
    ) {
      var data = await dashboard.deletePost();
      if (data.status) {
        errorSubMsg(
          "Post delete successfully! Application will reload in a while.",
          300,
          "add",
          "#1b1b1b"
        );
        errorSubMsg(
          "Post delete successfully! Application will reload in a while.",
          3000,
          "remove",
          "#1b1b1b"
        );

        setTimeout(() => {
          init();
        }, 3300);
      }
    }
  }
}

async function deleteComment(dashboard) {
  var section = localStorage.getItem("section");

  if (section) {
    if (section === "gal" || section === "blg") {
      var data = await dashboard.deleteComment();
      console.log(data);

      if (data.status) {
        errorSubMsg(
          "Comment delete successfully! Post will reload in a while.",
          300,
          "add",
          "#1b1b1b"
        );
        errorSubMsg(
          "Comment delete successfully! Post will reload in a while.",
          3000,
          "remove",
          "#1b1b1b"
        );

        setTimeout(() => {
          dashboard.id = dashboard.iId;
          editPost(dashboard);
        }, 2200);
      }
    }
  }
}

async function imageEdit(dashboard) {
  var section = localStorage.getItem("section");

  if (section) {
    if (section === "wal") {
      var data = await dashboard.getSinglePost();
      dashboard.renderImageEdit();
      var count = 4;

      for (var i = 0; i < count; i++) {
        if (i === 0) {
          dashboard.image = "uploads/wallpaper/wallpaper" + data.data.thumbnail;
          dashboard.alt_name = data.data.alt_name + " Thumbnail";
          dashboard.type = "thb";
          dashboard.name = "wall-thumbfile";
          dashboard.iId = Math.floor(Math.random() * 10000);
          dashboard.tumID = dashboard.iId;
          dashboard.renderImageToEdit();
        }

        if (i === 1) {
          dashboard.image = "uploads/wallpaper/" + data.data.desktop;
          dashboard.alt_name = data.data.alt_name + " Desktop";
          dashboard.type = "dsk";
          dashboard.name = "wall-deskfile";
          dashboard.iId = Math.floor(Math.random() * 10000);
          dashboard.desID = dashboard.iId;
          dashboard.renderImageToEdit();
        }

        if (i === 2) {
          dashboard.image = "uploads/wallpaper/" + data.data.tablet;
          dashboard.alt_name = data.data.alt_name + " Tablet";
          dashboard.type = "tab";
          dashboard.name = "wall-tabfile";
          dashboard.iId = Math.floor(Math.random() * 10000);
          dashboard.tabID = dashboard.iId;
          dashboard.renderImageToEdit();
        }

        if (i === 3) {
          dashboard.image = "uploads/wallpaper/" + data.data.mobile;
          dashboard.alt_name = data.data.alt_name + " Mobile";
          dashboard.type = "mob";
          dashboard.name = "wall-mobfile";
          dashboard.iId = Math.floor(Math.random() * 10000);
          dashboard.mobID = dashboard.iId;
          dashboard.renderImageToEdit();
        }
      }
    }

    if (section === "gal") {
      var data = await dashboard.getSinglePost();
      dashboard.renderImageEdit();

      dashboard.image = "uploads/gallery/gallery" + data.data.image;
      dashboard.alt_name = data.data.alt_name;
      dashboard.type = "img";
      dashboard.name = "gall-file";
      dashboard.iId = Math.floor(Math.random() * 10000);
      dashboard.tumID = dashboard.iId;
      dashboard.renderImageToEdit();
    }

    if (section === "str") {
      var data = await dashboard.getSinglePost();
      dashboard.renderImageEdit();

      dashboard.image = "uploads/store/" + data.data.image;
      dashboard.alt_name = data.data.alt_name;
      dashboard.type = "img";
      dashboard.name = "productImg";
      dashboard.iId = Math.floor(Math.random() * 10000);
      dashboard.tumID = dashboard.iId;
      dashboard.renderImageToEdit();
    }

    if (section === "blg") {
      var data = await dashboard.getSinglePost();
      dashboard.renderImageEdit();

      dashboard.image = "uploads/blog/blog" + data.data.image;
      dashboard.alt_name = data.data.alt_name;
      dashboard.type = "img";
      dashboard.name = "imgPost";
      dashboard.iId = Math.floor(Math.random() * 10000);
      dashboard.tumID = dashboard.iId;
      dashboard.renderImageToEdit();
    }
  }
}

function swapImage(dashboard) {
  document
    .getElementById(`${dashboard.tumID}`)
    .addEventListener("change", function () {
      document.getElementsByClassName(`${dashboard.tumID}`)[0].style.display =
        "block";
    });

  if (localStorage.getItem("section") === "wall") {
    document
      .getElementById(`${dashboard.desID}`)
      .addEventListener("change", function () {
        document.getElementsByClassName(`${dashboard.desID}`)[0].style.display =
          "block";
      });
    document
      .getElementById(`${dashboard.tabID}`)
      .addEventListener("change", function () {
        document.getElementsByClassName(`${dashboard.tabID}`)[0].style.display =
          "block";
      });
    document
      .getElementById(`${dashboard.mobID}`)
      .addEventListener("change", function () {
        document.getElementsByClassName(`${dashboard.mobID}`)[0].style.display =
          "block";
      });
  }
}

function prepareEdit(dashboard) {
  var section = localStorage.getItem("section");

  if (section) {
    if (section === "wal") {
      var title = document.getElementById("d_imgname").textContent;
      var altName = document.getElementById("d_imgnameAlt").textContent;
      var body = document.getElementById("wallpaerAppre").textContent;

      if (title.length > 4 && altName.length > 4 && body.length > 4) {
        dashboard.name = title;
        dashboard.alt_name = altName;
        dashboard.body = body;

        if (dashboard.finalize()) {
          return true;
        }
      }
    }

    if (section === "gal") {
      var title = document.getElementById("d_imgname").textContent;
      var altName = document.getElementById("d_imgnameAlt").textContent;
      var body = document.getElementById("wallpaerAppre").textContent;

      if (title.length > 4 && altName.length > 4 && body.length > 4) {
        dashboard.name = title;
        dashboard.alt_name = altName;
        dashboard.body = body;

        if (dashboard.finalize()) {
          return true;
        }
      }
    }

    if (section === "str") {
      var title = document.getElementById("d_imgname").textContent;
      var altName = document.getElementById("d_imgnameAlt").textContent;
      var body = document.getElementById("wallpaerAppre").textContent;
      var category = document.getElementById("categories").value;

      if (altName.length > 4 && body.length > 4) {
        dashboard.name = title;
        dashboard.alt_name = altName;
        dashboard.body = body;
        dashboard.category = category;
        console.log("hhhhkkkk");

        if (dashboard.finalize()) {
          return true;
        }
      }
    }

    if (section === "blg") {
      var title = document.getElementById("d_imgname").textContent;
      var altName = document.getElementById("d_imgnameAlt").textContent;
      var body = document.getElementById("wallpaerAppre").textContent;
      var tags = document.getElementById("d_imgnameTag").textContent;

      if (title.length > 4 && altName.length > 4 && body.length > 4) {
        dashboard.name = title;
        dashboard.alt_name = altName;
        dashboard.body = body;
        dashboard.tags = tags;

        if (dashboard.finalize()) {
          return true;
        }
      }
    }
  }

  return false;
}

async function sendMessage(dashboard) {
  var data = await dashboard.sendMessage();

  console.log(data);

  if (data) {
    errorSubMsg(data.message, 300, "add", "#1b1b1b");
    errorSubMsg(data.message, 10000, "remove", "#1b1b1b");

    if (data.status) {
      document.querySelector(".cta--dashboard").classList.remove("ready");
    }
  }
}

// EVENTS
function events() {
  document.querySelector("body").addEventListener("click", function (event) {
    if (event.target.matches("#login")) {
      event.preventDefault();
      login();
    }

    if (event.target.matches("#tryagain")) {
      event.preventDefault();

      app.lock();
    }
  });

  document.querySelector("body").addEventListener("keypress", function (event) {
    if (event.target.matches("#adminName, #adminName *")) {
      var name = document.querySelector("#adminName").innerHTML;
      var data = JSON.parse(localStorage.getItem("admin"));

      data.name = name;

      localStorage.setItem("admin", JSON.stringify(data));
    }

    if (event.which == 13 || event.keyCode == 13) {
      var name = document.querySelector("#adminName").innerHTML;
      var data = JSON.parse(localStorage.getItem("admin"));

      data.name = name;

      localStorage.setItem("admin", JSON.stringify(data));
      document.querySelector("#adminName").blur();
    }
  });

  window.addEventListener("load", function () {
    var url = new URL(window.location.href);
    var params = new URLSearchParams(url.search);
    var code = params.get("upload");
    var code2 = params.get("update");

    if (code) {
      if (code === "error") {
        errorSubMsg(
          "An unknown error occurred during upload!",
          2000,
          "add",
          "#1b1b1b"
        );
        errorSubMsg(
          "An unknown error occurred during upload!",
          7000,
          "remove",
          "#1b1b1b"
        );
      }
      if (code === "success") {
        errorSubMsg("Upload success!", 2000, "add", "#1b1b1b");
        errorSubMsg("Upload success!", 7000, "remove", "#1b1b1b");
      }
    }

    if (code2) {
      if (code2 === "error") {
        errorSubMsg(
          "An unknown error occurred during update!",
          2000,
          "add",
          "#1b1b1b"
        );
        errorSubMsg(
          "An unknown error occurred during update!",
          7000,
          "remove",
          "#1b1b1b"
        );
      }
      if (code2 === "success") {
        errorSubMsg("Update success!", 2000, "add", "#1b1b1b");
        errorSubMsg("Update success!", 7000, "remove", "#1b1b1b");
      }
    }
  });
}

function dashboardEvents(dashboard) {
  var tagName = document.querySelector("#adminName");

  if (tagName) {
    tagName.addEventListener("blur", function (event) {
      var name = document.querySelector("#adminName").innerHTML;
      var data = JSON.parse(localStorage.getItem("admin"));

      data.name = name;

      localStorage.setItem("admin", JSON.stringify(data));
    });
  }

  document
    .querySelector("body")
    .addEventListener("click", async function (event) {
      if (event.target.matches("#upPost")) {
        dashboard.renderForm();
        document.querySelector(".cta--dashboard").classList.add("ready");
      }

      if (event.target.matches(".imgToCH, .imgToCH *")) {
        swapImage(dashboard);
      }

      if (event.target.id === "Thanks") {
        var con = document.querySelector("#confirmDel");
        if (con) {
          if (con.matches(".confirm")) {
            con.classList.remove("confirm");
          }
        }

        document.querySelector(".appreciation").style.display = "none";
      }

      if (event.target.matches(".editPost, .editPost *")) {
        dashboard.id = event.target.closest("figure").getAttribute("data-post");
        console.log(dashboard.id);
        editPost(dashboard);

        if (dashboard.section === "cat") {
          document
            .querySelector("#confirmDelDel")
            .setAttribute("data-post", dashboard.id);
          document.getElementById("confirmDelDel").classList.add("confirm");
          return false;
        }

        if (dashboard.section === "adm") {
          document
            .querySelector("#confirmDelDel")
            .setAttribute("data-post", dashboard.id);
          document.getElementById("confirmDelDel").classList.add("confirm");
          return false;
        }

        document
          .querySelector(".appreciation")
          .setAttribute("data-post", dashboard.id);
        document.querySelector(".appreciation").style.display = "block";
      }

      if (event.target.matches("#canCatEd, #canCatEd *")) {
        document.getElementById("confirmDelDel").classList.remove("confirm");
      }

      if (event.target.matches("#upCat, #upCat *")) {
        dashboard.name = document.getElementById("catNamEd").textContent;
        dashboard.id = document
          .querySelector("#confirmDelDel")
          .getAttribute("data-post", dashboard.id);

        dashboard.finalizeCatEdit();
        document.querySelector("#updateCatNN").click();
      }

      if (event.target.matches(".dePo, .dePo *")) {
        dashboard.id = event.target
          .closest(".appreciation")
          .getAttribute("data-post");
        document
          .querySelector("#confirmDel")
          .setAttribute("data-post", dashboard.id);
        dashboard.renderConfirmDelete();
        document.querySelector("#confirmDel").classList.add("confirm");
      }

      if (event.target.matches("#delCatPod, #delCatPod *")) {
        dashboard.id = event.target
          .closest(".confirmation")
          .getAttribute("data-post");
        document
          .querySelector("#confirmDel")
          .setAttribute("data-post", dashboard.id);
        dashboard.renderConfirmDeleteCat();
        document.querySelector("#confirmDel").classList.add("confirm");
      }

      if (event.target.matches("#cancelDelPo, #cancelDelPo *")) {
        document.querySelector("#confirmDel").classList.remove("confirm");
        document.querySelector("#confirmDel").innerHTMl = "";
      }

      if (event.target.matches("#confirmDelPo, #confirmDelPo *")) {
        dashboard.id = event.target
          .closest("#confirmDel")
          .getAttribute("data-post");
        document.querySelector("#confirmDel").classList.remove("confirm");
        deletePost(dashboard);
      }

      if (event.target.matches("#closeModal, #closeModal *")) {
        var con = document.querySelector("#confirmDel");
        if (con) {
          if (con.matches(".confirm")) {
            con.classList.remove("confirm");
          }
        }

        document.querySelector(".appreciation").style.display = "none";
      }

      if (event.target.matches("#swapImg, #swapImg *")) {
        dashboard.id = event.target
          .closest(".appreciation")
          .getAttribute("data-post");

        document
          .querySelector("#confirmDel")
          .setAttribute("data-post", dashboard.id);

        imageEdit(dashboard);
        document.querySelector("#confirmDel").classList.add("confirm");
      }

      if (event.target.matches(".clUpload")) {
        document.querySelector(".cta--dashboard").classList.remove("ready");
      }

      if (event.target.matches(".delCmt")) {
        dashboard.id = event.target.closest("li").getAttribute("data-comment");
        dashboard.iId = event.target
          .closest(".appreciation")
          .getAttribute("data-post");

        deleteComment(dashboard);
      }

      if (event.target.matches("#confirmSwapImg")) {
        // prepareImgEdit(dashboard);
        document.querySelector("#confirmDel").classList.remove("confirm");
      }

      if (event.target.matches("#updateWallP, #updateWallP *")) {
        event.preventDefault();
        dashboard.id = event.target
          .closest(".appreciation")
          .getAttribute("data-post");

        console.log(dashboard.id);

        if (!prepareEdit(dashboard)) {
          event.preventDefault();
          errorSubMsg(
            "Improper Values or wrong input system, try again!",
            1000,
            "add",
            "#1b1b1b"
          );
          errorSubMsg(
            "Improper Values or wrong input system, try again!",
            3000,
            "remove",
            "#1b1b1b"
          );
          return false;
        } else {
          document.querySelector("#SENDAD").click();
        }
      }

      if (event.target.matches("#logOut")) {
        logOut();
      }

      if (window.matchMedia("(max-width: 1000px)").matches) {
        if (
          event.target.matches(".sectionBtn, .sectionBtn *") ||
          event.target.matches("#clMnu, #clMnu *")
        ) {
          var tar = document.querySelector(".dashboard__login--dashboard--nav");

          if (tar) {
            tar.style.left = "-90%";
          }
        }
      }

      if (event.target.matches(".sectionBtn, .sectionBtn *")) {
        var section = event.target.getAttribute("data-section");
        var prevSection = localStorage.getItem("section");
        document.querySelector(".cta--dashboard").classList.remove("ready");
        document.getElementById("confirmDelDel").classList.remove("confirm");

        if (dashboard.changeSection(section)) {
          var str = await restartDashboard();
          if (!str) {
            dashboard.changeSection(prevSection);
          }
        }
      }

      if (event.target.matches("#minAdm, #minAdm *")) {
        event.preventDefault();

        dashboard.name = document.querySelector("#admUsr").value;
        dashboard.password = document.querySelector("#admPwd").value;
        dashboard.status = document.querySelector("#admStat").value;

        minister(dashboard);
      }

      if (event.target.matches("#sendNot, #sendNot *")) {
        event.preventDefault();

        dashboard.name = document.querySelector("#notTit").value;
        dashboard.body = document.querySelector("#notBdy").value;
        dashboard.image = document.querySelector("#notUrl").value;
        dashboard.alt_name = document.querySelector("#notAbt").value;
        dashboard.status = document.querySelector("#notImg").value;

        sendMessage(dashboard);
      }

      if (event.target.matches("#conAdmDel, #conAdmDel *")) {
        event.preventDefault();
        dashboard.id = event.target
          .closest(".confirmation")
          .getAttribute("data-post");

        deleteMinister(dashboard);
      }

      if (event.target.matches("#lokAdm, #lokAdm *")) {
        event.preventDefault();
        dashboard.id = event.target
          .closest(".confirmation")
          .getAttribute("data-post");

        lockMinister(dashboard);
      }

      if (event.target.matches("#rfrAdm, #rfrAdm *")) {
        event.preventDefault();
        dashboard.id = event.target
          .closest(".confirmation")
          .getAttribute("data-post");

        refreshMinister(dashboard);
      }

      if (window.matchMedia("(max-width: 1000px)").matches) {
        if (event.target.matches("#opnMenu, #opnMenu *")) {
          var tar = document.querySelector(".dashboard__login--dashboard--nav");

          if (tar) {
            tar.style.left = "0%";
          }
        }
      }
    });
}

function init() {
  console.log("Application has started!");
  auth();
  events();
}

init();
