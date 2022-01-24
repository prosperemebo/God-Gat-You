window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
    document.querySelector(".nav").style.maxHeight = "9vh";
    document.getElementById("logo").style.width = "7rem";
  } else {
    document.getElementById("logo").style.width = "7rem";
    // document.querySelector(".nav").style.display = "flex";
    document.querySelector(".nav").style.maxHeight = "10vh";
  }
}

if (window.matchMedia("(max-width: 1000px)").matches) {
  window.addEventListener("click", (e) => {
    if (e.target.matches(".nav__links")) {
      document.getElementById("navi").click();
    }
  });
}
