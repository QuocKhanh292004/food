document.addEventListener("DOMContentLoaded", () => {
  // Xử lý cho trang "producnew.html"
  const producNewContainer = document.getElementById("produc-new");
  if (producNewContainer) {
    fetch("producnew.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((html) => {
        producNewContainer.innerHTML = html;
        initializeAnimations();
      })
      .catch((error) =>
        console.error("Lỗi khi tải nội dung producnew:", error)
      );
  }

  // Xử lý cho trang "aboutdeco.html"
  const aboutUsContainer = document.getElementById("about-us-container");
  if (aboutUsContainer) {
    fetch("aboutdeco.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((html) => {
        aboutUsContainer.innerHTML = html;
        initializeAnimations();
      })
      .catch((error) =>
        console.error("Lỗi khi tải nội dung aboutdeco:", error)
      );
  }

  // Tích hợp logic xử lý animation vào một hàm riêng
  function initializeAnimations() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        easing: "ease-in-out",
        once: false, // Đặt là false để animation lặp lại
      });
      AOS.refreshHard();
    } else {
      console.error("Lỗi: Thư viện AOS chưa được tải.");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateWords(entry.target);
          } else {
            resetWords(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    function animateWords(element) {
      if (!element.classList.contains("animated-init")) {
        const text = element.getAttribute("data-original-text");
        element.innerHTML = "";
        const words = text.trim().split(/\s+/);

        words.forEach((word, index) => {
          const wordSpan = document.createElement("span");
          wordSpan.className = "word";
          wordSpan.textContent = word;
          wordSpan.style.transitionDelay = `${index * 100}ms`;
          element.appendChild(wordSpan);
          if (index < words.length - 1) {
            element.appendChild(document.createTextNode(" "));
          }
        });
        element.classList.add("animated-init");
      }

      setTimeout(() => {
        element.querySelectorAll(".word").forEach((word) => {
          word.classList.add("animated");
        });
      }, 100);
    }

    function resetWords(element) {
      element.querySelectorAll(".word").forEach((word) => {
        word.classList.remove("animated");
      });
    }

    document.querySelectorAll(".animate-text").forEach((element) => {
      // Kiểm tra và lưu nội dung gốc nếu chưa có
      if (!element.getAttribute("data-original-text")) {
        element.setAttribute("data-original-text", element.textContent);
      }
      observer.observe(element);
    });
  }
});
