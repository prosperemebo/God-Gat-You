class Cart {
  id = this.id;
  cart_id = this.id;
  image = this.image;
  alt_name = this.alt_name;
  category_id = this.category_id;
  price = this.price;
  product_desc = this.product_desc;
  quantity = this.quantity;

  fetchProducts() {
    var cart = JSON.parse(localStorage.getItem("cart"));

    if (!cart) {
      cart = [];

      localstorage.setItem("cart", JSON.stringify(cart));
    }

    return cart;
  }

  loadProducts() {
    function numberWithCommas(x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }

    var markup = `
          <figure id="${this.id}" data-cart="${this.cart_id}">
            <div class="img" style="flex: 1; background-image: url(/assets/images/ggy_dummy_img.jpg); background-size: cover;
    background-position: center;
    background-repeat: no-repeat;">
              <img
                draggrable="false"
                src="/assets/uploads/store/${this.image}"
                alt="${this.alt_name}"
              />
            </div>
            <figcaption style="flex: 3">
              <div class="desc">
                <h2>${this.product_desc}</h2>
                <p style="display: none">
                  &#8358;${this.price / this.quantity}
                </p>
              </div>
              <div class="sizedbox"></div>
              <div class="details">
                <h2>Quantity: <span>${numberWithCommas(
                  this.quantity
                )}</span></h2>
                <h2>
                  Total Price: <span>&#8358;${numberWithCommas(
                    this.price * this.quantity
                  )}</span>
                </h2>
              </div>
            </figcaption>
          </figure>
    `;
    document
      .querySelector("#cartOfProducts")
      .insertAdjacentHTML("beforeend", markup);
  }

  reciept(arr, user) {
    var data = {
      totalPrice: 0,
      totalQuantity: 0,
      totalItems: 0,
      message: "",
    };

    if (arr === null) {
      return;
    }

    if (arr.length === 0 || arr.length === -1) {
      data.totalPrice = 0;
      data.totalQuantity = 0;
      data.totalItems = 0;
    }

    if (arr.length > 0) {
      data.totalItems = arr.length;

      var msg = "";
      var message = `${user.first} with user id of ${user.second} is about to purchase`;

      arr.forEach(function (e) {
        data.totalQuantity = data.totalQuantity + e.quantity * 1;
        data.totalPrice = data.totalPrice + e.price * e.quantity;
        msg = `${msg}; ${e.quantity} ${e.product_desc} at ${
          e.price
        } total cost at ${e.price * e.quantity} with product id of '${
          e.product_id
        }'`;
      });

      data.message = `${message} ${msg}`;
    }

    return data;
  }

  loadForm(obj) {
    var markup = `
        <form action="/api/v1/products/pay.php" method="post" class="out">
            <div class="head">
                <h2>Checkout</h2>
            </div>
            <div class="body">
                <input
                    required
                    type="text"
                    name="first"
                    id="prodFn"
                    placeholder="First Name"
                />
                <input required type="text" name="last" id="prodLn" placeholder="Last Name" />
                <input
                    required
                    type="email"
                    name="email"
                    id="prodEm"
                    placeholder="Email Address"
                />
                <input
                    type="hidden"
                    name="desc"
                    value="${obj.message}"
                />
                <input
                    type="hidden"
                    name="uid"
                    value="${JSON.parse(localStorage.getItem("resu")).second}"
                />
                <input type="hidden" name="amount" value='${JSON.stringify(
                  obj.totalPrice
                )}' />
                <input
                    required
                    type="number"
                    name="phone"
                    id="prodPhn"
                    placeholder="Phone Number"
                />
                <button id="cheProd" name="productCheckout">Checkout</button>
            </div>
        </form>
    `;
    document.querySelector(".info").insertAdjacentHTML("beforeend", markup);
  }
}

// Declaring Variables
var cart = new Cart();

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function loadProducts() {
  var products = cart.fetchProducts();
  var holder = document.querySelector("#cartOfProducts");

  if (products.length === 0) {
    var markup = `
      <p id="empty" style="text-align: center; font-size: 2rem">
          Your Cart Is Empty
      </p>
    `;
    holder.insertAdjacentHTML("afterend", markup);
    return;
  }

  products.forEach((e) => {
    if (e.product_desc.length > 50) {
      e.product_desc = `${e.product_desc.slice(0, 50)}...`;
    }

    cart.id = e.id;
    cart.cart_id = e.cart_id;
    cart.image = e.image;
    cart.alt_name = e.alt_name;
    cart.product_desc = e.product_desc;
    cart.price = e.price;
    cart.quantity = e.quantity;

    cart.loadProducts();
  });
}

function loadReciept() {
  var products = cart.fetchProducts();
  var resu = JSON.parse(localStorage.getItem("resu"));
  var totalItems = document.getElementById("tI");
  var totalQuantity = document.getElementById("tQ");
  var totalPrice = document.getElementById("tP");

  var data = cart.reciept(products, resu);

  totalItems.innerHTML = numberWithCommas(data.totalItems);
  totalQuantity.innerHTML = numberWithCommas(data.totalQuantity);
  totalPrice.innerHTML = "&#8358;" + numberWithCommas(data.totalPrice);

  if (products.length > 0) {
    var obj = {
      message: data.message,
      totalPrice: [],
    };

    products.forEach(function (product) {
      var objj = {
        id: product.product_id,
        quantity: product.quantity,
      };

      obj.totalPrice.push(objj);
    });

    cart.loadForm(obj);
  }
}

async function authLoad() {
  var resu = JSON.parse(localStorage.getItem("resu"));

  if (resu === null || resu === "" || resu === " ") {
    var data = {
      first: "GODGATYOUUSER",
      second: "",
    };
    localStorage.setItem("resu", JSON.stringify(data));
    window.location = "/store/#checkout";
  }

  resu = JSON.parse(localStorage.getItem("resu"));

  if (resu.second === null || resu.second === "" || resu.second === " ") {
    window.location = "/store/#checkout";
  } else if (
    resu.second !== null ||
    resu.second !== "" ||
    resu.second !== " "
  ) {
    var resu = JSON.parse(localStorage.getItem("resu"));

    if (resu === null || resu === "" || resu === " ") {
      var data = {
        first: "GODGATYOUUSER",
        second: "",
      };
      localStorage.setItem("resu", JSON.stringify(data));
      window.location = "/store/#checkout";
    }

    resu = JSON.parse(localStorage.getItem("resu"));

    if (resu.second === null || resu.second === "" || resu.second === " ") {
      window.location = "/store/#checkout";
    } else if (
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

            window.location = "/store/pay/?pay=" + data.data.purchase_id;
          }
        });
    }
  }
}

function events() {
  window.addEventListener("load", function (e) {
    authLoad();
  });

  document.getElementById("body").addEventListener("click", function (event) {
    if (event.target.matches("#cheProd, #cheProd *")) {
      var first = document.getElementById("prodFn");
      var last = document.getElementById("prodLn");
      var email = document.getElementById("prodEm");
      var phone = document.getElementById("prodPhn");

      if (first.value <= 3 || last.value <= 3 || email.value < 5 || phone < 5) {
        errorSubMsg("Values too short!", 300, "add", "#1b1b1b");
        errorSubMsg("Values too short!", 5000, "remove", "#1b1b1b");
      }
    }
  });
}

function app() {
  events();
  loadProducts();
  loadReciept();
}

app();
