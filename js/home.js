// ---------- about-text-video----------//
var video = document.getElementById("about-us-text-video-1");
var playButton = document.getElementById("about-us-text-video-button");

// chỉnh âm lượng âm thanh
video.volume = 0.3;

// click vào video -> chạy video or không chạy
video.addEventListener("click", function () {
  if (video.paused) {
    video.play();
    playButton.style.display = "none";
  } else {
    video.pause();
    playButton.style.display = "block";
  }
});

// click vào button -> chạy video
playButton.addEventListener("click", function () {
  video.play();
  playButton.style.display = "none";
});

// Khi video kết thúc
video.addEventListener("ended", function () {
  this.currentTime = 0;
  playButton.style.display = "block";
});
// ---------- about-text-video----------//

// ---------- swiper testimonials-content----------//
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".testimonials-slider", {
    // Các tham số tùy chọn
    grabCursor: true,
    spaceBetween: 30,
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    // Nếu bạn cần sử dụng phân trang
    pagination: {
      el: ".testimonials-pagination",
      clickable: true,
    },
  });
});
// ---------- swiper testimonials-content----------//

// ---------- swiper event-content----------//
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".events-slider", {
    // Các tham số tùy chọn
    grabCursor: true,
    spaceBetween: 30,
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    // Nếu bạn cần sử dụng phân trang
    pagination: {
      el: ".events-pagination",
      clickable: true,
    },
  });
});
// ---------- swiper event-content----------//

// ---------- swiper gallery-content----------//
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".gallery-slider", {
    // Các tham số tùy chọn
    grabCursor: true,
    spaceBetween: 30,
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "3",
    // Nếu bạn cần sử dụng phân trang
    pagination: {
      el: ".gallery-pagination",
      clickable: true,
    },
  });
});
// ---------- swiper gallery-content----------//

// ---------- scroll----------//
window.addEventListener('scroll', function() {
  var scrollButton = document.querySelector('.scroll');
  if (window.scrollY > 150) {
    scrollButton.classList.add('show'); // Thêm class "show" để hiển thị
  } else {
    scrollButton.classList.remove('show'); // Loại bỏ class "show" để ẩn
  }
});
// ---------- scroll----------//
