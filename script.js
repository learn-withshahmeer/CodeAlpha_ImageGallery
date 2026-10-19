// list of images shown in the gallery
const images = [
  { src: "https://picsum.photos/seed/forest1/600/800", category: "nature", caption: "Morning fog, pine ridge" },
  { src: "https://picsum.photos/seed/city1/600/450", category: "urban", caption: "Crosswalk, downtown" },
  { src: "https://picsum.photos/seed/face1/600/700", category: "people", caption: "Portrait, window light" },
  { src: "https://picsum.photos/seed/shape1/600/600", category: "abstract", caption: "Concrete and shadow" },
  { src: "https://picsum.photos/seed/river1/600/750", category: "nature", caption: "River bend, dusk" },
  { src: "https://picsum.photos/seed/street1/600/500", category: "urban", caption: "Alleyway, neon sign" },
  { src: "https://picsum.photos/seed/hands1/600/650", category: "people", caption: "Hands, workshop" },
  { src: "https://picsum.photos/seed/lines1/600/400", category: "abstract", caption: "Glass reflection" },
  { src: "https://picsum.photos/seed/mountain1/600/800", category: "nature", caption: "Ridge line, first snow" },
  { src: "https://picsum.photos/seed/bridge1/600/450", category: "urban", caption: "Bridge, low tide" },
  { src: "https://picsum.photos/seed/walk1/600/700", category: "people", caption: "Walking, market street" },
  { src: "https://picsum.photos/seed/texture1/600/600", category: "abstract", caption: "Rust and paint" },
  { src: "https://picsum.photos/seed/lake1/600/700", category: "nature", caption: "Still water, early light" },
  { src: "https://picsum.photos/seed/rooftop1/600/500", category: "urban", caption: "Rooftops, grey afternoon" },
  { src: "https://picsum.photos/seed/reading1/600/750", category: "people", caption: "Reading, quiet corner" },
];

let currentIndex = 0;
let currentCategory = "all";

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");

// build the gallery cards
function loadGallery() {
  gallery.innerHTML = "";

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const card = document.createElement("div");
    card.className = "card";

    if (currentCategory !== "all" && img.category !== currentCategory) {
      card.className = "card hidden";
    }

    card.innerHTML = "<img src='" + img.src + "' alt='" + img.caption + "'>" +
                      "<p>" + img.caption + "</p>";

    card.addEventListener("click", function () {
      currentIndex = i;
      showLightbox();
    });

    gallery.appendChild(card);
  }
}

function showLightbox() {
  const img = images[currentIndex];
  lightboxImg.src = img.src;
  lightboxCaption.textContent = img.caption;
  lightbox.classList.add("open");
}

function nextImage() {
  currentIndex = currentIndex + 1;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  showLightbox();
}

function prevImage() {
  currentIndex = currentIndex - 1;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  showLightbox();
}

document.getElementById("closeBtn").addEventListener("click", function () {
  lightbox.classList.remove("open");
});

document.getElementById("nextBtn").addEventListener("click", nextImage);
document.getElementById("prevBtn").addEventListener("click", prevImage);

// filter buttons
const filterButtons = document.querySelectorAll(".filter-btn");
for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    for (let j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove("active");
    }
    this.classList.add("active");
    currentCategory = this.dataset.category;
    loadGallery();
  });
}

loadGallery();
