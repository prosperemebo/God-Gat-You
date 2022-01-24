window.addEventListener("load", init);
var container = document.querySelector(".center-child");

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

async function init() {
  var url = new URL(window.location.href);
  var id = new URLSearchParams(url.search);
  var purchase = id.get("purchase");
  var id = id.get("id");

  var data = await getPurchase(id);

  if (purchase === "success" && data.purchase == true) {
    var markup = `
            <h2 class="payMsg">Congratulations your purchase is successful! check your email for your reciept we will contact you in a while. If your product is delayed you can contact ggy@gmail.com</h2>
          <div class="sizedbox"></div>
        `;

    container.insertAdjacentHTML("afterbegin", markup);

    var cart = [];

    localStorage.setItem("cart", JSON.stringify(cart));
  } else if (purchase === "error") {
    var markup = `
            <h2 class="payMsg">Aww snap! an error occurred during purchase.</h2>
          <div class="sizedbox"></div>
        `;

    container.insertAdjacentHTML("afterbegin", markup);
  } else if (!purchase) {
    window.location = "/store/";
  }
}
