var networkDataRecieved = false;
var currentData = false;

// Wallpapers
var url = "/api/v1/wallpaper/read.php";

// Instantiate New Wallpaers
var recentWallpapers = new Wallpaper("recents__container");
var wallpapers = new Wallpaper("wallpapers__wallpapers");

// Inserting Loaders
recentWallpapers.insertLoader();
wallpapers.insertLoader();

// Fething wallapers
fetch("/api/v1/wallpaper/read.php")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    networkDataRecieved = true;
    console.log("From network", data);

    // Clearing wallpapers
    recentWallpapers.clearCards();

    // Inserting wallpapers into dom
    // for (let i = 0; i < 10; i++) {
    //   var e = data.data[i];
    //   recentWallpapers.image = e.thumbnail;
    //   recentWallpapers.paper_id = e.paper_id;
    //   recentWallpapers.altName = e.alt_name;
    //   recentWallpapers.createRecentWallpapers();
    // }

    data.data.forEach(function (e, i) {
      if (i <= 10) {
        recentWallpapers.image = e.thumbnail;
        recentWallpapers.paper_id = e.paper_id;
        recentWallpapers.altName = e.alt_name;
        recentWallpapers.createRecentWallpapers();
      }
    });

    currentData = true;

    // Removing Loaders
    recentWallpapers.removeLoader();
  });

// Fething pictures
fetch("/api/v1/gallery/read.php")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    networkDataRecieved = true;
    console.log("From network", data);

    // Clearing wallpapers
    wallpapers.clearCards();

    // Inserting wallpapers into dom
    // for (let i = 0; i < 10; i++) {
    //   var e = data.data[i];
    //   if (i < 8) {
    //     wallpapers.image = e.image;
    //     wallpapers.paper_id = e.image_id;
    //     wallpapers.altName = e.alt_name;
    //     wallpapers.createWalpaper();
    //   }
    // }

    data.data.forEach(function (e, i) {
      if (i < 8) {
        wallpapers.image = e.image;
        wallpapers.paper_id = e.image_id;
        wallpapers.altName = e.alt_name;
        wallpapers.createWalpaper();
      }
    })

    currentData = true;

    // Removing Loaders
    wallpapers.removeLoader();
  });

if ("indexedDB" in window) {
  readAllData("wallpapers").then(function (data) {
    if (!networkDataRecieved && !currentData) {
      if (data.length > 0) {
        console.log("From cache: ", data);
        document.querySelector(".recents__container").innerHTML = "";

        var orderedData = [];

        [...data]
          .sort(function (a, b) {
            return b.id - a.id;
          })
          .forEach(function (e) {
            orderedData.push(e);
          });

        // Inseting wallpapers into DOM
        for (let i = 0; i < data.length; i++) {
          var e = orderedData[i];

          recentWallpapers.image = e.thumbnail;
          recentWallpapers.paper_id = e.paper_id;
          recentWallpapers.altName = e.alt_name;
          recentWallpapers.createRecentWallpapers();
        }
        recentWallpapers.removeLoader();
      } else {
        var markup = `<p
                       style="
                         font-size: 2.3rem;
                         text-align: center;
                         color: #b5b5b5;
                         font-family: sans-serif;
                         padding: 2rem;
                        
                       "
                     >
                       <em
                         >Sorry wallpapers are not avaliable for the moment. Please check internet connection and try again!</em
                       >
                     </p>`;
        recentWallpapers.removeLoader();
        document
          .querySelector(".recents__container")
          .insertAdjacentHTML("afterbegin", markup);
      }

      window.addEventListener(
        "online",
        function (e) {
          if (currentData === false && networkDataRecieved === false) {
            fetch("/api/v1/wallpaper/read.php")
              .then(function (res) {
                return res.json();
              })
              .then(function (data) {
                clearAllData("wallpapers").then(function (data) {
                  data.forEach((e, i) => {
                    if (i < 5) {
                      writeData("wallpapers", e);
                    }
                  });
                });

                networkDataRecieved = true;
                currentData = true;
                console.log("From network", data);

                // Clearing wallpapers
                recentWallpapers.clearCards();

                // Inserting wallpapers into dom
                for (let i = 0; i < 10; i++) {
                  var e = data.data[i];
                  recentWallpapers.image = e.thumbnail;
                  recentWallpapers.paper_id = e.paper_id;
                  recentWallpapers.altName = e.alt_name;
                  recentWallpapers.createRecentWallpapers();
                }

                // Removing Loaders
                recentWallpapers.removeLoader();
              });
          }
        },
        false
      );
    }
  });

  readAllData("gallery").then(function (data) {
    if (!networkDataRecieved && !currentData) {
      if (data.length > 0) {
        console.log("From cache: ", data);
        document.querySelector(".wallpapers__wallpapers").innerHTML = "";

        var orderedData = [];

        [...data]
          .sort(function (a, b) {
            return b.id - a.id;
          })
          .forEach(function (e) {
            orderedData.push(e);
          });

        // Inseting wallpapers into DOM
        for (let i = 0; i < data.length; i++) {
          var e = orderedData[i];
          wallpapers.image = e.image;
          wallpapers.paper_id = e.image_id;
          wallpapers.altName = e.alt_name;
          wallpapers.createWalpaper();
        }
        wallpapers.removeLoader();
      } else {
        var markup = `<p
                       style="
                         font-size: 2.3rem;
                         text-align: center;
                         color: #b5b5b5;
                         font-family: sans-serif;
                         padding: 2rem;
                        
                       "
                     >
                       <em
                         >Sorry pictures are not avaliable for the moment. Please check internet connection and try again!</em
                       >
                     </p>`;
        wallpapers.removeLoader();

        document
          .querySelector(".wallpapers__wallpapers")
          .insertAdjacentHTML("afterbegin", markup);
      }

      window.addEventListener(
        "online",
        function (e) {
          if (currentData === false && networkDataRecieved === false) {
            fetch("/api/v1/gallery/read.php")
              .then(function (res) {
                return res.json();
              })
              .then(function (data) {
                clearAllData("gallery").then(function (data) {
                  data.forEach((e, i) => {
                    if (i < 5) {
                      writeData("gallery", e);
                    }
                  });
                });

                networkDataRecieved = true;
                currentData = true;
                console.log("From network", data);

                // Clearing wallpapers
                wallpapers.clearCards();

                // Inserting wallpapers into dom
                for (let i = 0; i < 10; i++) {
                  var e = data.data[i];
                  if (i < 8) {
                    wallpapers.image = e.image;
                    wallpapers.paper_id = e.image_id;
                    wallpapers.altName = e.alt_name;
                    wallpapers.createWalpaper();
                  }
                }

                // Removing Loaders
                wallpapers.removeLoader();
              });
          }
        },
        false
      );
    }
  });
}
