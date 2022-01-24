class Wallpaper {
  id = this.id;
  paper_id = this.paper_id;
  image = this.image;
  altName = this.altName;
  mobile = this.mobile;
  desktop = this.desktop;
  tablet = this.tablet;
  description = this.description;
  name = this.name;
  downloads = this.downloads;
  likes = this.likes;
  liked = this.liked;

  constructor(parent) {
    this.parent = parent;
  }

  createRecentWallpapers() {
    var markup = `
        <div class="reslide" style="background-image: url(/assets/images/ggy_dummy_img.jpg); background-size: cover;
    background-position: center;
    border-radius: 4px;
    background-repeat: no-repeat;" data-aos="fade-right">
            <a href="/wallpaper?wallpaper=${this.paper_id}"><img draggable="false" src="/assets/uploads/wallpaper/wallpaper${this.image}" alt="${this.altName} Recent Wallpaper"></a>
        </div>
    `;

    document
      .querySelector(".recents__container")
      .insertAdjacentHTML("beforeend", markup);
  }

  createWalpaper() {
    var markup = `
        <figure style="background-image: url(/assets/images/ggy_dummy_img.jpg); background-size: cover;
    background-position: center;
    border-radius: 3px;
    background-repeat: no-repeat;" class="wallpapers__wallpaper" data-aos="fade-up">
          <a href="/gallery?gallery=${this.paper_id}">
            <img src="/assets/uploads/gallery/gallery${this.image}" draggable="false" alt="${this.altName}">
          </a>
        </figure>
    `;

    document
      .querySelector(".wallpapers__wallpapers")
      .insertAdjacentHTML("beforeend", markup);
  }

  createRealWallpapers() {
    var markup = `
            <figure class="wallpapers__wallpaper" id="${this.id}" data-wallpaper="${this.paper_id}" data-aos="fade-up" style="background-image: url(/assets/images/ggy_dummy_img.jpg); background-size: cover;
    background-position: center;
    border-radius: 3px;
    background-repeat: no-repeat;">
                <div>
                    <img src="/assets/uploads/wallpaper/wallpaper${this.image}" draggable="false" alt="${this.altName}">
                </div>
                <figcaption id="showAppreciation" style="cursor: pointer;">
                    <a>Download Now <span class="lnr lnr-enter-down"></span></a>
                </figcaption>
            </figure>
        `;

    document
      .querySelector(".wallpapers__wallpapers")
      .insertAdjacentHTML("beforeend", markup);
  }

  createPaper() {
    var markup = `
          <figure class="overview">
            <img id="overview__img" src="/assets/uploads/wallpaper/wallpaper${this.image}" draggable="false" alt="${this.altName}">
            <figcaption>
              <h2 id="d_imgname">${this.name}</h2>
            </figcaption>
          </figure>
          <div class="desc">
            <p class="desc_p" id="wallpaerAppre">
                ${this.description}
            </p>
            <div class="stats">
              <div class="like">
                <i class="far fa-heart likeIcon"></i>
                <span>${this.likes}</span>
              </div>
              <div class="view">
                <span class="lnr lnr-enter-down"></span>
                <span class="downNum">${this.downloads}</span>
              </div>
              <div class="view" id="shbtn" style="cursor: pointer; padding: .5rem">
                <i class="fas fa-share"></i>
                <span class="downNum">share</span>
              </div>
            </div>
            <form class="download_form">
              <div id="forminn">
                <input type="checkbox" name="pc" id="pc">
                <label for="pc"><span></span> Desktop</label>
                <input type="checkbox" name="tablet" id="tablet">
                <label for="tablet"><span></span> Tablet</label>
                <input type="checkbox" name="mobile" id="mobile">
                <label for="mobile"><span></span> Mobile</label>
                <input type="hidden" id="appreI" name="downloadid" value="">
              </div>
              <button class="download_paper disabled" type="submit" name="downloadSub">Download</button>
            </form>
          </div>
      `;

    document
      .querySelector(`.${this.parent}`)
      .insertAdjacentHTML("beforeend", markup);
  }

  insertLoader() {
    var markup = `
            <div class="loader" style="display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 3rem"
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
