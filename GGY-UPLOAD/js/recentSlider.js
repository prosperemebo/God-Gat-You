function slider(slider) {
  var slider = document.querySelector(`.${slider}`);
  var isDown = false;
  var startX;
  var scrollLeft;

  if (slider) {
    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      e.preventDefault();
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return; // Stops the function from running!
      e.preventDefault();
      var x = e.pageX - slider.offsetLeft;
      var walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
  }
}

slider("recents__container");
slider("tags");
slider("posts__popular__posts");
