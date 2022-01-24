class Dashboard extends App {
  id = this.id;
  cid = this.cid;
  iId = this.iId;
  tumID = this.tumID;
  desID = this.desID;
  tabID = this.tabID;
  mobID = this.mobID;
  type = this.type;
  price = this.price;
  section = this.section;
  category = this.category;
  password = this.password;
  status = this.status;
  sectionName = this.sectionName;
  postNum = this.postNum;
  name = this.name;
  body = this.body;
  image = this.image;
  tags = this.tags;
  alt_name = this.alt_name;
  likes = this.likes;
  date = this.date;
  comments = this.comments;
  commenter = this.commenter;
  comment = this.comment;
  downloads = this.downloads;

  constructor() {
    super();
    this.section = localStorage.getItem("section");
  }

  sectionize() {
    if (!this.section) {
      this.section = "wal";
      localStorage.setItem("section", this.section);

      document.querySelector("#wal").classList.add("active");
    } else {
      var tar = document.querySelector(`#${this.section}`);

      if (tar) {
        tar.classList.add("active");
      } else {
        document.querySelector("#wal").classList.add("active");
      }
    }
  }

  changeSection(section) {
    var btn = document.getElementById(`${section}`);
    var buttons = document.querySelectorAll(".sectionBtn");

    if (btn) {
      buttons.forEach((e) => {
        e.classList.remove("active");
      });

      btn.classList.add("active");
      localStorage.setItem("section", section);
      this.section = section;
      return true;
    } else {
      errorSubMsg("An unknown error occured!", 300, "add", "#1b1b1b");
      errorSubMsg("An unknown error occured!", 5000, "remove", "#1b1b1b");
      return false;
    }
  }

  async getStats() {
    var section = localStorage.getItem("section");
    this.section = section;

    if (section) {
      if (section === "wal") {
        var data;
        this.sectionName = "Wallpapers";

        await fetch("/api/v1/wallpaper/read.php")
          .then(function (res) {
            return res.json();
          })
          .then(function (dat) {
            data = dat;
          });

        return data;
      }

      if (section === "gal") {
        var data;
        this.sectionName = "Gallery";

        await fetch("/api/v1/gallery/read.php")
          .then(function (res) {
            return res.json();
          })
          .then(function (dat) {
            data = dat;
          });

        return data;
      }

      if (section === "str") {
        var data;
        this.sectionName = "Store";

        await fetch("/api/v1/products/read.php")
          .then(function (res) {
            return res.json();
          })
          .then(function (dat) {
            data = dat;
          });

        return data;
      }

      if (section === "blg") {
        var data;
        this.sectionName = "Blog";

        await fetch("/api/v1/post/read.php")
          .then(function (res) {
            return res.json();
          })
          .then(function (dat) {
            data = dat;
          });

        return data;
      }

      if (section === "cat") {
        var data;
        this.sectionName = "Categories";

        await fetch("/api/v1/category/read-category.php")
          .then(function (res) {
            return res.json();
          })
          .then(function (dat) {
            data = dat;

            console.log(data);
          });

        return data;
      }

      if (section === "usr") {
        var data;
        this.sectionName = "Users";

        await fetch("/api/v1/user/read.php")
          .then(function (res) {
            return res.json();
          })
          .then(function (dat) {
            data = dat;
            console.log(data);
          });

        return data;
      }

      if (section === "adm") {
        var data;
        this.sectionName = "Administrators";

        var data = JSON.parse(localStorage.getItem("admin"));

        if (data) {
          await fetch("/api/v1/admin/read.php?token=" + data.token)
            .then(function (res) {
              return res.json();
            })
            .then(function (dat) {
              data = dat;
              console.log(data);
            });

          return data;
        }
      }

      if (section === "pur") {
        var data;
        this.sectionName = "Purchases";

        await fetch("/api/v1/purchases/read.php")
          .then(function (res) {
            return res.json();
          })
          .then(function (dat) {
            data = dat;
            console.log(data);
          });

        return data;
      }

      if (section === "not") {
        var data;
        this.sectionName = "Subscribers";

        await fetch("/api/v1/notifications/read.php")
          .then(function (res) {
            return res.json();
          })
          .then(function (dat) {
            data = dat;
            console.log(data);
          });

        return data;
      }
    }
  }

  async deletePost() {
    var section = localStorage.getItem("section");
    this.section = section;

    if (section) {
      if (section === "wal") {
        var data;

        await fetch("/api/v1/wallpaper/delete.php", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ wallpaper: this.id }),
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (dat) {
            data = dat;
          })
          .catch(function () {
            errorSubMsg(
              "Post failed to delete completely, please contact Prosper Emebo!",
              300,
              "add",
              "#1b1b1b"
            );
            errorSubMsg(
              "Post failed to delete completely, please contact Prosper Emebo!",
              3000,
              "remove",
              "#1b1b1b"
            );
          });

        return data;
      }

      if (section === "gal") {
        var data;

        await fetch("/api/v1/gallery/delete.php", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ gallery: this.id }),
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (dat) {
            data = dat;
          })
          .catch(function () {
            errorSubMsg(
              "Post failed to delete completely, please contact Prosper Emebo!",
              300,
              "add",
              "#1b1b1b"
            );
            errorSubMsg(
              "Post failed to delete completely, please contact Prosper Emebo!",
              3000,
              "remove",
              "#1b1b1b"
            );
          });

        return data;
      }

      if (section === "str") {
        var data;

        await fetch("/api/v1/products/delete.php", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ product: this.id }),
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (dat) {
            data = dat;
          })
          .catch(function () {
            errorSubMsg(
              "Post failed to delete completely, please contact Prosper Emebo!",
              300,
              "add",
              "#1b1b1b"
            );
            errorSubMsg(
              "Post failed to delete completely, please contact Prosper Emebo!",
              3000,
              "remove",
              "#1b1b1b"
            );
          });

        return data;
      }

      if (section === "blg") {
        var data;

        await fetch("/api/v1/post/delete.php", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ post: this.id }),
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (dat) {
            data = dat;
          })
          .catch(function () {
            errorSubMsg(
              "Post failed to delete completely, please contact Prosper Emebo!",
              300,
              "add",
              "#1b1b1b"
            );
            errorSubMsg(
              "Post failed to delete completely, please contact Prosper Emebo!",
              3000,
              "remove",
              "#1b1b1b"
            );
          });

        return data;
      }

      if (section === "cat") {
        var data;

        await fetch("/api/v1/category/delete.php", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ category: this.id }),
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (dat) {
            data = dat;
          })
          .catch(function () {
            errorSubMsg(
              "Post failed to delete completely, please contact Prosper Emebo!",
              300,
              "add",
              "#1b1b1b"
            );
            errorSubMsg(
              "Post failed to delete completely, please contact Prosper Emebo!",
              3000,
              "remove",
              "#1b1b1b"
            );
          });

        return data;
      }

      if (section === "pur") {
        var data;

        await fetch("/api/v1/purchases/delete.php", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ purchase: this.id }),
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (dat) {
            data = dat;
          })
          .catch(function () {
            errorSubMsg(
              "Post failed to delete completely, please contact Prosper Emebo!",
              300,
              "add",
              "#1b1b1b"
            );
            errorSubMsg(
              "Post failed to delete completely, please contact Prosper Emebo!",
              3000,
              "remove",
              "#1b1b1b"
            );
          });

        return data;
      }
    }
  }

  async deleteComment() {
    var section = localStorage.getItem("section");
    this.section = section;

    if (section === "gal" || section === "blg") {
      var data;

      await fetch("/api/v1/gallery/deleteComment.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ comment: this.id }),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (dat) {
          data = dat;
        })
        .catch(function () {
          errorSubMsg(
            "Comment failed to delete completely, please contact Prosper Emebo!",
            300,
            "add",
            "#1b1b1b"
          );
          errorSubMsg(
            "Comment failed to delete completely, please contact Prosper Emebo!",
            3000,
            "remove",
            "#1b1b1b"
          );
        });

      return data;
    }
  }

  async getSinglePost() {
    var section = localStorage.getItem("section");
    this.section = section;

    if (section) {
      if (section === "wal") {
        var data;
        this.sectionName = "Wallpapers";

        await fetch("/api/v1/wallpaper/read-single.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ wallpaper: this.id }),
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (dat) {
            data = dat;
          });

        return data;
      }

      if (section === "gal") {
        var data;
        this.sectionName = "Gallery";

        await fetch("/api/v1/gallery/read-single.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ gallery: this.id }),
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (dat) {
            data = dat;
          });

        return data;
      }

      if (section === "str") {
        var data;
        this.sectionName = "Store";

        await fetch("/api/v1/products/read-single.php?id=" + this.id)
          .then(function (res) {
            return res.json();
          })
          .then(function (dat) {
            data = dat;
          });

        return data;
      }

      if (section === "blg") {
        var data;
        this.sectionName = "Post";

        await fetch("/api/v1/post/read-single.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ post: this.id }),
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (dat) {
            data = dat;
            console.log(dat);
          });

        return data;
      }

      if (section === "cat") {
        var data;
        this.sectionName = "Category";

        await fetch("/api/v1/category/read.php?c=" + this.id)
          .then(function (res) {
            return res.json();
          })
          .then(function (dat) {
            data = dat;
            console.log(dat);
          });

        return data;
      }

      if (section === "adm") {
        var data;
        this.sectionName = "Administrators";
        var aData = JSON.parse(localStorage.getItem("admin"));
        var url =
          "/api/v1/admin/read-single.php?id=" +
          this.id +
          "&token=" +
          aData.token;

        console.log(this.id);

        if (aData) {
          await fetch(url)
            .then(function (res) {
              return res.json();
            })
            .then(function (dat) {
              data = dat;
              console.log(dat);
            });
        }
        return data;
      }

      if (section === "pur") {
        var data;
        this.sectionName = "Purchases";

        await fetch("/api/v1/purchases/read-single.php?id=" + this.id)
          .then(function (res) {
            return res.json();
          })
          .then(function (dat) {
            data = dat;
            console.log(data);
          });

        return data;
      }
    }
  }

  renderData() {
    var markup = `
      <div class="dashboard__login--dashboard--main--body--stats">
        <div class="statss">
          <h1 class="stat-rate" data-target="${this.postNum}">0</h1>
          <p>${this.sectionName}</p>
        </div>
        <div class="recents"></div>
        <aside>
          <h1>${this.sectionName}</h1>
          <div class="stacks" id="postContainer">
            
          </div>
        </aside>
      </div>
    `;

    var container = document.getElementById("infoMain");

    if (container) {
      container.insertAdjacentHTML("beforeend", markup);
    }
  }

  async sendMessage() {
    var url = "https://crossorigin.me/https://www.godgatyou.com/send.php";
    var data;

    var data = {
      title: this.name,
      body: this.body,
      image: this.image,
      url: this.alt_name,
      action: this.status,
    };

    await fetch(url, {
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
      .then(function (dat) {
        data = dat;
      });

    return data;
  }

  async minister() {
    var url = "/api/v1/admin/minister.php";
    var data;

    var data = {
      username: this.name,
      password: this.password,
      status: this.status,
    };

    console.log(data);

    await fetch(url, {
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
      .then(function (dat) {
        data = dat;
      });

    return data;
  }

  async deleteMinister() {
    var aData = JSON.parse(localStorage.getItem("admin"));
    var data;

    if (aData) {
      var url =
        "/api/v1/admin/delete.php?id=" + this.id + "&token=" + aData.token;

      await fetch(url)
        .then(function (res) {
          return res.json();
        })
        .then(function (dat) {
          data = dat;
        });
    }

    return data;
  }

  renderComments() {
    var markup = `
      <li data-comment-id="${this.id}" data-comment="${this.cid}">
        <h3>${this.commenter}</h3>
        <p>${this.comment}</p>
        <small>${this.date}</small>
        <i class="fas delCmt fa-times"></i>
      </li>
    `;

    var container = document.getElementById("gall-cmt");

    if (container) {
      container.insertAdjacentHTML("beforeend", markup);
    }
  }

  renderPosts() {
    var section = localStorage.getItem("section");
    var markup;

    if (section) {
      if (section === "wal") {
        markup = `
          <figure data-post="${this.id}">
            <img src="/assets/uploads/wallpaper/wallpaper${this.image}" alt="${this.alt_name}" />
            <figcaption>
              <h3>${this.name}</h3>
              <div class="stats">
                <div class="stats--sta">
                  <h3>${this.likes}</h3>
                  <small>Likes</small>
                </div>
                <div class="stats--sta">
                  <h3>${this.downloads}</h3>
                  <small>Downloads</small>
                </div>
              </div>
            </figcaption>
            <i class="fas fa-pen editPost"></i>
          </figure>
        `;

        document
          .getElementById("postContainer")
          .insertAdjacentHTML("beforeend", markup);
      }

      if (section === "gal") {
        markup = `
          <figure data-post="${this.id}">
            <img src="/assets/uploads/gallery/gallery${this.image}" alt="${this.alt_name}" />
            <figcaption>
              <h3>${this.name}</h3>
              <div class="stats">
                <div class="stats--sta">
                  <h3>${this.likes}</h3>
                  <small>Likes</small>
                </div>
                <div class="stats--sta">
                  <h3>${this.comments}</h3>
                  <small>Comments</small>
                </div>
              </div>
            </figcaption>
            <i class="fas fa-pen editPost"></i>
          </figure>
        `;

        document
          .getElementById("postContainer")
          .insertAdjacentHTML("beforeend", markup);
      }

      if (section === "str") {
        markup = `
          <figure data-post="${this.id}">
            <img src="/assets/uploads/store/${this.image}" alt="${this.alt_name}" />
            <figcaption>
              <h3>${this.name}</h3>
              <div class="stats">
                <div class="stats--sta">
                <small>Price</small>
                <h3><span>&#8358</span>${this.price}</h3>
                </div>
              </div>
            </figcaption>
            <i class="fas fa-pen editPost"></i>
          </figure>
        `;

        document
          .getElementById("postContainer")
          .insertAdjacentHTML("beforeend", markup);
      }

      if (section === "blg") {
        markup = `
          <figure data-post="${this.id}">
            <img src="/assets/uploads/blog/blog${this.image}" alt="${this.alt_name}" />
            <figcaption>
              <h3>${this.name}</h3>
              <div class="stats">
                <div class="stats--sta">
                  <h3>${this.views}</h3>
                  <small>Views</small>
                </div>
                <div class="stats--sta">
                  <h3>${this.likes}</h3>
                  <small>Likes</small>
                </div>
                <div class="stats--sta">
                  <h3>${this.comments}</h3>
                  <small>Comments</small>
                </div>
              </div>
            </figcaption>
            <i class="fas fa-pen editPost"></i>
          </figure>
        `;

        document
          .getElementById("postContainer")
          .insertAdjacentHTML("beforeend", markup);
      }

      if (section === "cat") {
        var url = "/api/v1/category/read.php?c=" + this.id;

        // await fetch(url)
        //   .then(function (res) {
        //     return res.json();
        //   })
        //   .then(function (dat) {
        //     this.views = dat.data.length;
        //   })
        //   .catch(function (err) {
        //     errorSubMsg(
        //       "Something went wrong fetching number of products of this category!",
        //       300,
        //       "add",
        //       "#1b1b1b"
        //     );
        //     errorSubMsg(
        //       "Something went wrong fetching number of products of this category!",
        //       7000,
        //       "remove",
        //       "#1b1b1b"
        //     );
        //   });

        markup = `
          <figure data-post="${this.id}">
            <img src="/assets/images/ggy_dummy_img.jpg" alt="${this.alt_name}" />
            <figcaption>
              <h3>${this.name}</h3>
              <div class="stats">
                <!--<div class="stats--sta">
                  <h3>${this.views}</h3>
                  <small>Products</small>
                </div>-->
              </div>
            </figcaption>
            <i class="fas fa-pen editPost"></i>
          </figure>
        `;

        document
          .getElementById("postContainer")
          .insertAdjacentHTML("beforeend", markup);
      }

      if (section === "usr") {
        markup = `
          <figure data-post="${this.id}">
            <img src="/assets/images/ggy_dummy_img.jpg" alt="God Gat You Image" />
            <figcaption>
              <h3>${this.name}</h3>
              <div class="stats">
                <div class="stats--sta">
                  <h3>${this.views}</h3>
                  <small>Views</small>
                </div>
                <div class="stats--sta">
                  <h3>${this.likes}</h3>
                  <small>Likes</small>
                </div>
                <div class="stats--sta">
                  <h3>${this.comments}</h3>
                  <small>Comments</small>
                </div>
                <div class="stats--sta">
                  <h3>${this.downloads}</h3>
                  <small>Downloads</small>
                </div>
              </div>
            </figcaption>
          </figure>
        `;

        document
          .getElementById("postContainer")
          .insertAdjacentHTML("beforeend", markup);
      }

      if (section === "adm") {
        if (this.views === 0) {
          this.views = "Logged Out";
        } else if (this.views === 1) {
          this.views = "Logged In";
        }

        markup = `
          <figure data-post="${this.id}">
            <img src="/assets/images/ggy_dummy_img.jpg" alt="img" />
            <figcaption>
              <h3>${this.name}</h3>
              <div class="stats">
                <div class="stats--sta">
                <small>Status</small>
                <h3>${this.views}</h3>
                </div>
              </div>
            </figcaption>
            <i class="fas fa-pen editPost"></i>
          </figure>
        `;

        document
          .getElementById("postContainer")
          .insertAdjacentHTML("beforeend", markup);
      }

      if (section === "pur") {
        if (this.likes === "0") {
          this.likes = "pending";
        } else if (this.likes === "1") {
          this.likes = "complete";
        }

        markup = `
          <figure data-post="${this.id}" data-user="${this.iId}">
            <img src="/assets/images/ggy_dummy_img.jpg" alt="God Gat You Image" />
            <figcaption>
              <h3>${this.name}</h3>
              <div class="stats">
                <div class="stats--sta">
                <small>Amount</small>
                  <h3><span>&#8358</span>${this.views}</h3>
                </div>
                <div class="stats--sta">
                <small>Payment</small>
                  <h3>${this.likes}</h3>
                </div>
              </div>
            </figcaption>
            <i class="fas fa-pen editPost"></i>
          </figure>
        `;

        document
          .getElementById("postContainer")
          .insertAdjacentHTML("beforeend", markup);
      }
    }
  }

  appreciate() {
    var markup = `
      <!-- GALLERY AND POST EDIT -->
          <!-- GALLERY AND POST EDIT -->
          <!-- <div class="appreciation__content">
                  <span class="dePo">Delete Post<i class="fas fa-times"></i></span>
                  <figure class="overview overview__gall" style="position: relative;">
                    <img
                      id="3"
                      src="/assets/uploads/gallery/galleryhappy-childrens-day.5f99dc05709cf0.35923540.jpg"
                      draggable="false"
                      alt="Happy childrens day God Gat You"
                    />
                    <div id="swapImg" class="chImg"><h3>Change this?</h3></div>
                    <figcaption>
                      <h2 id="d_imgname">Thank God for 2020</h2>
                    </figcaption>
                  </figure>
                  <div class="gall_desc">
                    <div class="origin" style="flex: 1.3">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod,
                        dicta! Ipsam iusto porro et? Repellat quisquam itaque recusandae
                        nobis aliquid eligendi, voluptas, odit quibusdam atque doloribus
                        consequuntur quis sapiente totam!
                      </p>
                      <small>28 Oct, 2020</small>
                    </div>
                    <ul id="gall-cmt">
                      <li data-comment-id="42">
                        <h3>Presh Diva</h3>
                        <p>Sweet</p>
                        <small>11 Jan, 2021</small>
                        <i class="fas fa-times"></i>
                      </li>
                    </ul>
                  </div>
                </div> -->
          <!-- GALLERY AND POST EDIT -->
          <!-- GALLERY AND POST EDIT -->
          <!-- WALLPAPER AND STORE EDIT -->
          <!-- WALLPAPER AND STORE EDIT -->
          <!-- <div class="appreciation__content">
                  <span class="dePo">Delete Post<i class="fas fa-times"></i></span>
                  <figure class="overview" style="position: relative">
                    <img
                    id="overview__img"
                    src="/assets/uploads/wallpaper/wallpaperthank-god-for-2020-thumbanail.5fb2bff87212d0.41485748.jpg"
                    draggable="false"
                    alt="Thank God for 2020 God Gat You"
                    />
                    <div id="swapImg" class="chImg"><h3>Change this?</h3></div>
                    <figcaption>
                      <h2 id="d_imgname">Thank God for 2020</h2>
                    </figcaption>
                  </figure>
                  <div class="desc">
                    <p class="desc_p" id="wallpaerAppre">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod,
                      dicta! Ipsam iusto porro et? Repellat quisquam itaque recusandae
                      nobis aliquid eligendi, voluptas, odit quibusdam atque doloribus
                      consequuntur quis sapiente totam!
                    </p>
                    <form class="download_form">
                      <button
                      class="download_paper"
                      type="submit"
                      name="downloadSub"
                      style="width: 100%; flex: none"
                      >
                      UPLOAD
                    </button>
                  </form>
                </div>
              </div> -->
          <!-- WALLPAPER AND STORE EDIT -->
          <!-- WALLPAPER AND STORE EDIT -->
    `;

    if (this.section) {
      if (this.section === "wal") {
        markup = `
          <span class="dePo">Delete Post<i class="fas fa-times"></i></span>
            <figure class="overview" style="position: relative">
              <img
              id="overview__img"
              src="/assets/uploads/wallpaper/wallpaper${this.thumbnail}"
              draggable="false"
              alt="${this.alt_name}"
              />
              <div id="swapImg" class="chImg"><h3>Change this?</h3></div>
              <figcaption>
                <h2 id="d_imgname" class="editText" contenteditable="true">${
                  this.name
                }</h2>
              </figcaption>
            </figure>
            <div class="desc">
              <p class="desc_p" id="wallpaerAppre"  style="overflow-x: hidden; text-align: left;padding-left:1rem;"contenteditable="true">${this.body
                .trimStart()
                .trimEnd()}</p>
              <h2 id="d_imgnameAlt" style="font-size: 2rem;font-weight: 100;font-family: 'LatoLight', sans-serif;" contenteditable="true" class="stats editText">${this.alt_name
                .trimStart()
                .trimEnd()}</h2>
              <form class="download_form">
                <button
                class="download_paper"
                id="updateWallP"
                style="width: 100%; flex: none"
                >UPDATE</button>
            </form>
          </div>
        `;

        var container = document.querySelector(".appreciation__content");

        container.innerHTML = "";
        container.insertAdjacentHTML("beforeend", markup);

        return true;
      }

      if (this.section === "gal") {
        markup = `
          <span class="dePo">Delete Post<i class="fas fa-times"></i></span>
          <figure class="overview overview__gall" style="position: relative;">
            <img
              id="3"
              src="/assets/uploads/gallery/gallery${this.image}"
              draggable="false"
              style="height: 80%;"
              alt="${this.alt_name}"
            />
            <div id="swapImg" style="top: 40%;" class="chImg"><h3>Change this?</h3></div>
            <figcaption>
              <h2 id="d_imgname" style="border-bottom: 1px solid #ccc; margin-bottom: 0.5rem;" class="editText" contenteditable="true">${this.name}</h2>
              <h2 id="d_imgnameAlt" style="border-bottom: 1px solid #ccc; margin-top: 0.5rem;" class="editText" contenteditable="true">${this.alt_name}</h2>
            </figcaption>
          </figure>
          <div class="gall_desc" style="margin-left: 1rem;">
            <div class="origin" style="flex: 1.3">
              <p contenteditable="true" id="wallpaerAppre">${this.body}</p>
              <small>${this.date}</small>
            </div>
            <ul id="gall-cmt">
              
            </ul>
            <form class="gall_form" id="post_comment">
                <button style="flex: 1;" class="gall_btn" id="updateWallP" type="submit">
                  UPDATE
                </button>
              </form>
          </div>
        `;

        var container = document.querySelector(".appreciation__content");

        container.innerHTML = "";
        container.insertAdjacentHTML("beforeend", markup);

        return true;
      }

      if (this.section === "str") {
        markup = `
          <span class="dePo">Delete Post<i class="fas fa-times"></i></span>
            <figure class="overview" style="position: relative">
              <img
              id="overview__img"
              style="height: 80%;"
              src="/assets/uploads/store/${this.image}"
              draggable="false"
              alt="${this.alt_name}"
              />
              <div id="swapImg" class="chImg"><h3>Change this?</h3></div>
              <figcaption>
                <h2>&#8358<span id="d_imgname" class="editText" contenteditable="true">${
                  this.price
                }</span></h2>
                <select id="categories" required="" type="text" name="productCategory" style="display: block;width: 90%;padding: 0.8rem 1.5rem;
                text-align:center;margin:1rem auto;-webkit-border-radius: 3px;border-radius: 3px;border: 1px solid #adadad;background: #111;color: #f7f7f7;font-size: 1.5rem;font-family: 'LatoRegular', sans-serif;" placeholder="Product Category">
                  <option value="${this.cid}">${this.category}</option>
                </select>
              </figcaption>
            </figure>
            <div class="desc">
              <p class="desc_p" id="wallpaerAppre"  style="overflow-x: hidden; text-align: left;padding-left:1rem;"contenteditable="true">${this.body
                .trimStart()
                .trimEnd()}</p>
              <h2 id="d_imgnameAlt" style="font-size: 2rem;font-weight: 100;font-family: 'LatoLight', sans-serif;" contenteditable="true" class="stats editText">${this.alt_name
                .trimStart()
                .trimEnd()}</h2>
              <form class="download_form">
                <button
                class="download_paper"
                id="updateWallP"
                style="width: 100%; flex: none"
                >UPDATE</button>
            </form>
          </div>
        `;

        var container = document.querySelector(".appreciation__content");

        container.innerHTML = "";
        container.insertAdjacentHTML("beforeend", markup);

        var en = this.category;
        var cn = this.cid;

        fetch("/api/v1/category/read-category.php")
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            var categories = data.data;

            for (let i = 0; i < categories.length; i++) {
              var e = categories[i];
              var markup = `
                <option value = "${e.id}">${e.name}</option>
              `;

              if (e.id !== cn && e.name !== en) {
                document
                  .querySelector("#categories")
                  .insertAdjacentHTML("beforeend", markup);
              }
            }
          });

        return true;
      }

      if (this.section === "blg") {
        markup = `
          <span class="dePo">Delete Post<i class="fas fa-times"></i></span>
          <figure class="overview overview__gall" style="position: relative;">
            <img
              id="3"
              src="/assets/uploads/blog/blog${this.image}"
              draggable="false"
              style="height: 80%;"
              alt="${this.alt_name}"
            />
            <div id="swapImg" style="top: 40%;" class="chImg"><h3>Change this?</h3></div>
            <figcaption>
              <h2 id="d_imgname" style="margin-bottom: 0.5rem;" class="editText" contenteditable="true">${
                this.name
              }</h2>
              <h2 id="d_imgnameAlt" style="margin-top: 0.5rem;" class="editText" contenteditable="true">${
                this.alt_name
              }</h2>
            </figcaption>
          </figure>
          <div class="gall_desc" style="margin-left: 1rem;">
            <div class="origin" style="flex: 1">
              <p contenteditable="true" id="wallpaerAppre">${this.body}</p>
              <small>${this.date}</small>
            </div>
            <h2 id="d_imgnameTag" style="font-size: 2rem;font-weight: 100; padding: .5rem 1rem; font-family: 'LatoLight', sans-serif;" contenteditable="true" class="stats editText">${this.tags
              .trimStart()
              .trimEnd()}</h2>
            <ul id="gall-cmt">
              
            </ul>
            <form class="gall_form" id="post_comment">
                <button style="flex: 1;" class="gall_btn" id="updateWallP" type="submit">
                  UPDATE
                </button>
              </form>
          </div>
        `;

        var container = document.querySelector(".appreciation__content");

        container.innerHTML = "";
        container.insertAdjacentHTML("beforeend", markup);

        return true;
      }

      if (this.section === "pur") {
        if (this.likes === "0") {
          this.likes = "pending";
        } else if (this.likes === "1") {
          this.likes = "complete";
        }

        markup = `
            <span class="dePo">Delete Purchase<i class="fas fa-times"></i></span>
            <figure class="overview" style="position: relative">
              <img
              id="overview__img"
              style="height: 80%;"
              src="/assets/images/ggy_dummy_img.jpg"
              draggable="false"
              alt="${this.alt_name}"
              />
              <figcaption>
                <h2>&#8358<span id="d_imgname" class="editText" contenteditable="true">${
                  this.price
                }</span></h2>
                <h2 id="d_imgname" class="editText">${this.name}</h2>
              </figcaption>
            </figure>
            <div class="desc">
              <p class="desc_p" id="wallpaerAppre"  style="overflow-x: hidden; text-align: left;padding-left:1rem;">${this.body
                .split(";")
                .join("; </br> </br>")}</p>
              <h2 id="d_imgnameAlt" style="font-size: 2rem;font-weight: 100;font-family: 'LatoLight', sans-serif;" class="stats editText">${this.alt_name
                .trimStart()
                .trimEnd()}</h2>
              <h2 id="d_imgnameAlt" style="font-size: 2rem;font-weight: 100;font-family: 'LatoLight', sans-serif;" class="stats editText">${this.date
                .trimStart()
                .trimEnd()}</h2>
              <h2 id="d_imgnameAlt" style="font-size: 2rem;font-weight: 100;font-family: 'LatoLight', sans-serif;" class="stats editText">${this.comment
                .trimStart()
                .trimEnd()}</h2>
              <h2 id="d_imgnameAlt" style="font-size: 2rem;font-weight: 100;font-family: 'LatoLight', sans-serif;" class="stats editText">Payment: ${this.likes
                .trimStart()
                .trimEnd()}</h2>
            </form>
          </div>
        `;

        var container = document.querySelector(".appreciation__content");

        container.innerHTML = "";
        container.insertAdjacentHTML("beforeend", markup);

        return true;
      }
    }
  }

  renderConfirmDelete() {
    var markup = `
      <div class="confirmation__delete">
        <h1>Are you sure you want to delete this post?</h1>
        <p>This process cannot be reversed!</p>
        <div class="confirmation__delete--delete">
          <button id="confirmDelPo">Delete</button>
          <button id="cancelDelPo">Cancel</button>
        </div>
      </div>
    `;

    var container = document.querySelector("#confirmDel");

    if (container) {
      container.innerHTML = "";
      container.insertAdjacentHTML("beforeend", markup);
    }
  }

  renderConfirmDeleteCat() {
    var markup = `
      <div class="confirmation__delete">
        <h1 style="line-height: 1.3;">Are you sure you want to delete this category and all the products in it?</h1>
        <p>This process cannot be reversed!</p>
        <div class="confirmation__delete--delete">
          <button id="confirmDelPo">Delete</button>
          <button id="cancelDelPo">Cancel</button>
        </div>
      </div>
    `;

    var container = document.querySelector("#confirmDel");

    if (container) {
      container.innerHTML = "";
      container.insertAdjacentHTML("beforeend", markup);
    }
  }

  renderImageEdit() {
    var markup = `
      <form class="confirmation__edit--papers" id="swapImgNow" style="padding-bottom: 2rem;border-bottom: 1px solid #aaa;" action="/api/v1/wallpaper/update.php"method="post" enctype="multipart/form-data">
    

      <button id="SENDAD" style="display: none;"  name="wall-submit" class="cancelDelPoPa">Submit</button>
      </form>
      <button id="confirmSwapImg" name="wall-submit" class="cancelDelPoPa">Proceed</button>
      <button id="cancelDelPo" class="cancelDelPoPa">Cancel</button>
    `;

    if (this.section) {
      if (this.section === "wal") {
        var container = document.querySelector("#confirmDel");

        if (container) {
          container.innerHTML = "";
          container.insertAdjacentHTML("beforeend", markup);
          document
            .getElementById("swapImgNow")
            .setAttribute("action", "/api/v1/wallpaper/update.php");
          document.getElementById("SENDAD").setAttribute("name", "wall-submit");
        }
      }

      if (this.section === "gal") {
        var container = document.querySelector("#confirmDel");

        if (container) {
          container.innerHTML = "";
          container.insertAdjacentHTML("beforeend", markup);
          document
            .getElementById("swapImgNow")
            .setAttribute("action", "/api/v1/gallery/update.php");
          document.getElementById("SENDAD").setAttribute("name", "gall-submit");
        }
      }

      if (this.section === "str") {
        var container = document.querySelector("#confirmDel");

        if (container) {
          container.innerHTML = "";
          container.insertAdjacentHTML("beforeend", markup);
          document
            .getElementById("swapImgNow")
            .setAttribute("action", "/api/v1/products/update.php");
          document
            .getElementById("SENDAD")
            .setAttribute("name", "submitProduct");
        }
      }

      if (this.section === "blg") {
        var container = document.querySelector("#confirmDel");

        if (container) {
          container.innerHTML = "";
          container.insertAdjacentHTML("beforeend", markup);
          document
            .getElementById("swapImgNow")
            .setAttribute("action", "/api/v1/post/update.php");
          document.getElementById("SENDAD").setAttribute("name", "postSubmit");
        }
      }
    }
  }

  renderCatEdit() {
    var markup;

    if (this.section === "cat") {
      markup = `
        <div class="confirmation__edit" id="upCARR">
          <button class="delBB" id="delCatPod">Delete Category</button>
          <div class="body">
            <h1 contenteditable="true" id="catNamEd">${this.name}</h1>
            <p>${this.postNum} Products</p>
            <div class="cta">
              <button id="canCatEd">Cancel</button>
              <button id="upCat">Update</button>
            </div>
          </div>
        </div>
      `;
    }

    if (this.section === "adm") {
      markup = `
        <div class="confirmation__edit" id="upCARR">
          <div class="body">
            <h1 style="margin-bottom: 2rem;" id="catNamEd">${this.name}</h1>
            <div class="cta">
              <button id="canCatEd">Cancel</button>
              <button id="conAdmDel">Delete</button>
              <button id="lokAdm">Lock</button>
              <button id="rfrAdm">Refresh</button>
            </div>
          </div>
        </div>
      `;
    }

    document.getElementById("confirmDelDel").innerHTML = "";
    document
      .getElementById("confirmDelDel")
      .insertAdjacentHTML("beforeend", markup);
  }

  finalizeCatEdit() {
    var markup = `
      <form
        action="/api/v1/category/update.php"
        method="post"
        style="display: none;"
        enctype="multipart/form-data"class="cta--dashboard--body" id="uploadNow">
        <input
          type="text"
          id="wallName"
          name="categoryName"
          placeholder="Wallpaper Name"
          value="${this.name}"
          style="display: none"
        />
        <input
          type="text"
          id="wallAltName"
          name="categoryId"
          value="${this.id}"
          placeholder="Wallpaper Alt Name"
          style="display: none"
        />
        <button id="updateCatNN" name="createCategory">SEND</button>
      </form>
    `;

    var container = document.getElementById("upCARR");

    if (container) {
      container.insertAdjacentHTML("beforeend", markup);
    }
  }

  finalize() {
    var section = localStorage.getItem("section");

    if (section) {
      if (section === "wal") {
        var markup = `
            <input
              type="text"
              id="wallName"
              name="wall-name"
              placeholder="Wallpaper Name"
              value="${this.name}"
              style="display: none"
            />
            <input
              type="text"
              id="wallAltName"
              name="wall-alt"
              value="${this.alt_name}"
              placeholder="Wallpaper Alt Name"
              style="display: none"
            />
          </div>
            <input
              type="text"
              name="wall-id"
              value="${this.id}"
              placeholder="Wallpaper Alt Name"
              style="display: none"
            />
          </div>
          <input
            type="text"
            id="paperBody"
            name="wall-body"
            value="${this.body}"
            placeholder="Download Appreciation"
            style="display: none"
          ></input>
        `;

        var container = document.getElementById("swapImgNow");

        if (container) {
          container.insertAdjacentHTML("afterbegin", markup);
          return true;
        }
      }

      if (section === "gal") {
        var markup = `
            <input
              type="text"
              id="wallName"
              name="gall-filename"
              placeholder="Wallpaper Name"
              value="${this.name}"
              style="display: none"
            />
            <input
              type="text"
              id="wallAltName"
              name="gall-alt"
              value="${this.alt_name}"
              placeholder="Wallpaper Alt Name"
              style="display: none"
            />
          </div>
            <input
              type="text"
              name="gall-id"
              value="${this.id}"
              placeholder="Wallpaper Alt Name"
              style="display: none"
            />
          </div>
          <input
            type="text"
            id="paperBody"
            name="gall-body"
            value="${this.body}"
            placeholder="Download Appreciation"
            style="display: none"
          ></input>
        `;

        var container = document.getElementById("swapImgNow");

        if (container) {
          container.insertAdjacentHTML("afterbegin", markup);
          return true;
        }
      }

      if (section === "str") {
        var markup = `
            <input
              type="text"
              id="wallName"
              name="price"
              placeholder="Wallpaper Name"
              value="${this.name}"
              style="display: none"
            />
            <input
              type="text"
              id="wallAltName"
              name="altName"
              value="${this.alt_name}"
              placeholder="Wallpaper Alt Name"
              style="display: none"
            />
          </div>
            <input
              type="text"
              name="productId"
              value="${this.id}"
              placeholder="Wallpaper Alt Name"
              style="display: none"
            />
            <input
              type="text"
              name="productCategory"
              value="${this.category}"
              placeholder="Wallpaper Alt Name"
              style="display: none"
            />
          </div>
          <input
            type="text"
            id="paperBody"
            name="productDesc"
            value="${this.body}"
            placeholder="Download Appreciation"
            style="display: none"
          ></input>
        `;

        var container = document.getElementById("swapImgNow");
        console.log("hhhh");
        if (container) {
          container.insertAdjacentHTML("afterbegin", markup);
          return true;
        }
      }

      if (section === "blg") {
        var markup = `
            <input
              type="text"
              id="wallName"
              name="postTitle"
              placeholder="Wallpaper Name"
              value="${this.name}"
              style="display: none"
            />
            <input
              type="text"
              id="altPostName"
              name="altPostName"
              value="${this.alt_name}"
              placeholder="Wallpaper Alt Name"
              style="display: none"
            />
          </div>
            <input
              type="text"
              name="postId"
              value="${this.id}"
              placeholder="Wallpaper Alt Name"
              style="display: none"
            />
          </div>
          <input
            type="text"
            id="paperBody"
            name="postDesc"
            value="${this.body}"
            placeholder="Download Appreciation"
            style="display: none"
          ></input>
          <input
            type="text"
            id="paperBody"
            name="postSearchKeys"
            value="${this.tags}"
            placeholder="Download Appreciation"
            style="display: none"
          ></input>
        `;

        var container = document.getElementById("swapImgNow");

        if (container) {
          container.insertAdjacentHTML("afterbegin", markup);
          return true;
        }
      }
    }
  }

  renderImageToEdit() {
    var markup = `
      <figure>
        <img src="/assets/${this.image}" alt="${this.alt_name}" />
        <div class="imgAlt ${this.iId}">Alt</div>
        <figcaption>
          <label for="${this.iId}" data-file="${this.iId}" class="imgToCH"><small>Change ${this.type}</small></label>
          <input type="file" name="${this.name}" id="${this.iId}" />
        </figcaption>
      </figure>
    `;

    var container = document.querySelector("#swapImgNow");

    if (container) {
      container.insertAdjacentHTML("beforeend", markup);
    }
  }

  renderForm() {
    var markup = `
      <div class="cta--dashboard--body--text">
        <input
          required=""
          type="text"
          name="wall-name"
          placeholder="Wallpaper Name"
        />
        <input
          required=""
          type="text"
          name="wall-alt"
          placeholder="Wallpaper Alt Name"
        />
        <input
          required=""
          type="text"
          name="wall-alt"
          placeholder="Wallpaper Alt Name"
        />
        <select
          id="categories"
          required=""
          type="text"
          name="productCategory"
          placeholder="Product Category"
        >
          <option value="">Empty</option>
          <option value="mm">Tv</option>
          <option value="mm">Machine</option>
          <option value="mm">Laptop</option>
        </select>
      </div>
      <textarea
        required=""
        type="text"
        name="download-appreciation"
        placeholder="Download Appreciation"
      ></textarea>
      <div class="cta--dashboard--body--files">
        <label for="thumb"
          ><i class="fas fa-plus"></i>
          <p>Thumbnail</p>
        </label>
        <input required="" type="file" id="thumb" name="wall-thumbfile" />
        <label for="desk"
          ><i class="fas fa-plus"></i>
          <p>Desktop</p>
        </label>
        <input required="" type="file" id="desk" name="wall-deskfile" />
        <label for="tab"
          ><i class="fas fa-plus"></i>
          <p>Tablet</p>
        </label>
        <input required="" type="file" id="tab" name="wall-tabfile" />
        <label for="mob"
          ><i class="fas fa-plus"></i>
          <p>Mobile</p>
        </label>
        <input required="" type="file" id="mob" name="wall-mobfile" />
      </div>
      <button type="submit" class="pupBtn" id="">UPLOAD</button>
    `;

    if (this.section) {
      if (this.section === "wal") {
        markup = `
        <div class="cta--dashboard--body--text">
          <input
            required
            type="text"
            id="wallName"
            name="wall-name"
            placeholder="Wallpaper Name"
          />
          <input
            required
            type="text"
            id="wallAltName"
            name="wall-alt"
            placeholder="Wallpaper Alt Name"
          />
        </div>
        <textarea
          required
          type="text"
          id="paperBody"
          name="download-appreciation"
          placeholder="Download Appreciation"
        ></textarea>
        <div class="cta--dashboard--body--files">
          <label for="thumb"
            ><i class="fas fa-plus"></i>
            <p>Thumbnail</p>
          </label>
          <input required="" type="file" id="thumb" name="wall-thumbfile" />
          <label for="desk"
            ><i class="fas fa-plus"></i>
            <p>Desktop</p>
          </label>
          <input required="" type="file" id="desk" name="wall-deskfile" />
          <label for="tab"
            ><i class="fas fa-plus"></i>
            <p>Tablet</p>
          </label>
          <input required="" type="file" id="tab" name="wall-tabfile" />
          <label for="mob"
            ><i class="fas fa-plus"></i>
            <p>Mobile</p>
          </label>
          <input required="" type="file" id="mob" name="wall-mobfile" />
        </div>
        <button type="submit" class="pupBtn" name="wall-submit" id="uploadPost">UPLOAD</button>
      `;
      }

      if (this.section === "gal") {
        markup = `
          <div class="cta--dashboard--body--text">
          <input
            required=""
            type="text"
            name="gall-filename"
            placeholder="Image Title"
          />
          <input
            required=""
            type="text"
             name="gall-alt"
            placeholder="Image Alt Name" 
          />
        </div>
        <textarea
          required=""
          type="text"
          name="gall-body"
          placeholder="Caption"
        ></textarea>
        <div class="cta--dashboard--body--files">
          <label for="gall-img"
            ><i class="fas fa-plus"></i>
            <p>Thumbnail</p>
          </label>
          <input required="" type="file" id="gall-img" name="gall-file" />
        </div>
        <button type="submit" class="pupBtn" name="gall-submit">UPLOAD</button>
      `;
      }

      if (this.section === "str") {
        markup = `
          <div class="cta--dashboard--body--text">
            <input
              required=""
              type="text"
              name="productDesc"
              placeholder="Product Name"
            />
            <input
              required=""
              type="text"
              name="altName"
              placeholder="Product Alt Name"
            />
            <input
              required=""
              type="number"
              name="price"
              placeholder="Price in Naria"
            />
            <select
              id="categories"
              required=""
              type="text"
              name="productCategory"
              placeholder="Product Category"
            >
              
            </select>
          </div>
          <div class="cta--dashboard--body--files">
            <label for="img">
              <i class="fas fa-plus"></i>
              <p>Thumbnail</p>
            </label>
            <input id="img"  required type="file" name="productImg"/>
          </div>
          <button type="submit" class="pupBtn" name="submitProduct">UPLOAD</button>
        `;
      }

      if (this.section === "blg") {
        var markup = `
          <div class="cta--dashboard--body--text">
            <input
              required=""
              type="text"
              name="postTitle"
              placeholder="Post Title"
            />
            <input
              required=""
              type="text"
              name="altPostName"
              placeholder="Alt Name"
            />
            <input
              required=""
              type="text"
              name="postSearchKeys"
              placeholder="Search Keys"
            />
          </div>
          <textarea
            required=""
            type="text"
            name="postDesc"
          placeholder="Post Description"
          ></textarea>
          <div class="cta--dashboard--body--files">
            <label for="thumb"
              ><i class="fas fa-plus"></i>
              <p>Image</p>
            </label>
            <input required type="file" name="imgPost" id="thumb" />
          </div>
          <button type="submit" class="pupBtn" name="postSubmit">UPLOAD</button>
        `;
      }

      if (this.section === "cat") {
        var markup = `
          <div class="cta--dashboard--body--text">
            <input required="" type="text" name="categoryName" placeholder="Category Name">
          </div>
          <button type="submit" class="pupBtn" name="createCategory">UPLOAD</button>
        `;
      }

      if (this.section === "adm") {
        var markup = `
          <div class="cta--dashboard--body--text">
            <input required="" type="text" id="admUsr" placeholder="Username">
            <input required="" type="password" id="admPwd" placeholder="Password">
            <select
              id="admStat"
              required=""
              type="text"
            >
              <option value="false">Logged Out</option>
              <option value="true">Logged In</option>
            </select>
          </div>
          <button type="submit" class="pupBtn" id="minAdm">MINISTER</button>
        `;
      }

      if (this.section === "not") {
        var markup = `
          <div class="cta--dashboard--body--text">
            <input required="" id="notTit" type="text" name="title" placeholder="Title" >
            <input required="" id="notBdy" type="text" name="body" placeholder="Body" >
            <input required="" id="notUrl" type="text" name="url" placeholder="URL" >
            <input required="" id="notAbt" type="text" name="action" placeholder="Action Button" >
            <input required="" id="notImg" type="text" name="image" placeholder="Image URL" >
          </div>
          <button type="submit" class="pupBtn" id="sendNot" name="send_not">SEND</button>
        `;
      }
    }

    var container = document.getElementById("uploadNow");

    if (container) {
      container.innerHTML = "";
      container.insertAdjacentHTML("beforeend", markup);

      fetch("/api/v1/category/read-category.php")
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          var categories = data.data;

          var markup2 = `
            <option value="">Category</option>
          `;

          var container = document.querySelector("#categories");

          if (container) {
            container.innerHTML = "";
            document
              .querySelector("#categories")
              .insertAdjacentHTML("beforeend", markup2);

            for (let i = 0; i < categories.length; i++) {
              var e = categories[i];
              var markup = `
                  <option value = "${e.id}">${e.name}</option>
                `;

              document
                .querySelector("#categories")
                .insertAdjacentHTML("beforeend", markup);
            }
          }
        });
    }
  }
}
