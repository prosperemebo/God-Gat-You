var wallpaperNum = 20;

fetch("/api/v1/wallpaper/read.php")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    wallpaperNum = data.data.length;
    localStorage.setItem("wallpaperNum", wallpaperNum);
  });

var newNum = localStorage.getItem("wallpaperNum");

if (newNum) {
  wallpaperNum = newNum;
}

// document.getElementById("wallNum").setAttribute("data-target", wallpaperNum);
counter();
