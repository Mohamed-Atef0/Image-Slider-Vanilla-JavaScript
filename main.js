const slides = document.querySelectorAll(".slider img");
const imageId = document.querySelector(".image-id");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const galleryContainer = document.querySelector(".gallery-container");
let currentSlide = 0;

galleryContainer.style.gridTemplateColumns = `repeat(${slides.length} , 1fr)`;

updateSliderControls();
function goToSlider(n) {
  // Remove Active Class From The Current Slide
  slides[currentSlide].classList.remove("active");
  // Update CurrentSlide
  currentSlide = (n + slides.length) % slides.length; // Example => (-1 + 7) % 7 = 6
  // Add Active Class From The Current Slide
  slides[currentSlide].classList.add("active");
  // Update Slider Controls
  updateSliderControls();
  // Update Thumbail Active State
  updateThumbnailActiveState(currentSlide);
}

prevBtn.addEventListener("click", () => {
  goToSlider(currentSlide - 1);
});

nextBtn.addEventListener("click", () => {
  goToSlider(currentSlide + 1);
});

function updateSliderControls() {
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === slides.length - 1;
  imageId.textContent = `Image ${currentSlide + 1} of ${slides.length}`;
}

slides.forEach((img, index) => {
  const thumbnail = img.cloneNode();
  thumbnail.addEventListener("click", () => {
    goToSlider(index);
  });
  galleryContainer.appendChild(thumbnail);
});

function updateThumbnailActiveState(index) {
  galleryContainer.querySelectorAll("img").forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}
