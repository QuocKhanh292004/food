document.addEventListener("DOMContentLoaded", () => {
  const contentContainer = document.getElementById("produc-new");

  if (!contentContainer) {
    console.error("Lỗi: Không tìm thấy phần tử có ID 'produc-new'.");
    return;
  }

  fetch("producnew.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      contentContainer.innerHTML = html;

      // Khởi tạo lại AOS sau khi nội dung được tải
      if (typeof AOS !== "undefined") {
        AOS.init({
          easing: "ease-in-out",
          // bỏ 'once: true'
        });
        AOS.refreshHard();
      } else {
        console.error("Lỗi: Thư viện AOS chưa được tải.");
      }

      // Chạy lại hiệu ứng chữ cái
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

      // Gán observer cho các phần tử mới
      document.querySelectorAll(".animate-text").forEach((element) => {
        element.setAttribute("data-original-text", element.textContent);
        observer.observe(element);
      });
    })
    .catch((error) => console.error("Lỗi khi tải nội dung:", error));
});
