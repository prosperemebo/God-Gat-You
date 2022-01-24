class App {
  access = this.access;

  constructor() {
    this.body = document.querySelector("main");
  }

  deny() {
    var denied = `
        <div class="denied">
            <h1>Access Denied</h1>
            <button id="tryagain">Try Again</button>
        </div>
    `;

    this.body.innerHTML = "";
    this.body.insertAdjacentHTML("beforeend", denied);
  }

  grant() {
    var granted = `
      <div class="dashboard__login--dashboard">
      <div class="confirmation" id="confirmDelDel"></div>
        <div class="confirmation" id="confirmDel"></div>
        <div class="dashboard__login--dashboard--nav">
        <i id="clMnu" class="fas fa-times"></i>
          <div class="dashboard__login--dashboard--nav--logo">
            <img src="/assets/Logo/logo.png" draggable="false" alt="GogGatYou Logo" />
            <h1 contenteditable="true" id="adminName" spellcheck="false">${
              localStorage.getItem("admin")
                ? JSON.parse(localStorage.getItem("admin")).name
                : "admin"
            }</h1>
          </div>
          <div class="dashboard__login--dashboard--nav--links">
            <button class="sectionBtn" data-section="wal" id="wal">Wallpapers</button>
            <button class="sectionBtn" data-section="gal" id="gal">Gallery</button>
            <button class="sectionBtn" data-section="str" id="str">Store</button>
            <button class="sectionBtn" data-section="blg" id="blg">Blog</button>
            <button class="sectionBtn" data-section="cat" id="cat">Categories</button>
            <button class="sectionBtn" data-section="usr" id="usr">Users</button>
            ${
              this.access
                ? '<button class="sectionBtn" data-section="adm" id="adm">Administrators</button>'
                : ""
            }
            <button class="sectionBtn" data-section="not" id="not">Notifications</button>
            <button class="sectionBtn" data-section="pur" id="pur">Purchases</button>
          </div>
        </div>
        <div class="dashboard__login--dashboard--main" id="infoBody">
          <div class="dashboard__login--dashboard--main--tags">
            <div class="dashboard__login--dashboard--main--tags--actions">
            </div>
            <div class="dashboard__login--dashboard--main--tags--cta">
              <button id="logOut">Log Out</button>
            </div>
          </div>

          <!-- Upload Container -->
          <div class="cta--dashboard">
            <div class="cta--dashboard--head">
              <h2>Upload</h2>
              <i class="fas fa-times clUpload"></i>
            </div>
            <form
              action="/api/v1/wallpaper/upload.php"
              method="post"
              enctype="multipart/form-data"class="cta--dashboard--body" id="uploadNow">
            </form>
          </div>

          <!-- Main Container -->
          <div class="dashboard__login--dashboard--main--body" id="infoMain"></div>
        </div>
      </div>
      <div class="appreciation" id="Thanks" dada-post="" style="z-index: 3">
        <a id="closeModal" style="cursor: pointer">
          <span class="lnr lnr-cross"></span>
        </a>

        <!-- Appreciation Container -->
        <div class="appreciation__content"></div>
      </div>
    `;

    this.body.innerHTML = "";
    this.body.insertAdjacentHTML("beforeend", granted);
  }

  lock() {
    var locked = `
        <form class="lockForm">
            <input type="text" placeholder="Username" id="username" autocomplete="off" />
            <input type="password" placeholder="Password" id="password" autocomplete="off" />
            <button id="login">Proceed</button>
        </form>
    `;

    this.body.innerHTML = "";
    this.body.insertAdjacentHTML("beforeend", locked);
  }
}
