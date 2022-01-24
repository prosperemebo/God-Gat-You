let mode = document.getElementById("mode");
let body = document.querySelector("#body");
theme = localStorage.getItem("GGYmode");

if (theme === null) {
  localStorage.setItem("GGYmode", body.className);
  theme = localStorage.getItem("GGYmode");
  body.className = theme;
  mode.className = `lnr lnr-${theme}`;
} else {
  body.className = theme;
  mode.className = `lnr lnr-${theme}`;
}

mode.addEventListener("click", () => {
  if (mode.className === "lnr lnr-sun" && body.className === "sun") {
    mode.className = "lnr lnr-moon";
    body.className = "moon";
    localStorage.setItem("GGYmode", "moon");
  } else {
    mode.className = "lnr lnr-sun";
    body.className = "sun";
    localStorage.setItem("GGYmode", "sun");
  }
});
