class Blog {
  id = this.id;
  image = this.image;
  title = this.title;
  body = this.body;
  alt_name = this.alt_name;
  post_id = this.post_id;
  parent = this.parent;
  views = this.views;
  date = this.date;
  comments = this.comments;
  likes = this.likes;
  error = null;
  status = null;
  page = 1;
  results = 15;

  async fetchPosts() {
    try {
      var res = await fetch(
        `/api/v1/post/read-index.php?p=${this.page}&a=${this.results}`
      );
      var data = res.json();
      this.error = null;
      this.status = data.status;
      return data;
    } catch (err) {
      this.error = true;
    }
  }

  async fetchPopularPosts() {
    try {
      var res = await fetch(`/api/v1/post/read-popular.php?a=5`);
      var data = res.json();
      this.error = null;
      return data;
    } catch (err) {
      this.error = true;
    }
  }

  async searchPosts(query) {
    try {
      var res = await fetch(`/api/v1/post/search.php?q=${query}`);
      var data = res.json();
      this.error = null;
      this.status = data.status;
      return data;
    } catch (err) {
      this.error = true;
    }
  }

  loadPosts() {
    var markup = `
      <div class="posts__post" id="${this.id}" data-aos="fade-up">
        <figure>
          <a href="/post/?post=${this.post_id}">
            <img
              class="hat"
              src="/assets/uploads/blog/blog${this.image}"
              draggable="false"
              alt="${this.alt_name}"
            />
          </a>
          <figcaption>
            <small>
              <span class="lnr lnr-calendar-full"></span>
              <p class="datePostPost">${this.date}</p>
            </small>
            <small>
              <span class="lnr lnr-eye"></span>
              <p>${this.views}</p>
            </small>
            <small>
              <span class="lnr lnr-heart"></span>
              <p>${this.likes}</p>
            </small>
            <small>
              <span class="lnr lnr-bubble"></span>
              <p>${this.comments}</p>
            </small>
          </figcaption>
        </figure>
        <div class="posts__post--description">
          <h1 class="postTitlem">${this.title}</h1>
          <p class="postDescriptionm">${this.description}</p>
          <div class="wallpapers__cta cta">
            <a
              href="/post/?post=${this.post_id}"
              class="btn--sm btn"
              >Read More</a
            >
          </div>
        </div>
      </div>
    `;

    document
      .querySelector(`.${this.parent}`)
      .insertAdjacentHTML('beforeend', markup);
  }

  loadPopularPosts() {
    var markup = `
      <div class="popular__post" id=${this.id} data-aos="fade-left">
        <figure>
          <a href="/post/?post=${this.post_id}">
            <img
              src="/assets/uploads/blog/blog${this.image}"
              draggable="false"
              alt="${this.alt_name}"
              draggrable="false"
            />
          </a>
          <figcaption>
            <a href="/post/?post=${this.post_id}">
              <div class="stats">
                <div class="wrap">
                  <div class="views ss">
                    <span class="lnr lnr-eye rp"></span>
                    <p>${this.views}</p>
                  </div>
                  <div class="likes ss">
                    <span class="lnr lnr-heart"></span>
                    <p>${this.likes}</p>
                  </div>
                </div>
              </div>
            </a>
            <div class="title">
              <h2 class="popular__post__title">${this.title}</h2>
            </div>
            <form class="post__cta">
              <a
                href="/post/?post=${this.post_id}"
                class="btn btn--sm"
                >View Post</a
              >
            </form>
          </figcaption>
        </figure>
      </div>
    `;
    document
      .querySelector(`.posts__popular__posts`)
      .insertAdjacentHTML('beforeend', markup);
  }

  loadResults() {
    var markup = `
      <a href="/post/?post=${this.post_id}" id="${this.id}" class="result">
        <div class="overview">
          <img src="/assets/uploads/blog/blog${this.image}" draggrable="false" alt="${this.alt_name}">
        </div>
        <div class="caption">
          <h2>${this.title}</h2>
        </div class="caption">
      </a>
    `;

    document.querySelector(`.results`).insertAdjacentHTML('beforeend', markup);
  }

  insertLoader() {
    var markup = `
            <div class="loader" style="display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 10rem;"
            >
                <img draggable="false" alt="loader" src="/assets/images/icons/app-icon-96x96.png">
            </div>
        `;

    document
      .querySelector(`.${this.parent}`)
      .insertAdjacentHTML('afterend', markup);
  }

  insertLoader2() {
    var markup = `
            <div class="loader" style="display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 3rem;
                "
            >
                <img draggable="false" alt="loader" src="/assets/images/icons/app-icon-96x96.png">
            </div>
        `;

    document
      .querySelector(`.${this.parent}`)
      .insertAdjacentHTML('beforeend', markup);
  }

  insertLoader3(pp) {
    var markup = `
            <div class="loader" style="display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 3rem;"
            >
                <img draggable="false" alt="loader" src="/assets/images/icons/app-icon-96x96.png">
            </div>
        `;

    document.querySelector(`.${pp}`).insertAdjacentHTML('beforeend', markup);
  }

  removeLoader() {
    var loader = document.querySelector('.loader');
    if (loader)
      document.querySelector('.loader').parentElement.removeChild(loader);
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
var blog = new Blog();
var networkDataRecieved = false;
var currentData = false;
var endOfPage = false;

// Load Posts into DOM
function loadPosts(posts) {
  blog.parent = 'posts__real__real';
  if (!posts) {
    var markup = `
      <p
        style="
          font-size: 2.3rem;
          text-align: center;
          color: #b5b5b5;
          margin-top: 8rem;
          font-family: sans-serif;
        "
        class="error-mm"
      >
        <em
          >It seems there are no posts yet!</em
        >
      </p>
    `;
    document
      .querySelector('.posts__real__real')
      .insertAdjacentHTML('afterend', markup);
    return false;
  }

  var msg = document.querySelector('.error-mm');

  if (msg) {
    document.querySelector('.error-mm').parentElement.removeChild(msg);
  }

  posts.forEach(function (e) {
    if (e.post_name.length >= 40) {
      e.post_name = `${e.post_name.slice(0, 40)}...`;
    }

    if (e.body.length >= 300) {
      e.body = `${e.body.slice(0, 300)}...`;
    }

    var dip = e.date.split('-');
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    var newOM = +dip[1] - 1;
    // var newOM = +dip[1].slice(1) - 1;
    var newDate = `${dip[2]} ${months[newOM]}, ${dip[0]}`;
    e.date = newDate;
  });

  posts.forEach(function (e) {
    blog.id = e.id;
    blog.post_id = e.post_id;
    blog.image = e.image;
    blog.alt_name = e.alt_name;
    blog.date = e.date;
    blog.views = e.views;
    blog.likes = e.likes;
    blog.comments = e.comments;
    blog.title = e.post_name;
    blog.description = e.body;

    blog.parent = 'posts__real__real';
    blog.loadPosts();
  });
}

async function fetchMorePosts() {
  var msg = document.querySelector('.error-mm');

  if (msg) {
    document.querySelector('.error-mm').parentElement.removeChild(msg);
  }

  // Inserting Loaders
  blog.parent = 'posts__real__real';
  blog.removeLoader();
  blog.insertLoader();

  blog.page++;
  var postss;

  postss = await blog.fetchPosts();

  console.log('From Network', postss);

  if (!blog.error) {
    networkDataRecieved = true;
    currentData = true;
    blog.removeLoader();

    if (postss.status) {
      // Inserting Posts into dom
      loadPosts(postss.data);
    } else {
      var msg = document.querySelector('.error-mm');
      if (msg) {
        document.querySelector('.error-mm').parentElement.removeChild(msg);
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
                       class="in_s_msg error-mm"
                     >
                       <em
                         >It seems like you've come to the end! But regardless God Gat You.</em
                       >
                     </p>`;

      endOfPage = true;
      document
        .querySelector(`.${blog.parent}`)
        .insertAdjacentHTML('afterend', markup);
    }
  } else {
    if (blog.page === 1) {
      blog.page = 1;
    } else {
      blog.page--;
    }

    // Removing Loaders
    blog.removeLoader();

    errorSubMsg('Failed to load', 1000, 'add', '#1b1b1b');
    errorSubMsg('Failed to load', 5000, 'remove', '#1b1b1b');
  }
  blog.removeLoader();
}

// Load posts on Page Load
async function loadAllPosts() {
  networkDataRecieved = false;
  currentData = false;

  var msg = document.querySelector('.error-mm');
  if (msg) {
    document.querySelector('.error-mm').parentElement.removeChild(msg);
  }

  var msg = document.querySelector('.off_msg');
  if (msg) {
    document.querySelector('.off_msg').parentElement.removeChild(msg);
  }

  blog.parent = 'posts__real__real';
  blog.removeLoader();
  blog.insertLoader();

  var posts = await blog.fetchPosts();
  console.log('From network', posts);

  if (!blog.error) {
    blog.clearCards();

    networkDataRecieved = true;
    currentData = true;
    loadPosts(posts.data);
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
  //     .querySelector(".posts__real__real")
  //     .insertAdjacentHTML("afterend", markup);
  // }
  blog.removeLoader();
}

async function loadPopularPosts() {
  var msg = document.querySelector('.error-mm');
  if (msg) {
    document.querySelector('.error-mm').parentElement.removeChild(msg);
  }

  blog.removeLoader();
  blog.insertLoader3('posts__popular__posts');

  var posts = await blog.fetchPopularPosts();
  console.log('From network', posts);

  posts.data.forEach(function (e) {
    if (e.post_name.length >= 25) {
      e.post_name = `${e.post_name.slice(0, 25)}...`;
    }
  });

  if (!blog.error) {
    posts.data.forEach(function (e) {
      blog.id = e.id;
      blog.post_id = e.post_id;
      blog.image = e.image;
      blog.alt_name = e.alt_name;
      blog.views = e.views;
      blog.likes = e.likes;
      blog.title = e.post_name;

      blog.loadPopularPosts();
    });
  } else {
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
          >Aw snap!</em
        >
      </p>
    `;
    document
      .querySelector('.posts__popular__posts')
      .insertAdjacentHTML('afterend', markup);
  }
  blog.removeLoader();
}

// Event Handlers
function events() {
  window.addEventListener('online', function () {
    if (currentData === false && networkDataRecieved === false) {
      blog.parent = 'posts__real__real';
      blog.clearCards();
      loadAllPosts();

      document.querySelector('.posts__popular__posts').innerHTML = '';
      loadPopularPosts();
    }
  });

  async function renderRes(val) {
    var results = document.querySelector('.results');
    var query = val;

    if (query === '') {
      results.innerHTML = '';

      var markup = `
        <p
          style="
            font-size: 1.8rem;
            text-align: center;
            color: #b5b5b5;
            font-family: sans-serif;
            padding: 0.5rem 2rem;
            margin-top: 2rem;
          "
        >
          <em>Type to search...</em>
        </p>
      `;
      results.insertAdjacentHTML('afterbegin', markup);
    }

    if (query.trim() === '') {
      return false;
    }

    results.innerHTML = '';
    blog.parent = 'results';
    blog.removeLoader();
    blog.insertLoader2();

    var result = await blog.searchPosts(query);

    if (!result) {
      results.innerHTML = '';
      var markup = `
          <p
            style="
              font-size: 1.8rem;
              text-align: center;
              color: #b5b5b5;
              font-family: sans-serif;
              padding: 0.5rem 2rem;
              margin-top: 2rem;
            "
          >
            <em>Aw Snap!</em>
          </p>
        `;
      results.insertAdjacentHTML('afterbegin', markup);
    } else {
      results.innerHTML = '';
      if (result.status) {
        result.data.forEach(function (r) {
          blog.id = r.id;
          blog.post_id = r.post_id;
          blog.title = r.post_name;
          blog.image = r.image;
          blog.alt_name = r.alt_name;

          blog.loadResults();
        });
      } else {
        results.innerHTML = '';
        var markup = `
          <p
            style="
              font-size: 1.8rem;
              text-align: center;
              color: #b5b5b5;
              font-family: sans-serif;
              padding: 0.5rem 2rem;
              margin-top: 2rem;
            "
          >
            <em>No results found!</em>
          </p>
        `;
        results.insertAdjacentHTML('afterbegin', markup);
      }
    }
  }

  document
    .querySelector('.searchPosts input')
    .addEventListener('focus', function (e) {
      var results = document.querySelector('.results');
      if (this.value.trim() === '') {
        results.classList.add('active');
        results.innerHTML = '';

        var markup = `
        <p
          style="
            font-size: 1.8rem;
            text-align: center;
            color: #b5b5b5;
            font-family: sans-serif;
            padding: 0.5rem 2rem;
            margin-top: 2rem;
          "
        >
          <em>Type to search...</em>
        </p>
      `;
        results.insertAdjacentHTML('afterbegin', markup);
      } else {
        results.classList.add('active');
        renderRes(this.value);
      }
    });

  document
    .querySelector('.searchPosts input')
    .addEventListener('keyup', async function () {
      renderRes(this.value);
    });

  document
    .querySelector('.searchPosts input')
    .addEventListener('blur', function (e) {
      document.querySelector('.results').classList.remove('active');
    });

  window.addEventListener('scroll', function (e) {
    var scrollTop = document.documentElement.scrollTop;
    var scrollHeight = document.querySelector('.main-body').clientHeight;
    var clientHeight = document.documentElement.clientHeight;
    // console.log(blog.page, blog.results, endOfPage, onCategory, blog.status);

    if (scrollTop + clientHeight >= scrollHeight - 170) {
      if (endOfPage === false && networkDataRecieved === true) {
        fetchMorePosts();
      }
    }
  });
}

// Progressive Enhancement
function offlineHandler() {
  if ('indexedDB' in window) {
    readAllData('posts').then(function (data) {
      if (!networkDataRecieved && !currentData) {
        if (data.length > 0) {
          var orderedData = [];

          console.log('From cache: ', data);
          blog.parent = 'posts__real__real';
          blog.clearCards();
          blog.removeLoader();
          blog.insertLoader();

          [...data]
            .sort(function (a, b) {
              return b.id - a.id;
            })
            .forEach(function (e) {
              orderedData.push(e);
            });

          // Inseting Posts into DOM
          loadPosts(orderedData);
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
                         >Sorry Posts are not avaliable for the moment. Please check internet connection and try again!</em
                       >
                     </p>`;
          blog.removeLoader();

          document
            .querySelector('.posts__real__real')
            .insertAdjacentHTML('afterbegin', markup);
        }
      }
    });
  }
}

function app() {
  offlineHandler();
  loadAllPosts();
  loadPopularPosts();
  events();
}

app();
