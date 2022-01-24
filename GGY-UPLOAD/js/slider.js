const slideContainer = document.querySelector(".header");
const slide = document.querySelector(".header__slides");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const interval = 5000;

let slides = document.querySelectorAll(".slide");
let index = 1;
let slideId;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);



firstClone.id = "first-clone";
lastClone.id = "last-clone";

slide.append(firstClone);
slide.prepend(lastClone);

const slideWidth = slides[index].clientWidth;

slide.style.transform = `translateX(${-slideWidth * index}px)`;

const startSlide = () => {
  slideId = setInterval(() => {
    moveToNextSlide();
  }, interval);
};

const getSlides = () => document.querySelectorAll(".slide");

slide.addEventListener("transitionend", () => {
  slides = getSlides();
  if (slides[index].id === firstClone.id) {
    slide.style.transition = "none";
    index = 1;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
  if (slides[index].id === lastClone.id) {
    slide.style.transition = "none";
    index = slides.length - 2;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

const moveToNextSlide = () => {
  slides = getSlides();
  if (index >= slides.length - 1) return;

  index++;
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  slide.style.transition = ".7s ease-in-out";
};

const moveToPreviousSlide = () => {
  if (index <= 0) return;
  index--;
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  slide.style.transition = ".7s ease-in-out";
};

// slideContainer.addEventListener("mouseenter", () => {
//   clearInterval(slideId);
// });

// slideContainer.addEventListener("mouseleave", startSlide);

nextBtn.addEventListener("click", moveToNextSlide);
prevBtn.addEventListener("click", moveToPreviousSlide);

startSlide();

let client = {
  init: function () {
    let o = this;

    // this will disable dragging of all images
    document.querySelector("img").mousedown(function (e) {
      e.preventDefault();
    });

    // this will disable right-click on all images
    document.querySelector("body").on("contextmenu", function (e) {
      return false;
    });
  },
};
