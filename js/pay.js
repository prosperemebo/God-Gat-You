var purchaseData;

async function getPurchase(id) {
  var data;

  await fetch("/api/v1/purchases/read-single.php?id=" + id)
    .then(function (res) {
      return res.json();
    })
    .then(function (dat) {
      data = dat;
      console.log(data);
    });

  return data;
}

async function startApp() {
  var url = new URL(window.location.href);
  var id = new URLSearchParams(url.search);
  var purchase = id.get("pay");

  if (!purchase) {
    window.location = "/store/";
  }

  data = await getPurchase(purchase);

  console.log(data);

  if (data.status) {
    var markup = `
      <h2 class="payMsg">
          Hi ${data.data.first_name}, you're one step away from completing your payment!
      </h2>
      <div class="purchase__cta">
        <button type="submit" class="btn" id="delPur">Cancel</button>
        <div class="sizedbox-w"></div>
        <form id="paymentForm">
          <div class="form-submit">
            <button type="submit" class="btn">
                Proceed
            </button>
          </div>
        </form>
      </div>
    `;

    document
      .querySelector(".center-child")
      .insertAdjacentHTML("afterbegin", markup);

    var paymentForm = document.getElementById("paymentForm");

    paymentForm.addEventListener("submit", function (event) {
      event.preventDefault();
      payWithPaystack(data);
      console.log(data.data.amount_paid * 100);
    });
  } else {
    var markup = `
            <h2 class="payMsg">
                An error occured processing your purchase!
            </h2>
            <div class="sizedbox"></div>
        `;

    document
      .querySelector(".center-child")
      .insertAdjacentHTML("afterbegin", markup);
  }
}

async function deletePost() {
  var url = new URL(window.location.href);
  var id = new URLSearchParams(url.search);
  var purchase = id.get("pay");

  await fetch("/api/v1/purchases/delete.php", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ purchase }),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (data.status) {
        errorSubMsg("Pucrchase deleted successfully!", 300, "add", "#1b1b1b");
        errorSubMsg(
          "Pucrchase deleted successfully!",
          3000,
          "remove",
          "#1b1b1b"
        );

        var cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));

        setTimeout(() => {
          window.location = "/store/";
        }, 3300);
      }
    })
    .catch(function () {
      errorSubMsg("Purchase deleted unsuccessfully!", 300, "add", "#1b1b1b");
      errorSubMsg(
        "Purchase deleted unsuccessfully!",
        3000,
        "remove",
        "#1b1b1b"
      );
    });
}

// function payWithPaystack(data) {
//   var handler = PaystackPop.setup({
//     key: "pk_test_c2b93e54d2283b5dc716529f88d0b51db7d3c8b5", // Replace with your public key
//     email: data.data.email,
//     amount: +data.amount_paid * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
//     currency: "NGN", // Use GHS for Ghana Cedis or USD for US Dollars
//     ref: "GGY" + Math.floor(Math.random() * 10000000000000 + 1), // Replace with a reference you generated
//     callback: function (response) {
//       //this happens after the payment is completed successfully
//       var reference = response.reference;
//       alert("Payment complete! Reference: " + reference);
//       // Make an AJAX call to your server with the reference to verify the transaction
//     },
//     onClose: function () {
//       alert("Transaction was not completed, window closed.");
//     },
//   });
//   handler.openIframe();
// }

function payWithPaystack(data) {
  var handler = PaystackPop.setup({
    key: "pk_test_c2b93e54d2283b5dc716529f88d0b51db7d3c8b5", // Replace with your public key
    email: data.data.email,
    firstname: data.data.first_name,
    lastname: data.data.last_name,
    amount: data.data.amount_paid * 100,
    ref: "GGY" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    // label: "Optional string that replaces customer email"
    onClose: function () {
      errorSubMsg("You cancelled your transaction!", 1000, "add", "#1b1b1b");
      errorSubMsg("You cancelled your transaction!", 4000, "remove", "#1b1b1b");
    },
    callback: function (response) {
      var message = "Payment complete! Reference: " + response.reference;

      errorSubMsg(message, 200, "add", "#1b1b1b");
      errorSubMsg(message, 4000, "remove", "#1b1b1b");

      var url = new URL(window.location.href);
      var id = new URLSearchParams(url.search);
      var purchase = id.get("pay");

      setTimeout(function () {
        window.location =
          "/api/v1/purchases/verify.php?reference=" +
          response.reference +
          "&id=" +
          purchase;
      }, 1500);
    },
  });
  console.log(data);
  handler.openIframe();
}

window.addEventListener("load", function () {
  var resu = JSON.parse(localStorage.getItem("resu"));

  if (resu === null || resu === "" || resu === " ") {
    var data = {
      first: "GODGATYOUUSER",
      second: "",
    };
    localStorage.setItem("resu", JSON.stringify(data));
    window.location = "/store/";
  }

  resu = JSON.parse(localStorage.getItem("resu"));

  if (resu.second === null || resu.second === "" || resu.second === " ") {
    window.location = "/store/";
  }
  startApp();
});

document.querySelector("body").addEventListener("click", function (event) {
  if (event.target.matches("#delPur")) {
    var url = new URL(window.location.href);
    var id = new URLSearchParams(url.search);
    var purchase = id.get("pay");
    document
      .querySelector("#confirmDel")
      .setAttribute("data-purchase", purchase);
    document.querySelector("#confirmDel").classList.add("confirm");
  }

  if (event.target.matches("#cancelDelPo")) {
    document.querySelector("#confirmDel").classList.remove("confirm");
  }

  if (event.target.matches("#confirmDelPo")) {
    deletePost();
  }
});
