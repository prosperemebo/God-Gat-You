class Store {
  id = this.id;
  image = this.image;
  body = this.body;
  tag = this.tag;
  alt_name = this.alt_name;
  product_id = this.product_id;
  category_id = this.category_id;
  parent = this.parent;
  page = 1;
  results = 15;
  category = this.category;
  error = null;
  status = null;

  async fetchTags() {
    try {
      var res = await fetch("/api/v1/category/read-category.php");
      var data = await res.json();
      store.error = null;
      return data.data;
    } catch (err) {
      this.error = true;
    }
  }

  async fetchProducts() {
    try {
      var res = await fetch(
        `/api/v1/products/read-index.php?a=${this.results}&p=${this.page}`
      );
      var data = await res.json();
      this.error = null;
      this.status = data.status;
      return data.data;
    } catch (err) {
      this.error = true;
    }
  }

  async fetchProduct() {
    try {
      var res = await fetch(`/api/v1/products/read-single.php?id=${this.id}`);
      var data = await res.json();
      this.error = null;
      this.status = data.status;
      return data.data;
    } catch (err) {
      this.error = true;
    }
  }

  async fetchCategories() {
    try {
      var res = await fetch(
        `/api/v1/category/read-index.php?c=${this.category}&a=${this.results}&p=${this.page}`
      );
      var data = await res.json();
      this.error = null;
      this.status = data.status;
      return data.data;
    } catch (err) {
      this.error = true;
    }
  }

  loadTags() {
    var markup = `<button class="tag" data-category="${this.category_id}">${this.tag}</button>`;

    document.querySelector(`.tags`).insertAdjacentHTML("beforeend", markup);
  }

  async addToCart() {
    var id = this.id;
    var cart = JSON.parse(localStorage.getItem("cart"));

    if (cart === null) {
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    try {
      var res = await fetch(`/api/v1/products/read-single.php?id=${id}`);
      var product = await res.json();
      product.data.quantity = 1;
      cart.push(product.data).data;
      localStorage.setItem("cart", JSON.stringify(cart));
      document.querySelector("#cart-quantity").textContent = cart.length;
      return cart;
    } catch (err) {
      console.log(err);
      errorSubMsg("Failed to add!", 1000, "add", "#1b1b1b");
      errorSubMsg("Failed to add!", 4000, "remove", "#1b1b1b");
      return false;
    }
  }

  loadCartProducts() {
    function numberWithCommas(x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }

    var msg = document.querySelector("#emptyy");
    if (msg) {
      document.querySelector("#emptyy").parentElement.removeChild(msg);
    }

    var markup = `
      <figure id="${this.cart_id}" data-product="${
      this.product_id
    }" class="cartItem">
          <div style="background-image: url(/assets/images/ggy_dummy_img.jpg); background-size: cover;
    background-position: center;
    border-radius: 1rem;
    height: 15rem;
    background-repeat: no-repeat;">
              <img draggrable="false" src="/assets/uploads/store/${
                this.image
              }" alt="${this.alt_name}" />
          </div>
          <figcaption class="cartcaption">
              <div class="content">
              <h2>
                  ${this.product_desc}
              </h2>
              <p class="productPrice">&#8358;${numberWithCommas(this.price)}</p>
              </div>
              <div class="quantity">
              <button id="incQnt" class="increase">+</button>
              <p class="prc">${numberWithCommas(this.quantity)}</p>
              <button id="decQnt" class="deincrease">-</button>
              </div>
              <span style="cursor: pointer;" id="delCartItem" class="lnr lnr-cross"></span>
          </figcaption>
      </figure> `;
    var trolley = document.querySelector("#cartOfProducts");
    trolley.insertAdjacentHTML("beforeend", markup);
  }

  // loadCategory() {
  //   var markup = `
  //     <div class="store__category">
  //         <h1 class="wallpapers__heading sub--heading">
  //           '.$qqr['categoryName'].'
  //         </h1>
  //         <div class="sizedbox-sm"></div>
  //         <div
  //           class="store__category--products wallpapers__wallpapers wallpapers__wallpapers--long"
  //         >
  //         </div>
  //         <div class="sizedbox"></div>
  //       </div>
  //   `;
  // }

  loadProducts() {
    function numberWithCommas(x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }

    var markup = `
      <figure class="product singleProd" data-aos="fade-up" id="${
        this.id
      }" data-product="${this.product_id}" data-category="${this.category_id}">
        <div class="hero"  style="background-image: url(/assets/images/ggy_dummy_img.jpg); background-size: cover;
    background-position: center;
    background-repeat: no-repeat;">
        <img
          src="/assets/uploads/store/${this.image}"
          draggable="false"
          alt="${this.alt_name}"
        /></div>
        <div class="content">
          <p>${this.body}</p>
          <h2>&#8358;${numberWithCommas(this.price)}</h2>
          <button class="btn--sm btn btn--store add addToCart">
            <i class="fas fa-cart-plus"></i> Add To Cart
          </button>
        </div>
      </figure>
    `;

    document
      .querySelector(`.${this.parent}`)
      .insertAdjacentHTML("beforeend", markup);
  }

  describeProduct() {
    function numberWithCommas(x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }

    var markup = `
      <figure class="overview" id="${this.id}" >
        <img
          id="overview__img"
          src="/assets/uploads/store/${this.image}"
          draggable="false"
          alt="${this.alt_name}"
        />
      </figure>
      <div class="desc">
        <p class="desc_p" id="wallpaerAppre">
          ${this.body}
        </p>
        <form class="cart singleProd download_form" data-product="${
          this.product_id
        }" >
          <div id="forminn" class="cart">
            <p>&#8358;${numberWithCommas(this.price)}</p>
          </div>
          <button
            class="download_paper cart add addToCart"
            type="submit"
            name="downloadSub"
          >
            Add To Cart
          </button>
        </form>
      </div>
    `;

    var parent = document.querySelector(".appreciation__content");

    parent.innerHTML = "";
    parent.insertAdjacentHTML("beforeend", markup);
  }

  insertLoader() {
    var markup = `
            <div class="loader" style="display: flex;
                justify-content: center;
                align-items: center;"
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
                align-items: center;"
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
                align-items: center;"
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
}

// Declaring Variables
var store = new Store();
var slider = document.querySelector(".tags");
var networkDataRecieved = false;
var currentData = false;
var endOfPage = false;
var onCategory = false;
var isDown = false;
var scrollLeft;
var startX;

// Load Products Into DOM
function loadProducts(products) {
  store.parent = "wallpapers__wallpapers--long";

  if (!products) {
    var markup = `
      <p
        style="
          font-size: 2.3rem;
          text-align: center;
          color: #b5b5b5;
          font-family: sans-serif;
        "
        class="error-mm"
      >
        <em
          >It seems there are no products in this category yet!</em
        >
      </p>
    `;
    document
      .querySelector(".wallpapers__wallpapers--long")
      .insertAdjacentHTML("afterend", markup);
  } else {
    var msg = document.querySelector(".error-mm");

    if (msg) {
      document.querySelector(".error-mm").parentElement.removeChild(msg);
    }

    products.forEach(function (product) {
      store.id = product.id;
      store.image = product.image;
      store.price = product.price;
      store.body = product.product_desc;
      store.alt_name = product.alt_name;
      store.product_id = product.product_id;
      store.category_id = product.category_id;

      store.loadProducts();
    });
  }
}

// Load Category Tags
async function loadTags() {
  var msg = document.querySelector(".error-mm");

  if (msg) {
    document.querySelector(".error-mm").parentElement.removeChild(msg);
  }

  var categories = await store.fetchTags();
  categories.forEach(function (category) {
    store.tag = category.name;
    store.category_id = category.id;
    store.loadTags();
  });
}

// Load All Product On Page Load
async function loadAllProducts() {
  onCategory = false;
  networkDataRecieved = false;
  currentData = false;

  var msg = document.querySelector(".error-mm");
  if (msg) {
    document.querySelector(".error-mm").parentElement.removeChild(msg);
  }

  var msg = document.querySelector(".off_msg");
  if (msg) {
    document.querySelector(".off_msg").parentElement.removeChild(msg);
  }

  store.parent = "wallpapers__wallpapers--long";
  store.removeLoader();
  store.insertLoader();
  // store.results = 2;
  // store.page = 1;
  var products = await store.fetchProducts();
  console.log("From Network", products);

  if (!store.error) {
    networkDataRecieved = true;
    currentData = true;
    store.clearCards();
    loadProducts(products);
  }
  // else {
  //   var markup = `
  //     <p
  //       style="
  //         font-size: 2.3rem;
  //         text-align: center;
  //         color: #b5b5b5;
  //         font-family: sans-serif;
  //       "
  //       class="error-mm"
  //     >
  //       <em
  //         >Aw snap!</em
  //       >
  //     </p>
  //   `;
  //   document
  //     .querySelector(".wallpapers__wallpapers--long")
  //     .insertAdjacentHTML("afterend", markup);
  // }
  store.removeLoader();
}

async function addToCart() {
  var resu = JSON.parse(localStorage.getItem("resu"));

  if (resu === null || resu === "" || resu === " ") {
    var data = {
      first: "GODGATYOUUSER",
      second: "",
    };
    localStorage.setItem("resu", JSON.stringify(data));
  }

  resu = JSON.parse(localStorage.getItem("resu"));

  if (resu.second !== null || resu.second !== "" || resu.second !== " ") {
    await fetch("/api/v1/purchases/read-user.php?id=" + resu.second)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.status === false) {
          store.addToCart();
          return true;
        } else {
          errorSubMsg(
            "Complete your previous purchase first!",
            1000,
            "add",
            "#1b1b1b"
          );
          errorSubMsg(
            "Complete your previous purchase first!",
            4000,
            "remove",
            "#1b1b1b"
          );

          setTimeout(function () {
            window.location = "/store/pay/?pay=" + data.data.purchase_id;
          }, 3500);
        }
      });
  } else {
    store.addToCart();
    return true;
  }
}

// Load A specific Category Route
async function loadCategory(category) {
  onCategory = true;
  networkDataRecieved = false;
  currentData = false;

  var msg = document.querySelector(".error-mm");
  if (msg) {
    document.querySelector(".error-mm").parentElement.removeChild(msg);
  }

  store.parent = "wallpapers__wallpapers--long";
  store.removeLoader();
  store.insertLoader();
  store.category = category;
  // store.results = 2;
  // store.page = 1;

  var products = await store.fetchCategories();
  console.log("From Network", products);

  if (!store.error) {
    networkDataRecieved = true;
    currentData = true;
    loadProducts(products);
  } else {
    // var markup = `
    //   <p
    //     style="
    //       font-size: 2.3rem;
    //       text-align: center;
    //       color: #b5b5b5;
    //       font-family: sans-serif;
    //     "
    //     class="error-mm"
    //   >
    //     <em
    //       >Aw snap!</em
    //     >
    //   </p>
    // `;
    // document
    //   .querySelector(".wallpapers__wallpapers--long")
    //   .insertAdjacentHTML("afterend", markup);
    offlineHandler();
  }
  store.removeLoader();
}

async function fetchMoreProducts() {
  var msg = document.querySelector(".off_msg");
  if (msg) {
    document.querySelector(".off_msg").parentElement.removeChild(msg);
  }

  // Inserting Loaders
  store.removeLoader();
  store.insertLoader();

  // // Fething products
  // if (onCategory) {
  //   if (store.category) {
  //     loadCategory(store.category);
  //   }
  // } else {
  // }

  store.page++;
  var productss;

  if (onCategory) {
    if (store.category) {
      productss = await store.fetchCategories();
    }
  } else {
    productss = await store.fetchProducts();
  }

  console.log("From Network", productss);

  if (!store.error) {
    networkDataRecieved = true;
    currentData = true;
    store.removeLoader();

    if (store.status) {
      // Inserting Products into dom
      loadProducts(productss);
    } else {
      var msg = document.querySelector(".in_s_msg");
      if (msg) {
        document.querySelector(".in_s_msg").parentElement.removeChild(msg);
      }

      var markup = `<p
                       style="
                         font-size: 1.8rem;
                         text-align: center;
                         color: #b5b5b5;
                         font-family: sans-serif;
                         padding: 2rem;
                          margin-top: 2rem;
                       "
                       class="in_s_msg"
                     >
                       <em
                         >It seems like you've come to the end!</em
                       >
                     </p>`;

      endOfPage = true;
      document
        .querySelector(`.${store.parent}`)
        .insertAdjacentHTML("afterend", markup);
    }
  } else {
    if (store.page === 1) {
      store.page = 1;
    } else {
      store.page--;
    }

    // Removing Loaders
    store.removeLoader();

    errorSubMsg("Failed to load", 1000, "add", "#1b1b1b");
    errorSubMsg("Failed to load", 5000, "remove", "#1b1b1b");
  }
  store.removeLoader();
}

function renderCart() {
  var cart = JSON.parse(localStorage.getItem("cart"));
  var cartTag = document.querySelector("#cart-quantity");
  var cartTrolley = document.querySelector("#cartOfProducts");

  if (cart === null) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  cartTag.textContent = cart.length;
  cartTrolley.innerHTML = "";

  if (cart.length > 0) {
    cart.forEach(function (p, i) {
      store.cart_id = p.cart_id;
      store.product_id = p.product_id;
      store.product_desc = p.product_desc;
      store.price = p.price * p.quantity;
      store.quantity = p.quantity;
      store.image = p.image;
      store.loadCartProducts();
    });
    return;
  }

  var markup = `<p id="emptyy" class="empty">Your Cart Is Empty</p>`;
  cartTrolley.insertAdjacentHTML("afterbegin", markup);
}

// Handle Cart Auth
function cartAuth() {
  var checkout = document.querySelector("#checkoutt");
  var resu = JSON.parse(localStorage.getItem("resu"));

  if (resu === null || resu === "" || resu === " ") {
    var data = {
      first: "GODGATYOUUSER",
      second: "",
    };
    localStorage.setItem("resu", JSON.stringify(data));

    checkout.classList.add("disabled");
  }

  resu = JSON.parse(localStorage.getItem("resu"));

  checkout.addEventListener("click", function (e) {
    if (resu.second === null || resu.second === "" || resu.second === " ") {
      e.preventDefault();
      checkout.classList.add("disabled");
      welcome(300);

      document.querySelector("#body").addEventListener("click", function (e) {
        if (e.target.matches(".btn-close, .btn-close *")) {
          document.querySelector(".welcome").classList.add("closed");

          var data = {
            first: "GODGATYOUUSER",
            second: "",
          };
          localStorage.setItem("resu", JSON.stringify(data));

          errorSubMsg("Enter your name to checkout!", 300, "add", "#1b1b1b");
          errorSubMsg(
            "Enter your name to checkout!",
            5000,
            "remove",
            "#1b1b1b"
          );
        }

        if (e.target.matches("form .enable")) {
          setTimeout(() => {
            resu = JSON.parse(localStorage.getItem("resu"));
            checkout.classList.remove("disabled");
          }, 300);
        }
      });
    }
  });
}

// Describe Product
async function describeProduct(id) {
  store.id = id;
  var product = await store.fetchProduct();
  store.id = product.id;
  store.product_id = product.product_id;
  store.image = product.image;
  store.alt_name = product.alt_name;
  store.body = product.product_desc;
  store.price = product.price;
  store.describeProduct();
  document.querySelector(".appreciation").style.display = "block";
}

document.querySelector("#closeModal").addEventListener("click", (e) => {
  document.querySelector(".appreciation__content").innerHTML = "";
  document.querySelector(".appreciation").style.display = "none";
});

// Event Handlers
function events() {
  window.addEventListener("online", function () {
    if (currentData === false && networkDataRecieved === false) {
      store.parent = "tags";
      store.clearCards();
      var markup = `<button class="tag" data-category="all">All</button>`;

      document.querySelector(`.tags`).insertAdjacentHTML("beforeend", markup);
      store.parent = "wallpapers__wallpapers--long";
      store.clearCards();
      loadTags();

      if (onCategory) {
        if (store.category) {
          loadCategory(store.category);
        }
      } else {
        loadAllProducts();
      }
    }
  });

  document.querySelector("body").addEventListener("click", function (event) {
    if (event.target.matches(".tag, .tag *")) {
      var category = event.target.getAttribute("data-category");

      var msg = document.querySelector(".in_s_msg");
      if (msg) {
        document.querySelector(".in_s_msg").parentElement.removeChild(msg);
      }

      store.parent = "wallpapers__wallpapers--long";
      store.clearCards();

      if (category === "all") {
        store.page = 1;
        endOfPage = false;
        loadAllProducts();
      } else {
        store.page = 1;
        store.page = 1;
        endOfPage = false;
        loadCategory(category);
      }
    }

    if (event.target.matches(".addToCart, .addToCart *")) {
      event.preventDefault();
      async function int() {
        var cart = JSON.parse(localStorage.getItem("cart"));
        var id = event.target
          .closest(".singleProd")
          .getAttribute("data-product");
        var trolley = document.querySelector("#cartOfProducts");
        var index;

        cart.forEach(function (e, i) {
          if (e.product_id === id) {
            index = i;
            return;
          }
        });

        if (index !== undefined) {
          var resu = JSON.parse(localStorage.getItem("resu"));

          if (resu === null || resu === "" || resu === " ") {
            var data = {
              first: "GODGATYOUUSER",
              second: "",
            };
            localStorage.setItem("resu", JSON.stringify(data));
          }

          resu = JSON.parse(localStorage.getItem("resu"));

          if (
            resu.second !== null ||
            resu.second !== "" ||
            resu.second !== " "
          ) {
            await fetch("/api/v1/purchases/read-user.php?id=" + resu.second)
              .then(function (res) {
                return res.json();
              })
              .then(function (data) {
                if (data.purchase === false) {
                  cart[index].quantity = cart[index].quantity + 1;
                  localStorage.setItem("cart", JSON.stringify(cart));
                  renderCart();
                  return;
                } else {
                  errorSubMsg(
                    "Complete your previous purchase first!",
                    1000,
                    "add",
                    "#1b1b1b"
                  );
                  errorSubMsg(
                    "Complete your previous purchase first!",
                    4000,
                    "remove",
                    "#1b1b1b"
                  );

                  setTimeout(function () {
                    window.location =
                      "/store/pay/?pay=" + data.data.purchase_id;
                  }, 3500);
                }
              });
          } else {
            cart[index].quantity = cart[index].quantity + 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
            return;
          }
        } else {
          store.id = id;
          await addToCart();

          renderCart();
        }
      }
      int();
    }

    if (event.target.matches(".cart-btn, .cart-btn *")) {
      renderCart();
    }

    if (event.target.matches("#delCartItem, #delCartItem *")) {
      var id = event.target.closest(".cartItem").getAttribute("id");
      var cart = JSON.parse(localStorage.getItem("cart"));
      var index;

      cart.forEach(function (e, i) {
        if (e.cart_id === id) {
          index = i;
          return;
        }
      });

      cart.splice(index, 1);

      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      // var el = document.querySelector(`#${id}`);
      // document.querySelector(`#${id}`).parentElement.removeChild(el);
    }

    if (event.target.matches("#incQnt, #incQnt *")) {
      var id = event.target.closest(".cartItem").getAttribute("id");
      var cart = JSON.parse(localStorage.getItem("cart"));
      var index;

      cart.forEach(function (e, i) {
        if (e.cart_id === id) {
          index = i;
          return;
        }
      });

      cart[index].quantity = cart[index].quantity + 1;

      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }

    if (event.target.matches("#decQnt, #decQnt *")) {
      var id = event.target.closest(".cartItem").getAttribute("id");
      var cart = JSON.parse(localStorage.getItem("cart"));
      var index;

      cart.forEach(function (e, i) {
        if (e.cart_id === id) {
          index = i;
          return;
        }
      });

      if (cart[index].quantity > 1) {
        cart[index].quantity = cart[index].quantity - 1;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }

    if (event.target.matches(".hero, .hero *")) {
      var id = event.target.closest(".product").dataset.product;
      describeProduct(id);
    }

    if (
      event.target.matches("#closeModal") ||
      event.target.matches("#Thanks")
    ) {
      document.querySelector(".appreciation__content").innerHTML = "";
      document.querySelector(".appreciation").style.display = "none";
    }
  });

  window.addEventListener("scroll", function (e) {
    var scrollTop = document.documentElement.scrollTop;
    var scrollHeight = document.querySelector(".main-body").clientHeight;
    var clientHeight = document.documentElement.clientHeight;
    // console.log(store.page, store.results, endOfPage, onCategory, store.status);

    if (scrollTop + clientHeight >= scrollHeight - 170) {
      if (endOfPage === false && networkDataRecieved === true) {
        fetchMoreProducts();
      }
    }
  });
}

// Progressive Enhancement
function offlineHandler() {
  if ("indexedDB" in window) {
    readAllData("store").then(function (data) {
      if (!networkDataRecieved && !currentData) {
        if (data.length > 0) {
          var orderedData = [];

          console.log("From cache: ", data);
          store.parent = "wallpapers__wallpapers--long";
          store.clearCards();
          store.removeLoader();
          store.insertLoader();

          [...data]
            .sort(function (a, b) {
              return b.id - a.id;
            })
            .forEach(function (e) {
              orderedData.push(e);
            });

          // Inseting Products into DOM
          loadProducts(orderedData);
        } else {
          var markup = `<p
                       style="
                         font-size: 2.3rem;
                         text-align: center;
                         color: #b5b5b5;
                         font-family: sans-serif;
                         padding: 2rem;
                        
                       "
                       class="off_msg"
                     >
                       <em
                         >Sorry Products are not avaliable for the moment. Please check internet connection and try again!</em
                       >
                     </p>`;
          store.removeLoader();

          document
            .querySelector(".wallpapers__wallpapers--long")
            .insertAdjacentHTML("afterbegin", markup);
        }
      }
    });
  }
}

// App
function app() {
  offlineHandler();
  loadTags();
  events();
  renderCart();
  cartAuth();
  loadAllProducts();
}

app();
